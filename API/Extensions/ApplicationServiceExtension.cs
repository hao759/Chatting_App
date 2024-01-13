using API.Data;
using API.Entities;
using API.Helper;
using API.Interfaces;
using API.Services;
using API.SignalR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class ApplicationServiceExtension
    {
        public static IServiceCollection AddApplicationServiceExtension(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddIdentityCore<AppUser>(opt =>
       {
           opt.Password.RequireNonAlphanumeric = false;
       })
           .AddRoles<AppRole>()
           .AddRoleManager<RoleManager<AppRole>>()
           .AddEntityFrameworkStores<DataContext>();

            services.AddAuthorization(opt =>
         {
             opt.AddPolicy("RequireAdminRole", policy => policy.RequireRole("Admin"));
             opt.AddPolicy("ModeratePhotoRole", policy => policy.RequireRole("Admin", "Moderator"));
         });
            services.AddCors();
            services.AddScoped<ITokenService, TokenService>();
            services.AddDbContext<DataContext>(opt =>
             {
                 opt.UseSqlServer(configuration.GetConnectionString("ConnectString"));
             });

            services.AddScoped<IUserRepositoty, UserRepository>();
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            services.Configure<CloudinarySetting>(configuration.GetSection("CloudinarySetting"));
            services.AddScoped<IPhotoService, PhotoService>();
            services.AddScoped<LogUserActivity>();
            services.AddScoped<ILikesRepository, LikesRepository>();
            services.AddScoped<IMessageRepository, MessageRepository>();
            services.AddSignalR();
            services.AddSingleton<PresenceTracker>();
            return services;
        }
    }
}