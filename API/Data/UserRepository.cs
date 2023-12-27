using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class UserRepository : IUserRepositoty
    {
        public DataContext _context { get; }

        public UserRepository(DataContext dataContext)
        {
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
            return await _context.appUsers.ToListAsync();
        }

        public void Update(AppUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }


        async Task<bool> IUserRepositoty.SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}