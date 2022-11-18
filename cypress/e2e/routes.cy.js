describe('User Connection to Netlify', () => {
    it('Connects to App', () => {
      cy.visit('https://kakuna-matata.netlify.app')
      cy.get('.App')
    })
})

describe('App Routes', () => {
    it('Connects to Leaderboard', () => {
      cy.visit('https://kakuna-matata.netlify.app/')
      cy.get('.leaderboard > .nes-btn').click()
      cy.get('.Leaderboard')
    })

    it('Exits back from Leaderboard', () => {
      cy.visit('https://kakuna-matata.netlify.app/')
      cy.get('.leaderboard > .nes-btn').click()
      cy.get('.Leaderboard')
      cy.get('.Leaderboard > .nes-btn').click()
      cy.get('.formContainer')
    })

    it('Creates a game room', () => {
      cy.visit('https://kakuna-matata.netlify.app/')
      cy.get('.createRoom > label > .inputField').type('Pikachu')
      cy.get('.createRoom > .nes-btn').click()
      cy.get('.lobbySettings')
      cy.get('.lobbyPlayers')
    })

    it('Exits back from game room', () => {
      cy.visit('https://kakuna-matata.netlify.app/')
      cy.get('.createRoom > label > .inputField').type('Pikachu')
      cy.get('.createRoom > .nes-btn').click()
      cy.get('button.nes-btn').click()
      cy.get('.formContainer')
    })
})
