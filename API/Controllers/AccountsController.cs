using API.Data;
using API.DTO;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace API.Controllers
{
    public class AccountsController : BaseController
    {
        private UserManager<AppUser> _userManager;
        private ITokenService _tokenService;
        private IMapper _mapper;
        public AccountsController(UserManager<AppUser> userManager, ITokenService tokenService1, IMapper mapper)//DataContext dataContext
        {
            _userManager = userManager;
            _tokenService = tokenService1;
            _mapper = mapper;
        }
        [HttpPost("register")] //api/control/regis
        public async Task<ActionResult<UserDTO>> Register(RegisterDTO registerDto)
        {
            var user = _mapper.Map<AppUser>(registerDto);

            user.Name = registerDto.Username;
            // _context.appUsers.Add(user);
            var result = await _userManager.CreateAsync(user, registerDto.Password);
            if (!result.Succeeded)
                return BadRequest(result.Errors);
            var roleResult = await _userManager.AddToRoleAsync(user, "Member");

            if (!roleResult.Succeeded) return BadRequest(result.Errors);
            return new UserDTO
            {
                UserName = user.UserName,
                Token = await _tokenService.CreateToken(user),
                KnownAs = user.KnownAs,
                Gender = user.Gender
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO login)
        {
            // var user = await _userManager.appUsers.Include(s => s.Photos)
            var user = await _userManager.Users.Include(s => s.Photos)
            .FirstOrDefaultAsync(s => s.Name == login.Name);
            if (user == null)
                return Unauthorized();
            var result = await _userManager.CheckPasswordAsync(user, login.password);
            if (!result)
                return Unauthorized("Invalid Password");
            return new UserDTO
            {
                UserName = login.Name,
                Token = await _tokenService.CreateToken(user),
                PhotoUrl = user.Photos.FirstOrDefault(s => s.IsMain == true)?.Url,
                KnownAs = user.KnownAs,
                Gender = user.Gender,
            };
        }

    }
}
