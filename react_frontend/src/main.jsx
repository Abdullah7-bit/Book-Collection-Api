import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import AddBooks from './Components/AddBook.jsx'
import GetBooks from './Components/GetBooks.jsx'
import BooksId from './Components/GetBookId.jsx'
import EditBook from './Components/EditBook.jsx'
import Card from './Components/Card.jsx'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import './index.css'


// Adding React Router Functionality
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [{
            path: "/",
            element:<Card/>
        }, {
            path: "/addbook",
            element: <AddBooks />,

        }, {
            path: "/allbook",
            element: <GetBooks/>,
            }, {
            path: "/searchbook",
            element: <BooksId/>,
            }, {
            path: "/editbook/:id",
            element: <EditBook/>,
            }]
    }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <RouterProvider router={router} />
  </React.StrictMode>
)
