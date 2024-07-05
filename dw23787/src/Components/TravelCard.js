import React, { useState } from 'react';
import './TravelCard.css';
import { Link } from 'react-router-dom';

function TravelCard({id, image, title}) {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(!isClicked);
    };

    return (
        <Link to={`/traveldetail/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div
            className={`card ${isClicked ? 'animate-click' : ''}`}
            style={{ width: '18rem', cursor: 'pointer' }}
            onClick={handleClick}
        >
            <img
                src={image === null || image === "" ? "/default.webp" : "/default.webp"}
                className="card-img-top"
                alt="Sunset Over the Sea"
            />
            <div className="card-body">
                <p className="card-text">
                   {title}
                </p>
            </div>
        </div>
        </Link>
    );
}

export default TravelCard;