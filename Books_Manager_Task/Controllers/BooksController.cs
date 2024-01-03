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
                return StatusCode(StatusCodes.Status404NotFound, new { message = "No Data is present in Database." });
            }
            return await _dbContext.Books.ToListAsync();

        }

        //GET: api/Books/:id
        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBooks(int id)
        {
            if (_dbContext == null)
            {
                return StatusCode(StatusCodes.Status404NotFound, new { message = "No Data is present in Database." }); ;
            }
            var book = await _dbContext.Books.FindAsync(id);
            if (book == null)
            {
                return StatusCode(StatusCodes.Status404NotFound, new { message = $"Books Table does not contain data for ID : {id}." }); ;
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
                return StatusCode(StatusCodes.Status400BadRequest, new { message = "Please give the valid ID" });

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
                    return StatusCode(StatusCodes.Status404NotFound, new { message = $"The Record for given {id} does not exist." });
                }
                else
                {
                    throw;
                }

            }
            return StatusCode(StatusCodes.Status202Accepted, new { message = "Book Details Updated Successfully" }); 

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
                
                return StatusCode(StatusCodes.Status404NotFound, new { message = "The Books Table is empty" });
            }
            var book = await _dbContext.Books.FindAsync(id);
            if (book == null)
            {
                return StatusCode(StatusCodes.Status404NotFound, new { message = $"No Record is present for given {id}." });
            }
            _dbContext.Books.Remove(book);
            await _dbContext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, new {message=$"The Record for id: {id} is deleted Successfully."});

        }

        
    }
}
