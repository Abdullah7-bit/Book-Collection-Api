using Microsoft.EntityFrameworkCore;
using System;

namespace Books_Manager_Task.Models
{
    public class logContext : DbContext
    {
        public DbSet<log> Logs { get; set; }

        public logContext(DbContextOptions<logContext> options)
            : base(options)
        {
        }
        
    }
}
