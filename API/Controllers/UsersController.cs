using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private DataContext _context { get; set; }
        public UsersController(DataContext dataContext)
        {
            _context = dataContext;
        }
        [HttpGet]
        public async Task<ActionResult<List<AppUser>>> GetUsers()
        {
            var users= await _context.appUsers.ToListAsync(); 
            return users;
        }

        [HttpGet("{id}")]
        public ActionResult<AppUser> GetUser(int id)
        {
            return _context.appUsers.Find(id);
        }
    }
}
