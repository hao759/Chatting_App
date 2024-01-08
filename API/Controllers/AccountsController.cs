using API.Data;
using API.DTO;
using API.Entities;
using API.Interfaces;
using AutoMapper;
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
        private IMapper _mapper;
        public AccountsController(DataContext dataContext, ITokenService tokenService1, IMapper mapper)
        {
            _context = dataContext;
            _tokenService = tokenService1;
            _mapper = mapper;
        }
        [HttpPost("register")] //api/control/regis
        public async Task<ActionResult<AppUser>> Register(RegisterDTO registerDto)
        {
            var user = _mapper.Map<AppUser>(registerDto);

            user.Name = registerDto.Username;
            _context.appUsers.Add(user);
            await _context.SaveChangesAsync();
            return Ok(user);
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO login)
        {
            var user = await _context.appUsers.Include(s => s.Photos)
            .FirstOrDefaultAsync(s => s.Name == login.Name);
            if (user == null)
                return Unauthorized();

            return new UserDTO
            {
                UserName = login.Name,
                Token = _tokenService.CreateToken(user),
                PhotoUrl = user.Photos.FirstOrDefault(s => s.IsMain == true)?.Url,
                KnownAs = user.KnownAs,
                Gender = user.Gender,
            };
        }

    }
}
