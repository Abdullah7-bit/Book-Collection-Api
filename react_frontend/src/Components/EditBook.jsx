import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

function EditBook() {
    const { id } = useParams();

    
    const [books, setBooks] = useState({
        id: '',
        title: '',
        author: '',
        publisher: '',
        publishedDate: '',
        edition: '',
        ISBN: '',
    });
    // Base States
    const [inputId, setinputId] = useState('');
    const [inputTitle, setinputTitle] = useState('');
    const [inputAuthor, setinputAuthor] = useState('');
    const [inputPublisher, setinputPublisher] = useState('');
    const [inputpublishDate, setinputpublishDate] = useState('');
    const [inputEdition, setinputEdition] = useState('');
    const [inputISBN, setinputISBN] = useState('');

    async function populateBookData_Id() {
        try {
            const response = await fetch(`api/Books/${id}`, {
                method: 'GET',
            });
            if (!response.ok) {
                console.log(`Failed to fetch data from the API with Id: ${id}`);
                return;
            }
            // Check if the response is JSON
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                console.error('Response is not in JSON format');
                return;
            }
            const data = await response.json();


            console.log('Book data:', data);
            console.log(response.status);
            setBooks(data);
            // Setting the input fields As the data we get from Response JSON
            setinputId(data.id);
            setinputTitle(data.title);
            setinputAuthor(data.author);
            setinputPublisher(data.publisher);
            setinputpublishDate(data.publishDate);
            setinputEdition(data.edition);
            setinputISBN(data.ISBN);
        } catch (error) {
            console.log("Error While Fetching the data: ", error);
        }

    };

       

    // Event handler for button click
    const handleButtonClick = () => {
        // Call the function with the current input value
        
       editBook();

    };
    useEffect(() => {
        populateBookData_Id();
    }, []);

    //  APi Interactivity
    const editBook = async () => {
        try {
            const response = await fetch(`api/Books/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: books.id,
                    title: inputTitle,
                    author: inputAuthor,
                    publisher: inputPublisher,
                    publishDate: inputpublishDate,
                    edition: inputEdition,
                    ISBN: inputISBN,
                }),
            });

            if (response.ok) {
                console.log('Data fetch successfully!');
                // If successful
                const updatedBook = await response.json();

                // Setting the input fields As the data we get from Response JSON
                setinputId(updatedBook.id);
                setinputTitle(updatedBook.title);
                setinputAuthor(updatedBook.author);
                setinputPublisher(updatedBook.publisher);
                setinputpublishDate(updatedBook.publishDate);
                setinputEdition(updatedBook.edition);
                setinputISBN(updatedBook.ISBN);

                console.log('Book updated successfully:', updatedBook);
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
              <label>
                  Id:
                  <input type="number" name="inputId" value={books.id} onChange={(e) => setBooks({ ...books, id: parseInt(e.target.value, 10) || '' })} />

              </label>
              <label>
                  Title:
                  <input type="text" name="title" value={books.title} onChange={(e) => setBooks({ ...books, title: e.target.value })} />
              </label>
              <label>
                  Author:
                  <input type="text" name="author" value={books.author} onChange={(e) => setBooks({ ...books, author: e.target.value })} />

              </label>
              <label>
                  Publisher:
                  <input type="text" name="publisher" value={books.publisher} onChange={(e) => setBooks({ ...books, publisher: e.target.value })} />

              </label>
              <label>
                  Publish Date:
                  <input type="text" name="publisheddate" value={books.publishedDate} onChange={(e) => setBooks({ ...books, publishedDate: e.target.value })} placeholder="e.g. 2000-09-11" />

              </label>
              <label>
                  Edition:
                  <input type="text" name="edition" value={books.edition} onChange={(e) => setBooks({ ...books, edition: e.target.value })} />

              </label>
              <label>
                  ISBN:

                  <input type="text" name="isbn" value={books.ISBN} onChange={(e) => setBooks({ ...books, ISBN: e.target.value })} />

              </label>
              <button onClick={handleButtonClick}>Add Book</button>

          </div>
      </>
    );
   
}

export default EditBook;