import React, { useState, useEffect} from 'react';

function BooksId() {
    const [books, setBooks] = useState();
    const Id = 1;


    useEffect(() => {
        populateBookData_Id();
    }, []);

    const contents = books === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Edition</th>
                    <th>ISBN</th>
                </tr>
            </thead>
            <tbody>
                {books.map(forecast =>
                    <tr key={forecast.id}>
                        <td>{forecast.title}</td>
                        <td>{forecast.author}</td>
                        <td>{forecast.edition}</td>
                        <td>{forecast.isbn}</td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div>
            <h1 id="tabelLabel">Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
        </div>
    );

    async function populateBookData_Id() {
        const response = await fetch(`api/Books/1`);
        const data = await response.json();
        setBooks(data);
    }
} 

export default BooksId;