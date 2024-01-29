using Microsoft.EntityFrameworkCore;

namespace Books_Manager_Task.Models
{
    public class BookContext : DbContext
    {
        public BookContext(DbContextOptions<BookContext> options)
            :base(options) 
        {

        }

        public DbSet<Book> Books { get; set; }
        public DbSet<User> Users { get; set; }

        public DbSet<Log> Logs { get; set; }
    }
}
