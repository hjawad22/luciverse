import React from "react";
import PropTypes from "prop-types";
import "../Card/Card.css";

const Card = ({ quote, character }) => {
    return (
        <div className="card">
            <h3 className="card-text">"{quote}"</h3>
            <p className="card-text author">{character}</p>
        </div>
    );
};

export default Card;

Card.propTypes = {
<<<<<<< Updated upstream
    quote: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
=======
    quote: propTypes.string.isRequired,
    character: propTypes.string.isRequired,
>>>>>>> Stashed changes
};