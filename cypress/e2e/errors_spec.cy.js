describe('Errors Spec', () => {
  it('Should display error message for home page for client side error', () => {
    cy.intercept('GET', 'https://luciverse-api.onrender.com/api/quotes', {
      statusCode: 404,
    });

    cy.visit('https://luciverse-qjxr-rm92ririg-hjawad22s-projects.vercel.app/', {
      failOnStatusCode: false,
    })
      .get('.error')
      .contains('Oops! We seem to be having some technical issues, please try again later!')
      .get('.luci-img')
      .should('be.visible');
  });

  it('Should display error message for home page for server side error', () => {
    cy.intercept('GET', 'https://luciverse-api.onrender.com/api/quotes', {
      statusCode: 500,
    });

    cy.visit('https://luciverse-qjxr-rm92ririg-hjawad22s-projects.vercel.app/')
      .get('.error')
      .contains('Oops! We seem to be having some technical issues, please try again later!')
      .get('.luci-img')
      .should('be.visible');
  });

  it('Should display error message for wild card path', () => {
    cy.visit('https://luciverse-qjxr-rm92ririg-hjawad22s-projects.vercel.app/does-not-exist')
      .get('.error')
      .contains('404 Page Not Found')
      .get('.luci-img')
      .should('be.visible')
      .get('.back-home-button')
      .click()
      .url()
      .should('eq', 'https://luciverse-qjxr-rm92ririg-hjawad22s-projects.vercel.app/');
  });

  it('Should not add a quote when input fields are empty', () => {
    cy.intercept('GET', 'https://lucifer-quotes.vercel.app/api/quotes/10', {
      statusCode: 200,
      fixture: 'quotes',
    });

    cy.visit('https://luciverse-qjxr-rm92ririg-hjawad22s-projects.vercel.app/')
      .get('.add-button')
      .click()
      .get('.cards-container')
      .find('.card')
      .should('have.length', 11)
      .get('.error-message')
      .contains('Please fill in all the required fields.');
  });
});
