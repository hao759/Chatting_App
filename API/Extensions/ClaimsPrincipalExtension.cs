using System.Security.Claims;

namespace API.Extensions
{
    public static class ClaimsPrincipalExtension
    {
        public static string GetUserName(this ClaimsPrincipal user)
        {
            // var atest = (user.Claims.ToArray())[0].Value;
            return user.FindFirst(ClaimTypes.Name)?.Value;
        }

        public static int GetUserID(this ClaimsPrincipal user)
        {
            return int.Parse(user.FindFirst(ClaimTypes.NameIdentifier)?.Value);
        }
    }
}