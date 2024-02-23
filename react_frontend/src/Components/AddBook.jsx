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
    const [showToast, setShowToast] = useState(false);

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

        try {
            await sendDataToApi();
            // Redirect to the allbook route
            navigate("/allbook");
        } catch (error) {
            console.error('Error:', error);
        }
    };
        
    const sendDataToApi = async () => {
        try {
            const token = localStorage.getItem('key');
            const response = await fetch('api/Books/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${token}`
                },
                body: JSON.stringify({
                    
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
                      {/*<tr>*/}
                      {/*    <th scope="row">ID : </th>*/}
                      {/*    <td>*/}
                      {/*        <input type="number" name="inputId" value={inputId} onChange={handleInputChange} />*/}
                      {/*    </td>*/}
                      {/*</tr>*/}
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
                          {showToast && (
                              <div className="toast-container position-fixed bottom-0 end-0 p-3">
                                  <div id="liveToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                                      <div className="toast-header">
                                          <img src="..." className="rounded me-2" alt="..." />
                                          <strong className="me-auto">Bootstrap</strong>
                                          <small>11 mins ago</small>
                                          <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                                      </div>
                                      <div className="toast-body">
                                          Hello, world! This is a toast message.
                                      </div>
                                  </div>
                              </div>
                          )}
                      </tr>
                      
                  </tbody>
              </table>           
          </div>
      </>
    );
}

export default AddBooks;