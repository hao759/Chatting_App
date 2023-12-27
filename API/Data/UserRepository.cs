using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTO;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class UserRepository : IUserRepositoty
    {
        public DataContext _context { get; }
        public IMapper Mapper { get; }

        public UserRepository(DataContext dataContext, IMapper mapper)
        {
            this.Mapper = mapper;
            this._context = dataContext;
        }
        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await _context.appUsers.FindAsync(id);
        }

        public async Task<AppUser> GetUserByUsernameAsync(string username)
        {
            return await _context.appUsers.SingleOrDefaultAsync(s => s.Name == username);
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await _context.appUsers.Include(s => s.Photos).ToListAsync();
        }

        public void Update(AppUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }


        async Task<bool> IUserRepositoty.SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<List<MemberDTO>> GetMembersAsync()
        {
            return await _context.appUsers
          .ProjectTo<MemberDTO>(Mapper.ConfigurationProvider)
          .ToListAsync();
        }

        public async Task<MemberDTO> GetMemberAsync(string username)
        {

            return await _context.appUsers.Where(x => x.Name == username)
           .ProjectTo<MemberDTO>(Mapper.ConfigurationProvider)
           .SingleOrDefaultAsync();
        }
    }
}