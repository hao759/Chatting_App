using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTO;
using API.Entities;
using API.Helper;

namespace API.Interfaces
{
    public interface IUserRepositoty
    {
        void Update(AppUser user);
        Task<IEnumerable<AppUser>> GetUsersAsync();
        Task<AppUser> GetUserByIdAsync(int id);
        Task<AppUser> GetUserByUsernameAsync(string username);
        Task<bool> SaveAllAsync();
        Task<PagedList<MemberDTO>> GetMembersAsync(UserParams userParams);
        Task<MemberDTO> GetMemberAsync(string username);
    }
}