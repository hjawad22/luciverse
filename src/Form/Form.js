import React, { Component } from "react";
import PropTypes from "prop-types"
import "./Form.css";


class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quote: '',
            character: '',
            error: ''
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    
 submitQuote = (event) => {
        event.preventDefault();

        const { quote, character } = this.state;

        if (quote && character) {
            this.setState({ error: '' });

            // Call the addQuote function passed from App
            this.props.addQuote(quote, character);

            // Clear the input fields
            this.clearInputs();
        } else {
            this.setState({ error: 'Please fill in all the required fields.' });
        }
    }

    clearInputs = () => {
        this.setState({ quote: '', character: '' });
    }


    render() {
        return (
            <>
                {this.state.error && <p className="error-message">{this.state.error}</p>}
                <form>
                    <input
                        type="text"
                        className="input"
                        placeholder="what is the quote?"
                        name="quote"
                        value={this.state.quote}
                        onChange={event => this.handleChange(event)}
                    />

                    <input
                        type="text"
                        className="input"
                        placeholder="who would say it?"
                        name="character"
                        value={this.state.character}
                        onChange={event => this.handleChange(event)}
                    />

                    <button className="add-button" onClick={event => this.submitQuote(event)}>ADD</button>
                </form>
            </>
        );
    };
};

export default Form;

Form.propTypes = {
    addQuote: PropTypes.func.isRequired
};

