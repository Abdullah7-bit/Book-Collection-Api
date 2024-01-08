import React, { useState,useEffect} from 'react';

function AddBooks() {

    const [inputId, setinputId] = useState('');
    const [inputTitle, setinputTitle] = useState('');
    const [inputAuthor, setinputAuthor] = useState('');
    const [inputPublisher, setinputPublisher] = useState('');
    const [inputpublishDate, setinputpublishDate] = useState('');
    const [inputEdition, setinputEdition] = useState('');
    const [inputISBN, setinputISBN] = useState('');
    const [books, setBooks] = useState();



    

    // Function to process the input value
    const processInput = async (id,title, author, publish, publishDate, edition, ISBN) => {

        // Perform further processing with the input values
        console.log(`Id: ${id}`);
        console.log(`Title: ${title}`);
        console.log(`Author: ${author}`);
        console.log(`Publish: ${publish}`);
        console.log(`Publish Date: ${publishDate}`);
        console.log(`Edition: ${edition}`);
        console.log(`ISBN: ${ISBN}`);
        try {
            await populateBookData_Id(title, author, publish, publishDate, edition, ISBN);
        }
        catch (error) {
            console.log("Ran into error: ", error);
        }
    };
        

    // Event handler for input change
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'inputId') {
            setinputId(value);
        }else if (name == 'inputTitle') {
            setinputTitle(value);
        } else if (name == 'inputAuthor') {
            setinputAuthor(value);
        } else if (name == 'inputPublisher') {
            setinputPublisher(value);
        } else if (name == 'inputpublishDate') {
            setinputpublishDate(value);
        } else if (name == 'inputEdition') {
            setinputEdition(value);
        } else if (name == 'inputISBN') {
            setinputISBN(value);
        }
    };
        
        // Event handler for button click
        const handleButtonClick = () => {
            // Call the function with the current input value
            //processInput(inputTitle, inputAuthor, inputPublish, inputpublishDate, inputEdition, inputISBN);
            sendDataToApi();

        };
        
        
    

    //useEffect(() => {
    //    populateAddBook();
    //}, []);

    const sendDataToApi = async () => {
        try {
            const response = await fetch('api/Books/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: inputId,
                    title: inputTitle,
                    author: inputAuthor,
                    publisher: inputPublisher,
                    publishDate: inputpublishDate,
                    edition: inputEdition,
                    ISBN: inputISBN,
                }),
            });

            if (response.ok) {
                console.log('Data sent successfully!');
                // Optionally, reset the input fields or perform other actions
                setinputId('');
                setinputTitle('');
                setinputAuthor('');
                setinputPublisher('');
                setinputpublishDate('');
                setinputEdition('');
                setinputISBN('');
            } else {
                console.error('Failed to send data to the API.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };



  return (
      <>
            <h1>Add a Book Record</h1>
          <div>
              <label>
                  Id:
                  <input type="number" name="inputId" value={inputId} onChange={handleInputChange} />
              </label>
              <label>
                  Title:
                  <input type="text" name="inputTitle" value={inputTitle} onChange={handleInputChange}  />
              </label>
              <label>
                  Author:
                  <input type="text" name="inputAuthor" value={inputAuthor} onChange={handleInputChange} />
              </label>
              <label>
                  Publisher:
                  <input type="text" name="inputPublisher" value={inputPublisher} onChange={handleInputChange} />
              </label>
              <label>
                  Publish Date:
                  <input type="date" name='inputpublishDate' value={inputpublishDate} onChange={handleInputChange} placeholder="e.g. 2000-09-11" />
              </label>
              <label>
                  Edition:
                  <input type="text" name="inputEdition" value={inputEdition} onChange={handleInputChange} />
              </label>
              <label>
                  ISBN:
                  <input type="text" name="inputISBN" value={inputISBN} onChange={handleInputChange} />
              </label>
              <button onClick={handleButtonClick}>Add Book</button>
              
          </div>
          
    
      </>
    );

    //async function populateAddBook() {
    //    const response = await fetch(`api/Books/add`);
    //    const data = await response.json();
    //    setBooks(data);
    //}
}

export default AddBooks;