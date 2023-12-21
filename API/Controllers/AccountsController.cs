using API.Data;
using API.DTO;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace API.Controllers
{
    public class AccountsController : BaseController
    {
        private DataContext _context;
        private ITokenService _tokenService;
        public AccountsController(DataContext dataContext, ITokenService tokenService1)
        {
            _context = dataContext;
            _tokenService = tokenService1;
        }
        [HttpPost("register")] //api/control/regis
        public async Task<ActionResult<AppUser>> Register(string username, string password)
        {
            var hmac = new HMACSHA512();
            var user = new AppUser
            {
                Name = username,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password)),
                PasswordSalt = hmac.Key
            };
            _context.appUsers.Add(user);
            await _context.SaveChangesAsync();
            return Ok(user);
        }

        [HttpPost("login")] //api/control/regis
        public async Task<ActionResult<UserDTO>> Login(LoginDTO login)
        {
            var user = await _context.appUsers.FirstOrDefaultAsync(s => s.Name == login.Name);
            if (user == null)
                return Unauthorized();
            using var hmac = new HMACSHA512(user.PasswordSalt);
            var ComputeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(login.password));
            for (int i = 0; i < ComputeHash.Length; i++)
                if (ComputeHash[i] != user.PasswordHash[i])
                    return Unauthorized("Sai pass");
            return new UserDTO
            {
                UserName = login.Name,
                Token = _tokenService.CreateToken(user)
            };
        }

    }
}
