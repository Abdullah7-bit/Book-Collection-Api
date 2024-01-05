import React, { useState, useEffect} from 'react';

function BooksId() {
    const [books, setBooks] = useState();
    
    // State to hold the input value
    const [inputValue, setInputValue] = useState('');

    let max;
    // Function to process the input value
    const processInput = async (value) => {
        // Perform further processing with the input value
        console.log(`Processing input: ${value}`);
        try {
            await populateBookData_Id(value);
            if (books && books.author) {
                console.log(`Author: ${books.author}`);
                console.log(`ID: ${books.id}`);
            } else {
                max = 0;
                console.log('Author information not available');
            }
        } catch (error) {
            console.error('Error fetching book data:', error);
        }
        
        // For example, you could make an API call, perform calculations, etc.
    };
    
    // Event handler for input change
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    // Event handler for button click
    const handleButtonClick = () => {
        // Call the function with the current input value
        processInput(inputValue);
    };
    useEffect(() => {
        populateBookData_Id();
    }, []);

    
    
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
                </tr>
            </thead>
            <tbody>
                <tr>
                    {books.id == null ? <td colSpan="7">No data for given ID</td> : (
                        <>
                            <td>{books.id}</td>
                            <td>{books.title}</td>
                            <td>{books.author}</td>
                            <td>{books.publisher}</td>
                            <td>{books.publishedDate}</td>
                            <td>{books.edition}</td>
                            <td>{books.isbn}</td>
                        </>
                    )}
                    
                </tr>
                

            </tbody>
        </table>;   

    return (
        <div>
            <h1>Search Book Data</h1>
            <label>
                Input:
                <input type="text" value={inputValue} onChange={handleInputChange}  />
            </label>
            <button onClick={handleButtonClick}>Process</button>
            {contents}
        </div>
    );
    

    async function populateBookData_Id() {
        const response = await fetch(`api/Books/${inputValue}`);
        const data = await response.json();
        setBooks(data);
    }
} 

export default BooksId;