import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

function GetBooks() {

    const [books, setBooks] = useState();

    
    // Using Delete functionality from the API
    const deleteBook = async (id) => {
        try {
            const token = localStorage.getItem('key');
            const response = await fetch(`api/Books/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
            });
            

            if (!response.ok) {
                console.error(`Failed to delete book with ID ${id}.`);
                return; // Exit the function if the request was not successful
            }
            

            // To Test the Response JSON in Browser Console
            //if (response.ok) {
            //    const updatedBooks = books.filter(book => book.id !== id);
            //    setBooks(updatedBooks);
            //    console.log(`Book with ID ${id} deleted successfully.`);
            //} else {
            //    console.error(`Failed to delete book with ID ${id}.`);
            //}

            const updatedBooks = books.filter(book => book.id !== id);
            setBooks(updatedBooks);

            
            console.log(`Book with ID ${id} deleted successfully.`);                

        } catch (error) {
            console.log("Delete Process is Unsuccessful, Error: ",error);
        }
    };
    
    useEffect(() => {
        populateBookData();

    }, []);
    
    // Fetching the Data from the API 
    async function populateBookData() {
        const token =  localStorage.getItem('key');
        const response = await fetch('api/Books', {
            headers: {
                
                'Authorization': `Bearer ${token}`
            }
        });
        

        console.log('Response Status:', response.status);
        const data = await response.json();
        setBooks(data);
       
    }


    const contents = books === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Publisher</th>
                    <th>Published Date</th>
                    <th>Edition</th>
                    <th>ISBN</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {books.map(bookdata =>
                    <tr key={bookdata.id}>
                        <td>{bookdata.id}</td>
                        <td>{bookdata.title}</td>
                        <td>{bookdata.author}</td>
                        <td>{bookdata.publisher}</td>
                        <td>{bookdata.publishedDate}</td>
                        <td>{bookdata.edition}</td>
                        <td>{bookdata.isbn}</td>
                        <td key={bookdata.id}>                          
                            <Link className="btn btn-info" to={`/editbook/${bookdata.id}`}>Edit</Link>
                        </td>
                        <td>
                            <button className="btn btn-danger" onClick={() => deleteBook(bookdata.id)}>Delete</button>
                            
                        </td>
                    </tr>
                )}
               
            </tbody>
        </table>;

  return (
      <div>
          <h1 id="tabelLabel">All Books</h1>
          <p>This component demonstrates fetching data from the Get API Book.</p>
          
          {contents}

      </div>
    )
    
}

export default GetBooks;