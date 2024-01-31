using Books_Manager_Task.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
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
        public AccountController(IConfiguration config, BookContext dbcontext)
        {
            _dbcontext = dbcontext;
            _config = config;
        }

        [HttpPost("signin")]
        public IActionResult SignIn([FromBody] UserSignInModel userSignInModel)
        {
            try
            {
                var user_exist = _dbcontext.Users.SingleOrDefault(ue => ue.Email == userSignInModel.Email);

                if (user_exist != null)
                {
                    

                    return Ok($"Login Successfully. To check other api here is the JSON WEB Token: {user_exist.Token}, Token lifetime: {user_exist.TokenExpiration}");
                    
                }
                else
                {
                    return Unauthorized(new { Message = "Invalid Email or password" });
                }
                

            }
            catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Message = $"Internal Sever Error {ex}" });
            }
            
        }

        // API for SignUp 
        [HttpPost("signup")]
        public IActionResult SignUp([FromBody] UserSignUpModel userSignUpModel)
        {
            // Hasing the password
            var hashed_password = HashPasword(userSignUpModel.Password,out var salt);
            var salt_final = Convert.ToHexString(salt);

            // Creation of Token
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var Sectoken = new JwtSecurityToken(_config["Jwt:Issuer"],
              _config["Jwt:Issuer"],
              expires: DateTime.Now.AddMinutes(120),
              signingCredentials: credentials);

            var token = new JwtSecurityTokenHandler().WriteToken(Sectoken);

            // Experiment
            // Extract expiration time and date
            var expirationDateTime = Sectoken.ValidTo;
            var token_lifetime = new JwtSecurityTokenHandler().SetDefaultTimesOnTokenCreation;
            var tokenCreatedAt = DateTime.Now;
            //var token_expire = ;


            // End of Experiment


            // Storing the token in Database.
            //user_exist.Token = token;
            //user_exist.TokenExpiration = expirationDateTime;
            //user_exist.TokenCreatedAt = expirationDateTime.ToString();
            //user_exist.TokenExpiration


            // End of Hasing the password
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
                TokenExpiration = expirationDateTime,
                TokenCreatedAt = DateTime.Now.ToString()


            };
            _dbcontext.Users.Add(user);
            _dbcontext.SaveChanges();


            return Ok("SignUp Successfully!!");
        }


        // Method for Hashing the Password
        private string HashPasword(string password, out byte[] salt)
        {
            const int keySize = 10;
            const int iterations = 30;
            HashAlgorithmName hashAlgorithm = HashAlgorithmName.SHA512;
            salt = RandomNumberGenerator.GetBytes(keySize);

            var hash = Rfc2898DeriveBytes.Pbkdf2(
                Encoding.UTF8.GetBytes(password),
                salt,
                iterations,
                hashAlgorithm,
                keySize);

            return Convert.ToHexString(hash);
        }

        /*
         * How to confirm password while login because the Password is hashed?
         * (Input Password -> Hashed) <=Compared=> Stored Hashed Password
         */
    }
}
