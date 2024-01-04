using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc.Filters;

namespace API.Helper
{
    public class LogUserActivity : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var resultContext = await next();

            if (!resultContext.HttpContext.User.Identity.IsAuthenticated) return;

            var username = resultContext.HttpContext.User.GetUserName();

            var repo = resultContext.HttpContext.RequestServices.GetRequiredService<IUserRepositoty>();
            var user = await repo.GetUserByUsernameAsync(username);


            // var uow = resultContext.HttpContext.RequestServices.GetRequiredService<IUnitOfWork>();
            // var user = await uow.UserRepository.GetUserByIdAsync(userId);
            user.LastActive = DateTime.UtcNow;
            await repo.SaveAllAsync();
        }
    }
}