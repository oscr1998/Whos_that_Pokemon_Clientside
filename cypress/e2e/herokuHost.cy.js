describe('Heroku App', () => {
  it('Connects to kakunamatata.herokuapp', () => {
    cy.visit('https://kakunamatata.herokuapp.com')
  })

  it('Retrieves data from Heroku App', () => {
    cy.get('body').contains('Kakuna Matata', { matchCase: true})
  })
})
