import React from 'react';
import { Link } from "react-router-dom";

function Card() {
    return (
        <>
            <div className="card m-3">
                <div className="card-header">
                    Featured
                </div>
                <div className="card-body">
                    <h5 className="card-title">Browse Around</h5>
                    <p className="card-text">To see functionality click on the above navbar.</p>
                    <Link to={'/allbook'} className="btn btn-primary">See Book Records.</Link>
                </div>
            </div>
      </>
    
  );
}

export default Card;