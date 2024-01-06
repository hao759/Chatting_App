using System.Security.Claims;
using API.Data;
using API.DTO;
using API.Entities;
using API.Extensions;
using API.Helper;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    // [ApiController]
    [Authorize]
    // [Route("api/[controller]")]
    public class UsersController : BaseController
    {
        public IUserRepositoty _userRepositoty;
        private readonly IMapper mapper;
        IPhotoService _photoService;
        public UsersController(IUserRepositoty userRepositoty, IMapper mapper, IPhotoService photoService)
        {
            this.mapper = mapper;
            _userRepositoty = userRepositoty;
            _photoService = photoService;
        }
        [HttpGet]
        public async Task<ActionResult<PagedList<MemberDTO>>> GetUsers([FromQuery] UserParams userParams)//caan FromQuery
        {
            var currentUser = await _userRepositoty.GetUserByUsernameAsync(User.GetUserName());
            userParams.CurrentUserName = currentUser.Name;

            if (string.IsNullOrEmpty(userParams.Gender))
                userParams.Gender = currentUser.Gender == "male" ? "female" : "male";


            var users = await _userRepositoty.GetMembersAsync(userParams);
            Response.AddPaginationHeader(new PaginationHeader(users.CurrentPage, users.PageSize,
            users.TotalCount, users.TotalPages));
            // var userToReturn = mapper.Map<List<MemberDTO>>(user);
            return Ok(users);
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<AppUser>> GetUser(string username)
        {
            var user = await _userRepositoty.GetMemberAsync(username);
            // var userToReturn = mapper.Map<List<MemberDTO>>(user);
            return Ok(user);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateUser(MemberUpdateDTO memberDTO)
        {
            var user = await _userRepositoty.GetUserByUsernameAsync(User.GetUserName());
            if (user == null)
                return NotFound();
            mapper.Map(memberDTO, user);
            if (await _userRepositoty.SaveAllAsync())
                return NoContent();
            return BadRequest("Update fail");
        }

        [HttpPost("add_photo")]
        public async Task<ActionResult<PhotoDTO>> AddPhoto(IFormFile file)
        {
            var user = await _userRepositoty.GetUserByUsernameAsync(User.GetUserName());

            var result = await _photoService.AddPhotoAsync(file);

            if (result.Error != null) return BadRequest(result.Error.Message);

            var photo = new Photo
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };

            if (user.Photos.Count == 0) photo.IsMain = true;

            user.Photos.Add(photo);

            if (await _userRepositoty.SaveAllAsync())
                return CreatedAtAction(nameof(GetUser), new { username = user.Name }, mapper.Map<PhotoDTO>(photo));

            return BadRequest("Problem adding photo");
        }

        [HttpPut("set_main_photo/{photoID}")]
        public async Task<ActionResult> SetMainphoto(int photoID)
        {
            var user = await _userRepositoty.GetUserByUsernameAsync(User.GetUserName());
            if (user == null)
                return NotFound();
            var photo = user.Photos.FirstOrDefault(s => s.Id == photoID);
            if (photo == null) return NotFound();
            if (photo.IsMain)
                return BadRequest("This is already main photo");
            var currentMain = user.Photos.FirstOrDefault(s => s.IsMain);
            if (currentMain != null)
                currentMain.IsMain = false;
            photo.IsMain = true;
            if (await _userRepositoty.SaveAllAsync())
                return NoContent();
            return BadRequest("Problem");
        }

        [HttpDelete("delete_photo/{photoID}")]
        public async Task<ActionResult> Deletephoto(int photoID)
        {
            var user = await _userRepositoty.GetUserByUsernameAsync(User.GetUserName());
            var photo = user.Photos.FirstOrDefault(s => s.Id == photoID);
            if (photo == null)
                return NotFound();
            if (photo.IsMain)
                return BadRequest("Day la anh main");
            var result = await _photoService.DeletePhotoAsync(photo.PublicId);
            if (result.Error != null)
                return BadRequest(result.Error);
            user.Photos.Remove(photo);
            if (await _userRepositoty.SaveAllAsync())

                return Ok();
            return BadRequest("Problem Saving");
        }
    }
}
