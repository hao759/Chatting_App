using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTO;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class LikesController : BaseController
    {
        IUserRepositoty _userRepositoty;
        private readonly ILikesRepository likesRepository;
        public LikesController(IUserRepositoty userRepositoty, ILikesRepository likesRepository)
        {
            this.likesRepository = likesRepository;
            _userRepositoty = userRepositoty;
        }
        [HttpPost("{username}")]
        public async Task<ActionResult> AddLike(string username)
        {
            var sourceUserId = int.Parse(User.GetUserID());
            var likedUser = await _userRepositoty.GetUserByUsernameAsync(username);
            var sourceUser = await likesRepository.GetUserWithLikes(sourceUserId);

            if (likedUser == null) return NotFound();

            if (sourceUser.Name == username) return BadRequest("You cannot like yourself");

            var userLike = await likesRepository.GetUserLike(sourceUserId, likedUser.Id);

            if (userLike != null) return BadRequest("You already like this user");

            userLike = new UserLike
            {
                SourceUserId = sourceUserId,
                TargetUserId = likedUser.Id
            };

            sourceUser.LikedUsers.Add(userLike);

            if (await _userRepositoty.SaveAllAsync()) return Ok();

            return BadRequest("Failed to like user");
        }
        [HttpGet]
        public async Task<ActionResult<List<LikeDTO>>> GetUserLikes(string predicate)
        {
            var users = await likesRepository.GetUserLikes(predicate, int.Parse(User.GetUserID()));

            // Response.AddPaginationHeader(new PaginationHeader(users.CurrentPage, users.PageSize,
            //     users.TotalCount, users.TotalPages));

            return Ok(users);
        }

    }
}