using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class ApplicationServiceExtension
    {
        public static IServiceCollection AddApplicationServiceExtension(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddCors();
            services.AddScoped<ITokenService, TokenService>();
            services.AddDbContext<DataContext>(opt =>
             {
                 opt.UseSqlServer(configuration.GetConnectionString("ConnectString"));
             });

            services.AddScoped<IUserRepositoty, UserRepository>();

            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            return services;
        }
    }
}