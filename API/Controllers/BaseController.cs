using API.Data;
using API.Helper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [ApiController]
    [Route("api/[controller]")]
    public class BaseController : Controller
    {

        private DataContext _context { get; set; }
        public BaseController()
        {
        }
        //public IActionResult Index()
        //{
        //    return View();
        //}
    }
}
