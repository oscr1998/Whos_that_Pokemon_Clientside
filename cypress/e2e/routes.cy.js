describe('User Connection to Netlify', () => {
    it('Connects to App', () => {
      cy.visit('https://kakuna-matata.netlify.app')
      cy.get('.App')
    })
})

https://kakuna-matata.netlify.app/leaderboard

describe('App Routes', () => {
    it('Connects to Leaderboard', () => {
      cy.request('https://kakuna-matata.netlify.app/leaderboard')
      cy.get('.Leaderboard')
      cy.get('.leaderboardContainer > :nth-child(1)')
      cy.get('.leaderboardContainer > :nth-child(2)')
      cy.get('.Leaderboard > .nes-btn')
    })
})
