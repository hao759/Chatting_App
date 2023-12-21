using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using System.Text;

namespace API.Controllers
{
    public class AccountsController : BaseController
    {
        private DataContext _context;
        public AccountsController(DataContext dataContext)
        {
            _context = dataContext;
        }
        [HttpPost("register")] //api/control/regis
        public async Task<ActionResult<AppUser>> Register(string username, string password)
        {
            var hmac = new HMACSHA512();
            var user = new AppUser
            {
                Name = username,
                PasswordHash=hmac.ComputeHash(Encoding.UTF8.GetBytes(password)),
                PasswordSalt=hmac.Key
            };
            _context.appUsers.Add(user);
            await _context.SaveChangesAsync();
            return Ok(user);
        }

    }
}
