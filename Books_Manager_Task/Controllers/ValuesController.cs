using Books_Manager_Task.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;


namespace Books_Manager_Task.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {

        [Authorize]
        [HttpGet("Public")]

        public IActionResult PublicEndPoint()
        {
            var currentuser = GetCurrentUser();
            return Ok($"Hi {currentuser.FirstName}, with the role of {currentuser.Roles}");
        }

        private User GetCurrentUser()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            if(identity != null)
            {
                var userClaims = identity.Claims;

                return new User
                {
                    Username = userClaims.FirstOrDefault(uc => uc.Type == ClaimTypes.NameIdentifier)?.Value,
                    Email = userClaims.FirstOrDefault(uc => uc.Type == ClaimTypes.Email)?.Value,
                    FirstName = userClaims.FirstOrDefault(uc => uc.Type == ClaimTypes.GivenName)?.Value,
                    LastName = userClaims.FirstOrDefault(uc => uc.Type == ClaimTypes.Surname)?.Value,
                    Roles = userClaims.FirstOrDefault(uc => uc.Type == ClaimTypes.Role)?.Value

                };

            }
            return null;
        }
    }
}
