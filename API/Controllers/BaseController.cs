using API.Data;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseController : Controller
    {

        private DataContext _context { get; set; }
        public BaseController( )
        {
        }
        //public IActionResult Index()
        //{
        //    return View();
        //}
    }
}
