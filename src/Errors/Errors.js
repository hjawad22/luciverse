import React from "react";
import "../Errors/Errors.css";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import PropTypes from "prop-types";


const Errors = ({ errorMessage }) => {
    if (errorMessage) {
        return (
            <div className="bad-path-container">
                <p className="error">{errorMessage}</p>
                <img className="luci-img" src="https://variety.com/wp-content/uploads/2016/01/tom_ellis_lucifer.jpg?w=1000&h=563&crop=1" alt="Tom ellis looking up in a purple sweater" />
            </div>
        )
    } return (
        <div className="bad-path-container">
            <p className="error">404 Page Not Found</p>
            <img className="luci-img" src="https://variety.com/wp-content/uploads/2016/01/tom_ellis_lucifer.jpg?w=1000&h=563&crop=1" alt="Tom ellis looking up in a purple sweater" />
            <NavLink to="/">
                <button className="back-home-button">Back Home</button>
            </NavLink>
        </div>)
};

export default Errors;

Errors.propTypes = {
    errorMessage: PropTypes.string.isRequired
};