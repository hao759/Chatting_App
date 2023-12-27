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
    // [Authorize]
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
            var user = await _userRepositoty.GetUsersAsync();
            var userToReturn = mapper.Map<List<MemberDTO>>(user);
            return Ok(userToReturn);
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<AppUser>> GetUser(string username)
        {
            return Ok(await _userRepositoty.GetUserByUsernameAsync(username));
        }

        // [HttpGet("{id}")]
        // public async Task<ActionResult<AppUser>> GetUserbyID(int id)
        // {
        //     return Ok(await _userRepositoty.GetUserByIdAsync(id));
        // }
    }
}
