using API.DTO;
using API.Entities;
using API.Helper;
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
            return await _context.appUsers.Include(p => p.Photos)
            .SingleOrDefaultAsync(s => s.Name == username);
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

        public async Task<PagedList<MemberDTO>> GetMembersAsync(UserParams userParams)
        {
            var query = _context.appUsers.AsQueryable();
            query = query.Where(s => s.Name != userParams.CurrentUserName);
            query = query.Where(s => s.Gender == userParams.Gender);

            var minDob = DateOnly.FromDateTime(DateTime.Today.AddYears(-userParams.MaxAge - 1));
            var maxDob = DateOnly.FromDateTime(DateTime.Today.AddYears(-userParams.MinAge - 1));

            query = query.Where(u => u.DateOfBirth >= minDob && u.DateOfBirth <= maxDob);
            query = userParams.OrderBy switch
            {
                "created" => query.OrderByDescending(u => u.Created),
                _ => query.OrderByDescending(u => u.LastActive)
            };

            return await PagedList<MemberDTO>.CreateAsync(query.AsNoTracking().ProjectTo<MemberDTO>(Mapper.ConfigurationProvider),
             userParams.PageNumber, userParams.PageSize);
        }

        public async Task<MemberDTO> GetMemberAsync(string username)
        {
            return await _context.appUsers.Where(x => x.Name == username)
           .ProjectTo<MemberDTO>(Mapper.ConfigurationProvider)
           .SingleOrDefaultAsync();
        }
    }
}