using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("[controller]")]
    public class BuggyController : BaseController
    {
        DataContext _context;

        public BuggyController(DataContext context)
        {
            _context = context;
        }

        // [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> GetSecret()
        {
            return "GetSecret";
        }

        [HttpGet("not_found")]
        public ActionResult<AppUser> GetNotFound()
        {
            var thing = _context.appUsers.Find(-1);
            if (thing == null)
                return NotFound();
            else
                return thing;
        }

        [HttpGet("ServerError")]
        public ActionResult<string> GetServerError()
        {
            var thing = _context.appUsers.Find(-1);
            return thing.ToString();
        }

        [HttpGet("BadRequest")]
        public ActionResult<string> GetBadRequest()
        {
            return BadRequest("This is GetBadRequest");
        }




    }
}