describe('Netlify App', () => {
  it('Connects to kakuna-matata.netlify.app', () => {
    cy.visit('https://kakuna-matata.netlify.app')
  })

  it('Retrieves data from Netlify App', () => {
    cy.get('body')
  })

  it('Has Pokeballs ascending', () => {
    cy.get('.circlesContainer')
    cy.get('.form2 > form > :nth-child(1)')
  })

})
