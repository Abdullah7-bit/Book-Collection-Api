import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from "react-router-dom";

function EditBook() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [books, setBooks] = useState({
        id: '',
        title: '',
        author: '',
        publisher: '',
        publishedDate: '',
        edition: '',
        isbn: '',
    });
    // Base States
    const [inputId, setinputId] = useState('');
    const [inputTitle, setinputTitle] = useState('');
    const [inputAuthor, setinputAuthor] = useState('');
    const [inputPublisher, setinputPublisher] = useState('');
    const [inputpublishDate, setinputpublishDate] = useState('');
    const [inputEdition, setinputEdition] = useState('');
    const [inputISBN, setinputISBN] = useState('');

    const populateBookData_Id = async () => {
        try {
            const response = await fetch(`https://localhost:7059/api/Books/${id}`, {
                method: 'GET',
            });

            if (!response.ok) {
                console.log(`Failed to fetch data from the API with Id: ${id}`);
                return;
            }

            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                console.error('Response is not in JSON format');
                return;
            }

            const data = await response.json();
            console.log('Book data:', data);

            // Update state with the retrieved data
            setBooks({
                id: data.id,
                title: data.title,
                author: data.author,
                publisher: data.publisher,
                publishedDate: data.publishedDate,
                edition: data.edition,
                isbn: data.isbn,
            });

            // Update input states if needed
            setinputId(data.id);
            setinputTitle(data.title);
            setinputAuthor(data.author);
            setinputPublisher(data.publisher);
            setinputpublishDate(data.publishedDate);
            setinputEdition(data.edition);
            setinputISBN(data.isbn);

        } catch (error) {
            console.log("Error While Fetching the data: ", error);
        }
    };

   
    useEffect(() => {
        populateBookData_Id();
    }, []);

    // Event handler for button click
    const handleButtonClick = () => {
        // Call the function with the current input value
        editBook();
        navigate('/allbook');
    };

    //  APi Interactivity
    const editBook = async () => {
        try {
            const response = await fetch(`https://localhost:7059/api/Books/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: books.id,
                    title: books.title,
                    author: books.author,
                    publisher: books.publisher,
                    publishDate: books.publishedDate,
                    edition: books.edition,
                    isbn: books.isbn,
                }),
            });

            if (response.ok) {
                

                // Setting the input fields empty when Data sent successfully
                setinputId('');
                setinputTitle('');
                setinputAuthor('');
                setinputPublisher('');
                setinputpublishDate('');
                setinputEdition('');
                setinputISBN('');

                setBooks({
                    id: '',
                    title: '',
                    author: '',
                    publisher: '',
                    publishDate: '',
                    edition: '',
                    isbn: '',
                });


                console.log('Book updated successfully:');
            } else {
                console.error('Failed to update book:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

   

  return (
      <>
       
          <h1>Edit Book Record</h1>
          <div>
              <table className="table table-borderless">
                  <tbody>
                      <tr>
                          <th scope="row">ID : </th>
                          <td>
                              <input type="number" name="inputId" readOnly value={books.id} onChange={(e) => setBooks({ ...books, id: parseInt(e.target.value, 10) || '' })} />
                          </td>
                      </tr>
                      <tr>
                          <th scope="row">Tittle : </th>
                          <td>
                              <input type="text" name="title" value={books.title} onChange={(e) => setBooks({ ...books, title: e.target.value })} />
                          </td>
                      </tr>
                      <tr>
                          <th scope="row">Author : </th>
                          <td>
                              <input type="text" name="author" value={books.author} onChange={(e) => setBooks({ ...books, author: e.target.value })} />
                          </td>
                      </tr>
                      <tr>
                          <th scope="row">Publisher : </th>
                          <td>
                              <input type="text" name="publisher" value={books.publisher} onChange={(e) => setBooks({ ...books, publisher: e.target.value })} />
                          </td>
                      </tr>
                      <tr>
                          <th scope="row">Published Date : </th>
                          <td>
                              <input type="text" name="publisheddate" value={books.publishedDate} onChange={(e) => setBooks({ ...books, publishedDate: e.target.value })} placeholder="e.g. 2000-09-11" />
                          </td>
                      </tr>
                      <tr>
                          <th scope="row">Edition : </th>
                          <td>
                              <input type="text" name="edition" value={books.edition} onChange={(e) => setBooks({ ...books, edition: e.target.value })} />
                          </td>
                      </tr>
                      <tr>
                          <th scope="row">ISBN : </th>
                          <td>
                              <input type="text" name="isbn" value={books.isbn} onChange={(e) => setBooks({ ...books, isbn: e.target.value })} />
                          </td>
                      </tr>
                      <tr>
                          <td>
                              <button onClick={handleButtonClick}>Add Book</button>
                          </td>
                      </tr>
                  </tbody>
              </table> 
          </div>
      </>
    );
   
}

export default EditBook;