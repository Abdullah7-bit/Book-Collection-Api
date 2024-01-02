using Microsoft.EntityFrameworkCore;

namespace Books_Manager_Task.Models
{
    public class BookContext : DbContext
    {
        public BookContext(DbContextOptions<BookContext> options)
            :base(options) 
        {

        }

        public DbSet<Book> Books { get; set; } = null!;
    }
}
