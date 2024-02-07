using Books_Manager_Task.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Books_Manager_Task.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private IConfiguration _config;
        private readonly BookContext _dbcontext;
        private readonly ILogger<Log> _logger;
        public AccountController(IConfiguration config, BookContext dbcontext, ILogger<Log> logger)
        {
            _dbcontext = dbcontext;
            _logger = logger;
            _config = config;
        }

        [HttpPost("signin")]
        public IActionResult SignIn([FromBody] UserSignInModel userSignInModel)
        {
            try
            {
                _logger.LogInformation("Checkpoint: Executing the try clause in Sigin API");
                var user_exist = _dbcontext.Users.SingleOrDefault(ue => ue.Email == userSignInModel.Email && ue.Password == EncodePasswordToBase64(userSignInModel.Password));

                if (user_exist != null)
                {
                    // Check if the token is expired
                    if (user_exist.TokenExpiration < DateTime.Now)
                    {
                        // Assigning New Token to User

                        // Creation of Token
                        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
                        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
                        var claims = new[]
                        {
                            new Claim(ClaimTypes.NameIdentifier, user_exist.Username),
                            new Claim(ClaimTypes.Email, user_exist.Email),
                            new Claim(ClaimTypes.GivenName , user_exist.FirstName),
                            new Claim(ClaimTypes.Surname , user_exist.LastName),
                            new Claim(ClaimTypes.Role , user_exist.Roles)
                        };

                        var Sectoken = new JwtSecurityToken(_config["Jwt:Issuer"],
                          _config["Jwt:Issuer"],
                          claims,
                          expires: DateTime.Now.AddMinutes(480),
                          signingCredentials: credentials);

                        var token = new JwtSecurityTokenHandler().WriteToken(Sectoken);

                        user_exist.Token = token;
                        user_exist.LastLogin = DateTime.Now;
                        user_exist.CreatedAt = DateTime.Now;
                        user_exist.TokenExpiration = DateTime.Now.AddMinutes(480);


                        _dbcontext.SaveChanges();

                        return Unauthorized(new { Message = "Token has expired. Please log in again." });
                        /*
                         * Will Redirect User to again login screen in the front end.
                         */
                    }
                    else
                    {
                        return Ok($"Login Successfully. To check other api here is the JSON WEB Token: {user_exist.Token}, Token lifetime: {user_exist.TokenExpiration}");

                        // The returning document above will be stored on the front-end to the 
                    }
                    
                }
                else
                {
                    return Unauthorized(new { Message = "Invalid Email or password" });
                }

            }
            catch(Exception ex)
            {
                _logger.LogError(ex, "Stopped program because of exception");
                return StatusCode(StatusCodes.Status500InternalServerError, new { Message = $"Internal Sever Error {ex}" });
            }
            
        }

        // API for SignUp 
        [HttpPost("signup")]
        public IActionResult SignUp([FromBody] UserSignUpModel userSignUpModel)
        {
            try
            {
                // Encoding the password
                var hashed_password = EncodePasswordToBase64(userSignUpModel.Password);


                // Creation of Token
                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

                

                // Adding 

                var Sectoken = new JwtSecurityToken(_config["Jwt:Issuer"],
                  _config["Jwt:Issuer"],
                  expires: DateTime.Now.AddMinutes(480),
                  signingCredentials: credentials);

                var token = new JwtSecurityTokenHandler().WriteToken(Sectoken);

                // Experiment

                // Extract expiration time and date
                //var expirationDateTime = Sectoken.ValidFrom;
                DateTime currentTime = DateTime.Now;
                DateTime expirationTime = currentTime.AddMinutes(480);
                var token_lifetime = new JwtSecurityTokenHandler().SetDefaultTimesOnTokenCreation;
                // End of Experiment

                /* Storing data in DB.
                 */
                var user = new User
                {
                    Username = userSignUpModel.Username,
                    Email = userSignUpModel.Email,
                    FirstName = userSignUpModel.FirstName,
                    LastName = userSignUpModel.LastName,
                    Password = hashed_password,
                    Salt = " random salt value",
                    Roles = userSignUpModel.Roles,
                    IsActive = userSignUpModel.IsActive,
                    CreatedAt = userSignUpModel.CreatedAt,
                    UpdatedAt = userSignUpModel.UpdatedAt,
                    LastLogin = userSignUpModel.UpdatedAt,
                    Token = token,
                    RefreshToken = "random refresh value",
                    TokenExpiration = expirationTime,
                    TokenCreatedAt = DateTime.Now.ToString()

                };
                _dbcontext.Users.Add(user);
                _dbcontext.SaveChanges();


                return Ok($"SignUp Successfully!! {expirationTime}");
            }
            catch(Exception ex)
            {
                throw new Exception("Error while registring the user data in DB, Details: " + ex.Message);
            }

            
        }


        /* Encoding & Decoding of Password
         * this function Convert to Encord your Password
         */
        private string EncodePasswordToBase64(string password)
        {
            try
            {
                byte[] encData_byte = new byte[password.Length];
                encData_byte = System.Text.Encoding.UTF8.GetBytes(password);
                string encodedData = Convert.ToBase64String(encData_byte);
                return encodedData;
            }
            catch (Exception ex)
            {
                throw new Exception("Error in base64Encode" + ex.Message);
            }
        }

        /*
         * How to confirm password while login because the Password is hashed?
         * (Input Password -> Encode) <=Compared=> Stored Encode Password
         */
    }
}
