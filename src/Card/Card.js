import React from "react";
import PropTypes from "prop-types";
import "../Card/Card.css";

const Card = ({ quote, author }) => {
    return (
        <div className="card">
            <h3 className="card-text">"{quote}"</h3>
            <p className="card-text author">{author}</p>
        </div>
    );
};

export default Card;

Card.propTypes = {
    quote: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
};