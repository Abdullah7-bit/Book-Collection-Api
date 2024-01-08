import GetBooks from './Components/GetBooks';
import GetBookId from './Components/GetBookId';
import AddBooks from './Components/AddBook';
import './App.css';
import { Outlet, Link } from "react-router-dom";



function App() {
    

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">

                    <Link className="navbar-brand" to={`/`}>Home</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                
                                <Link className="nav-link" to={`allbook`}>All Books</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={`addbook`}>Add Book</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={`editbook`}>Edit Books</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={`searchbook`}>Search Books</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container">
                <Outlet />
            </div>
        
        </>
    );
     
   
}

export default App;