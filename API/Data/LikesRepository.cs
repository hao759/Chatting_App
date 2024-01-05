using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTO;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class LikesRepository : ILikesRepository
    {
        DataContext _context;
        public LikesRepository(DataContext dataContext)
        {
            _context = dataContext;
        }
        public async Task<UserLike> GetUserLike(int sourceUserId, int likedUserId)
        {
            return await _context.userLikes.FindAsync(sourceUserId, likedUserId);
        }

        public async Task<List<LikeDTO>> GetUserLikes(string predicate, int userId)
        {
            var users = _context.appUsers.OrderBy(u => u.Name).AsQueryable();
            var likes = _context.userLikes.AsQueryable();

            if (predicate == "liked")
            {
                likes = likes.Where(like => like.SourceUserId == userId);
                users = likes.Select(like => like.TargetUser);
            }

            if (predicate == "likedBy")
            {
                likes = likes.Where(like => like.TargetUserId == userId);
                users = likes.Select(like => like.SourceUser);
            }

            return await users.Select(s => new LikeDTO
            {
                UserName = s.Name,
                KnownAs = s.KnownAs,
                Age = s.DateOfBirth.CaculateAge(),
                PhotoUrl = s.Photos.FirstOrDefault(x => x.IsMain).Url,
                City = s.City,
                Id = s.Id
            }).ToListAsync();
            // var likedUsers = users.Select(user => new LikeDTO
            // {
            //     UserName = user.Name,
            //     KnownAs = user.KnownAs,
            //     Age = user.DateOfBirth.CaculateAge(),
            //     PhotoUrl = user.Photos.FirstOrDefault(x => x.IsMain).Url,
            //     City = user.City,
            //     Id = user.Id
            // });
        }

        public async Task<AppUser> GetUserWithLikes(int userId)
        {
            return await _context.appUsers
           .Include(x => x.LikedUsers)
           .FirstOrDefaultAsync(x => x.Id == userId);
        }
    }
}