using Books_Manager_Task.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;

using Azure.Core;
using Microsoft.AspNetCore.Authorization;

namespace Books_Manager_Task.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        // Database Configuration
        private readonly BookContext _dbContext;
        // Logging Configuration
        private readonly ILogger<Log> _logger;

        public BooksController(BookContext dbContext, ILogger<Log> logger)
        {
            _dbContext = dbContext;
            _logger = logger;
            _logger.LogInformation(1, "Nlog Injected into BooksController");

        }

        //GET: api/Books
       
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> GetBooks()
        {
            try
            {
                
                _logger.LogInformation("This is the GetBooks API!");
                if (_dbContext == null)
                {
                    return StatusCode(StatusCodes.Status404NotFound, new { message = "No Data is present in Database." });
                }
                //return await _dbContext.Books.ToListAsync();
                return await _dbContext.Books
                      .FromSqlInterpolated($"EXEC GetBooks")
                      .ToListAsync();


                //throw new Exception("Error occured");                

            }
            catch(Exception ex)
            {
                _logger.LogError(ex.ToString());
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = $"An error occurred while processing the request For GET API. Error details: {ex}" });
            }
            

        }

        //GET: api/Books/:id
        [HttpGet("{id}")]
        /* 
         * Chaning the input parameter from
         * int id --> string authorName
         * 
         *  2nd If block changes in exception
         *  id ---> authorName
         */
        public async Task<ActionResult<IEnumerable<Book>>> GetBooks(string authorName)
        {
            try
            {
                _logger.LogInformation("This is the GetBooks By Author API!");
                if (_dbContext == null)
                {
                    return StatusCode(StatusCodes.Status404NotFound, new { message = "No Data is present in Database." });
                }

                var books = await _dbContext.Books
                      .FromSqlInterpolated($"EXEC GetBooksByAuthor {authorName}")
                      .ToListAsync();

                if (books != null && books.Any())
                {
                    return books;
                }
                else
                {
                    return StatusCode(StatusCodes.Status404NotFound, new { message = $"No books found for author: {authorName}." });
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.ToString());
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = $"An error occurred while processing the request for GET API. Error details: {ex}" });
            }
        }


        // POST: api/Books
        [HttpPost("add")]
        public async Task<ActionResult<Book>> AddBook(Book book)
        {
            try
            {
                _dbContext.Books.Add(book);
                await _dbContext.SaveChangesAsync();

                return CreatedAtAction(nameof(GetBooks), new { id = book.Id }, book);
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.ToString());
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = $"An error occurred while processing the request For POST API. Error details: {ex}" });
            }
           
        }


        // PUT: api/Books/update/:id
        [HttpPut("update/{id}")]
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

        [HttpDelete("delete/{id}")]
        
        public async Task<IActionResult> DeleteBook(int id)
        {
            try
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

                return StatusCode(StatusCodes.Status200OK, new { message = $"The Record for id: {id} is deleted Successfully." });
            }catch(Exception ex)
            {
                _logger.LogError(ex.ToString());
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = $"An error occurred while processing the request For DELETE API. Error details: {ex}" });
            }
            

        }

        
    }
}
