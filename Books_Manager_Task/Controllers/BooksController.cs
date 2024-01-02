using Books_Manager_Task.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace Books_Manager_Task.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        
        private readonly BookContext _dbContext;
        public BooksController(BookContext dbContext)
        {
            _dbContext = dbContext;
        }

        //GET: api/Books
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> GetBooks()
        {
            if (_dbContext == null)
            {
                return NotFound();
            }
            return await _dbContext.Books.ToListAsync();

        }

        //GET: api/Books/:id
        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBooks(int id)
        {
            if (_dbContext == null)
            {
                return NotFound();
            }
            var book = await _dbContext.Books.FindAsync(id);
            if (book == null)
            {
                return NotFound();
            }
            return book;
        }

        // POST: api/Books
        [HttpPost]
        public async Task<ActionResult<Book>> AddBook(Book book)
        {
            _dbContext.Books.Add(book);
            await _dbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBooks), new { id = book.Id }, book);
        }


        // PUT: api/Books/:id
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBook(int id, Book book)
        {
            if (id != book.Id)
            {
                return BadRequest();
            }
            _dbContext.Entry(book).State = EntityState.Modified;

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (DBConcurrencyException)
            {
                if (!BooksExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }

            }
            return StatusCode(StatusCodes.Status202Accepted, new { message = "Book Updated Successfully" }); 

        }
        private bool BooksExists(long id)
        {
            return (_dbContext.Books?.Any(e => e.Id == id)).GetValueOrDefault();
        }



        // Delete: api/Book/:id

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            if (_dbContext.Books == null)
            {
                return NotFound();
            }
            var book = await _dbContext.Books.FindAsync(id);
            if (book == null)
            {
                return NotFound();
            }
            _dbContext.Books.Remove(book);
            await _dbContext.SaveChangesAsync();

            return NoContent();

        }

        
    }
}
