using API.Data;
using API.Entities;
using API.Interfaces;
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
        public UsersController(IUserRepositoty userRepositoty)
        {
            _userRepositoty = userRepositoty;
        }
        [HttpGet]
        public async Task<ActionResult<List<AppUser>>> GetUsers()
        {
            return Ok(await _userRepositoty.GetUsersAsync());
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
