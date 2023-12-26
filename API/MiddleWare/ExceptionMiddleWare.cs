using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using API.Error;

namespace API.MiddleWare
{
    public class ExceptionMiddleWare
    {
        private readonly RequestDelegate _next;
        public ILogger<ExceptionMiddleWare> Logger { get; }
        public IHostEnvironment HostEnvironment { get; }

        public ExceptionMiddleWare(RequestDelegate next, ILogger<ExceptionMiddleWare> logger, IHostEnvironment hostEnvironment)
        {
            this.HostEnvironment = hostEnvironment;
            this.Logger = logger;
            this._next = next;
        }

        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);
            }
            catch (System.Exception ex)
            {

                Logger.LogError(ex, ex.Message);
                httpContext.Response.ContentType = "application/json";
                httpContext.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                var Response = HostEnvironment.IsDevelopment() ?
                new ApiException(httpContext.Response.StatusCode, ex.Message, ex.StackTrace?.ToString()) :
                new ApiException(httpContext.Response.StatusCode, ex.Message, "Loi sever");

                var option = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
                var json = JsonSerializer.Serialize(Response, option);

                await httpContext.Response.WriteAsync(json);
            }
        }
    }
}