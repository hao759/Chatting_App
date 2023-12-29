using System.Security.Claims;
using API.Data;
using API.DTO;
using API.Entities;
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
        public UsersController(IUserRepositoty userRepositoty, IMapper mapper)
        {
            this.mapper = mapper;
            _userRepositoty = userRepositoty;
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

        // [HttpGet("{id}")]
        // public async Task<ActionResult<AppUser>> GetUserbyID(int id)
        // {
        //     return Ok(await _userRepositoty.GetUserByIdAsync(id));
        // }

        [HttpPut]
        public async Task<ActionResult> UpdateUser(MemberUpdateDTO memberDTO)
        {
            // var username = User.Identity.Name;
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _userRepositoty.GetUserByUsernameAsync(username);
            if (user == null)
                return NotFound();
            mapper.Map(memberDTO, user);
            if (await _userRepositoty.SaveAllAsync())
                return NoContent();
            return BadRequest("Update fail");
        }
    }
}
