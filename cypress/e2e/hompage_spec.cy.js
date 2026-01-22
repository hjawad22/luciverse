describe('Homepage Spec', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://luciverse-api.onrender.com/api/quotes', {
      statusCode: 200,
      fixture: 'quotes',
    });
    cy.visit('https://luciverse-qjxr-rm92ririg-hjawad22s-projects.vercel.app/');
  });

  it('Should display the navbar with a logo and an about page link', () => {
    cy.get('nav')
      .find('.logo-container')
      .contains('h1', 'LuciVerse')
      .get('nav')
      .find('.about-container')
      .contains('h2', 'About');
  });

  it('Should have a fixed nav when a user scrolls', () => {
    cy.scrollTo('bottom', { duration: 900 });
    cy.get('.nav-container').should('have.css', 'position', 'fixed');
  });

  it('Should have an about tab that takes user to the about page', () => {
    cy.get('nav')
      .find('.about-container')
      .contains('h2', 'About')
      .click()
      .url()
      .should('eq', 'https://luciverse-qjxr-rm92ririg-hjawad22s-projects.vercel.app/About');
  });

  it('Should display a hero image and a welcome message', () => {
    cy.get('.hero-image-container')
      .should('have.css', 'background-image')
      .and(
        'include',
        'https://images.hdqwalls.com/wallpapers/lucifer-season-4-poster-ka.jpg'
      )
      .get('.hero-image-container')
      .contains('Welcome To The LuciVerse');
  });

  it('Should display TV show quotes', () => {
    cy.get('.cards-container .card').should('have.length', 11);

    cy.get('.cards-container .card')
      .eq(0)
      .within(() => {
        cy.get('h3.card-text').should('contain', 'What is it that you truly want?');
        cy.get('.author').should('contain', 'Lucifer');
      });

    cy.get('.cards-container .card')
      .eq(9)
      .within(() => {
        cy.get('h3.card-text').should('contain', 'I always get what I want.');
        cy.get('.author').should('contain', 'Lucifer');
      });

    cy.get('.cards-container .card')
      .eq(10)
      .within(() => {
        cy.get('h3.card-text').should(
          'contain',
          'What is it about humans that makes them so interesting? I mean, you’re all weak, self-destructive, and yet… endlessly fascinating.'
        );
        cy.get('.author').should('contain', 'Lucifer');
      });
  });

  it('Should display a form that lets user add a quote', () => {
    cy.get('.form-container').within(() => {
      cy.contains(
        '.form-text',
        "GOT A LUCIFIER QUOTE YOU DON'T SEE? ADD IT HERE, WE KNOW IT'S WHAT YOU TRULY DESIRE..."
      );
      cy.get('[placeholder="what is the quote?"]').type('Dear old dad!');
      cy.get('[placeholder="who would say it?"]').type('Lucifer');
      cy.get('.add-button').click();
    });

    cy.get('.cards-container .card').should('have.length', 12);

    cy.get('.cards-container .card')
      .last()
      .within(() => {
        cy.get('h3.card-text').should('contain.text', 'Dear old dad!');
        cy.get('.author').should('contain.text', 'Lucifer');
      });
  });

  it('Should display error loading message', () => {
    cy.intercept('GET', 'https://luciverse-api.onrender.com/api/quotes', {
      delay: 5000,
      statusCode: 200,
      fixture: 'quotes',
    });

    cy.get('.loading-message').should('be.visible');
  });
});
