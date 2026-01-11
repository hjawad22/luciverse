import "./App.css";
import Nav from "../Nav/Nav";
import { Component } from "react";
import { fetchQuotes } from "../apiCalls";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import Quotes from "../Quotes/Quotes";
import About from "../About/About";
import Errors from "../Errors/Errors";
import Form from "../Form/Form";

class App extends Component {
  constructor() {
    super()
    this.state = {
      quotes: [],
      errorMessage: '',
      loading: true
    }
  }
  componentDidMount() {
    fetchQuotes()
      .then(quotesData => {
        this.setState({
          quotes: quotesData,
          loading: false,
        });
      })
      .catch(error => {
        this.setState({
          errorMessage: error.message
        });
      });
  };

  addQuote = (newQuote) => {
    this.setState({ quotes: [...this.state.quotes, newQuote] });
  }

  render() {
    return (
      <>
        <Nav />
        <main className="App">
          <Switch>
            <Route exact path="/" render={() => {
              if (this.state.errorMessage) {
                return (
                  <Errors errorMessage={this.state.errorMessage} />
                )
              }
              return (
                <>
                  <article className="hero-image-container">
                    <h1 className="welcome-message">Welcome To The LuciVerse.</h1>
                  </article>
                  <div className="form-container">
                    <h2 className="form-text">GOT A LUCIFIER QUOTE YOU DON'T SEE? ADD IT HERE, WE KNOW IT'S WHAT YOU TRULY DESIRE...</h2>
                    <Form addQuote={this.addQuote }/>
                  </div>
                  <Quotes quotes={this.state.quotes} loading={this.state.loading} />
                </>
              );
            }} />
            <Route exact path="/About" component={About} />
            <Route exact path="*" render={() => {
              return (
                <Errors errorMessage={this.state.errorMessage} />
              );
            }} />
          </Switch>
        </main>
      </>
    );
  };
};
export default App;
