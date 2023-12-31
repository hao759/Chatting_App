using System.Security.Claims;
using API.Data;
using API.DTO;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class UsersController : Controller
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
        public async Task<ActionResult<List<MemberDTO>>> GetUsers()
        {
            var user = await _userRepositoty.GetMembersAsync();
            // var userToReturn = mapper.Map<List<MemberDTO>>(user);
            return Ok(user);
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
            // var username = User.Identity.Name;
            var user = await _userRepositoty.GetUserByUsernameAsync(User.GetUserName());
            if (user == null)
                return NotFound();
            mapper.Map(memberDTO, user);
            if (await _userRepositoty.SaveAllAsync())
                return NoContent();
            return BadRequest("Update fail");
        }

        [HttpPost("add_photo")]
        public async Task<ActionResult<PhotoDTO>> AddPhoto(IFormFile formFile)
        {
            var user = await _userRepositoty.GetUserByUsernameAsync(User.GetUserName());

            var result = await _photoService.AddPhotoAsync(formFile);

            if (result.Error != null) return BadRequest(result.Error.Message);

            var photo = new Photo
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };

            if (user.Photos.Count == 0) photo.IsMain = true;

            user.Photos.Add(photo);

            if (await _userRepositoty.SaveAllAsync())
                return CreatedAtAction(nameof(GetUser), new { username = user.UserName }),
                // return mapper.Map<PhotoDTO>(photo);

            return BadRequest("Problem adding photo");
        }
    }
}
