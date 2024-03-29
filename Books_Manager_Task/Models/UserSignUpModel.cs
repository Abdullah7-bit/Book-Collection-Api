﻿namespace Books_Manager_Task.Models
{
    public class UserSignUpModel
    {
        public string? Username { get; set; }
        public string? Email { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }      
        public string? Password { get; set; }

        public string Roles = "User";

        public bool IsActive = true;

        public DateTime CreatedAt = DateTime.Now;

        public DateTime UpdatedAt = DateTime.Now;

        
    }
}
