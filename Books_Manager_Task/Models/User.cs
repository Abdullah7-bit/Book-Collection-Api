using System.ComponentModel.DataAnnotations;

namespace Books_Manager_Task.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string? Salt { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Roles { get; set; } // JSON or string representation of roles

        public bool IsActive { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public DateTime? LastLogin { get; set; }

        public string Token { get; set; }

        public string RefreshToken { get; set; }

        public DateTime? TokenExpiration { get; set; }
    }
}
