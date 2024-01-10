import React, { useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();
    let update;

        // Event handler for button click
        const handleButtonClick = async () => {
            // Call the function with the current input value
            //processInput(inputTitle, inputAuthor, inputPublish, inputpublishDate, inputEdition, inputISBN);

            
            await sendDataToApi();

                // Redirect to the allbook route          
                setTimeout(() => {
                    navigate("/allbook");
                }, 5000);

            
        };
        
        
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

                update = (
                    <div class="toast-container position-fixed bottom-0 end-0 p-3">
                        <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                            <div class="toast-header">
                                <img src="..." class="rounded me-2" alt="..." />
                                <strong class="me-auto">Bootstrap</strong>
                                <small>11 mins ago</small>
                                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                            </div>
                            <div class="toast-body">
                                Hello, world! This is a toast message.
                            </div>
                        </div>
                    </div>
                );

                console.log('Data sent successfully!');

                // Reset the input fields to Empty
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
              <table className="table table-borderless">
                 
                  <tbody>
                      <tr>
                          <th scope="row">ID : </th>
                          <td>
                              <input type="number" name="inputId" value={inputId} onChange={handleInputChange} />
                          </td>

                      </tr>
                      <tr>
                          <th scope="row">Title : </th>
                          <td>
                              <input type="text" name="inputTitle" value={inputTitle} onChange={handleInputChange} />
                          </td>
                      </tr>
                      <tr>
                          <th scope="row">Author:</th>

                          <td>
                              <input type="text" name="inputAuthor" value={inputAuthor} onChange={handleInputChange} />
                          </td>
                      </tr>
                      <tr>
                          <th scope="row">Publisher:</th>

                          <td>
                              <input type="text" name="inputPublisher" value={inputPublisher} onChange={handleInputChange} />
                          </td>
                      </tr>
                      <tr>
                          <th scope="row">Publish Date:</th>

                          <td>
                              <input type="text" name="inputpublishDate" value={inputpublishDate} onChange={handleInputChange} placeholder="e.g. 2000-09-11" />
                          </td>
                      </tr>
                      <tr>
                          <th scope="row"> Edition:</th>

                          <td>
                              <input type="text" name="inputEdition" value={inputEdition} onChange={handleInputChange} />
                          </td>
                      </tr>
                      <tr>
                          <th scope="row">ISBN : </th>

                          <td>
                              <input type="text" name="inputISBN" value={inputISBN} onChange={handleInputChange} />
                          </td>
                      </tr>
                      <tr>
                          <td>
                              <button id="liveToastBtn" onClick={handleButtonClick}>Add Book</button>
                          </td>
                          {update}
                      </tr>
                      
                  </tbody>
              </table>


            
                 
                  

             
              
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