import React, { Component } from "react";
import PropTypes from "prop-types"
import "./Form.css";


class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quote: '',
            author: '',
            error: ''
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    submitQuote = (event) => {
        event.preventDefault();

        if (this.state.quote && this.state.author) {
            this.setState({ error: '' })
            const newQuote = {
                id: Date.now(),
                ...this.state
            }
            this.props.addQuote(newQuote);
            this.clearInputs();
        } else {
            this.setState({ error: 'Please fill in all the required fields.' });
        }
    }

    clearInputs = () => {
        this.setState({ quote: '', author: '' });
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
                        name="author"
                        value={this.state.author}
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

