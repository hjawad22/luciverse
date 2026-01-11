describe('about page spec', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://luciverse-api.onrender.com/api/quotes', {
      statusCode: 200,
      fixture: 'quotes'
    })
    cy.visit('http://localhost:3000/About')
  });

  it('Should display the navbar with a logo the takes user back to homepage', () => {
    cy.get('nav').find('.about-container').contains('h2', 'About')
      .get('nav').find('.logo-container').contains('h1', 'LuciVerse')
      .click()
      .url().should('eq', 'http://localhost:3000/')
  })

  it('Should display title and Tv show description', () => {
    cy.get('.about-header').contains('About The Show')
      .get('.about-pg-container > :nth-child(2)').contains('"Lucifer" is a television series that originally premiered on Fox and later moved to Netflix. It is based on the DC Comics character created by Neil Gaiman, Sam Kieth, and Mike Dringenberg. The show follows Lucifer Morningstar, portrayed by Tom Ellis, who decides to abandon his throne in Hell and moves to Los Angeles. He becomes the owner of a nightclub called Lux and starts assisting the LAPD in solving various crimes.')
      .get('.about-pg-container > :nth-child(3)').contains('The series combines elements of crime procedural, supernatural, and drama genres. It explores themes of redemption, morality, and the complexity of human nature. Over the seasons, "Lucifer" has gained a dedicated fanbase and has been praised for its charismatic performances, witty dialogue, and intriguing storylines.')
      .get('.about-pg-container > :nth-child(4)').contains('The show has received critical acclaim and has been applauded for its unique blend of genres and compelling character development. It has also sparked discussions and fan theories due to its exploration of theological and philosophical concepts in a contemporary setting.')
      .get('.about-pg-container > :nth-child(5)').contains('With its engaging storytelling and charismatic cast, "Lucifer" has become a popular series enjoyed by fans around the world. It has garnered a strong following and has been renewed for multiple seasons, captivating viewers with its mix of supernatural elements and compelling narratives.')
  })

  it('Should have a button that takes user back to homepage', () => {
    cy.get('.back-button')
      .click()
      .url().should('eq', 'http://localhost:3000/');
  })


})