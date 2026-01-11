describe('homepage spec', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://luciverse-api.onrender.com/api/quotes', {
      statusCode: 200,
      fixture: 'quotes'
    })
    cy.visit('http://localhost:3000')
  });

  it('Should display the navbar with a logo and an about page link', () => {
    cy.get('nav').find('.logo-container').contains('h1', 'LuciVerse')
      .get('nav').find('.about-container').contains('h2', 'About')
  })

  it('Should have a fixed nav when a user scrolls', () => {
    cy.scrollTo('bottom', { duration: 900 });
    cy.get('.nav-container').should('have.css', 'position', 'fixed');
  });


  it('Should have an about tab that takes user to the about page', () => {
    cy.get('nav').find('.about-container').contains('h2', 'About')
      .click()
      .url().should('eq', 'http://localhost:3000/About');
  })

  it('Should display a hero image and a welcome message', () => {
    cy.get('.hero-image-container')
      .should('have.css', 'background-image')
      .and('include', 'https://images.hdqwalls.com/wallpapers/lucifer-season-4-poster-ka.jpg')
      .get('.hero-image-container').contains('Welcome To The LuciVerse')
  })

  it('should display TV show quotes', () => {
    cy.get('.cards-container')
      .find('.card')
      .should('have.length', 10)
      .get(':nth-child(1) > h3.card-text').contains("Take a swing...you'll have splinters in your stool.")
      .get(':nth-child(1) > .author').contains('Lucifer Morningstar')
      .get(':nth-child(10) > h3.card-text').contains('We might not always understand it, but God has a plan.')
      .get(':nth-child(10) > .author').contains('Father Frank')
  });

  it('Should display a form that lets user add a quote', () => {
    cy.get('.form-container').contains('.form-text', "GOT A LUCIFIER QUOTE YOU DON'T SEE? ADD IT HERE, WE KNOW IT'S WHAT YOU TRULY DESIRE...")
    .get('[placeholder="what is the quote?"]').type('Dear old dad!')
    .get('[placeholder="who would say it?"]').type('Lucifier Morningstar')
    .get('.add-button').click()
    .get('.cards-container')
    .find('.card')
    .should('have.length', 11)
    .get('.cards-container > :nth-child(11)').contains('Dear old dad!')
    .get(':nth-child(11) > .author').contains('Lucifier Morningstar')
  });
 
  it('should display error loading message', () => {
    cy.intercept("GET", "https://lucifer-quotes.vercel.app/api/quotes/10", {
      delay: 5000, 
      statusCode: 200,
      fixture: "quotes"
    });
      cy.get('.loading-message') 
      .should('be.visible');
  });

})