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
    quote: PropTypes.string.isRequired,
    character: PropTypes.string.isRequired,
};