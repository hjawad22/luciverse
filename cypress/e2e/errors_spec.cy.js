describe('Errors spec', () => {
  it('should display error message for home page for client side error', () => {
    cy.intercept("GET", "https://lucifer-quotes.vercel.app/api/quotes/10", {
      statusCode: 404,
    });
    cy.visit('http://localhost:3000')
      .get('.error').contains('Oops! We seem to be having some technical issues, please try again later!')
      .get('.luci-img').should('be.visible')
  })

  it('should display error message for home page for server side error', () => {
    cy.intercept("GET", "https://lucifer-quotes.vercel.app/api/quotes/10", {
      statusCode: 500,
    });
    cy.visit('http://localhost:3000')
      .get('.error').contains('Oops! We seem to be having some technical issues, please try again later!')
      .get('.luci-img').should('be.visible')
  })

  it('should display error message for wild card path', () => {
    cy.intercept("GET", "https://luciverse-api.onrender.com/api/quotes", {
      statusCode: 200,
      fixture: "quotes"
    });
    cy.visit('http://localhost:3000/24')
      .get('.error').contains('404 Page Not Found')
      .get('.luci-img').should('be.visible')
      .get('.back-home-button')
      .click()
      .url().should('eq', 'http://localhost:3000/');
  });


  it('should not add a quote when input fields are empty', () => {
    cy.intercept("GET", "https://lucifer-quotes.vercel.app/api/quotes/10", {
      statusCode: 200,
      fixture: "quotes"
    });
    cy.visit('http://localhost:3000')
      .get('.add-button').click()
    cy.get('.cards-container')
      .find('.card')
      .should('have.length', 10);
    cy.get('.error-message').contains('Please fill in all the required fields.')
  });
})