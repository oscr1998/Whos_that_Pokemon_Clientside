describe('User Connection to Netlify', () => {
    it('Connects to App', () => {
      cy.visit('https://kakuna-matata.netlify.app')
      cy.get('.App')
    })
})

describe('User Connection to Netlify', () => {
    it('App loads .Home', () => {
      cy.get('.Home')
    })
})

describe('App renders all objects', () => {
    it('Renders Music Player', () => {
        cy.get('.App > :nth-child(1)')
    })

    it('Renders PokeTitle', () => {
        cy.get('#pokeTitle')
      })
    
    it('Renders Main Container', () => {
        cy.get('.formContainer')
    })

    it('Renders Chat Container', () => {
        cy.get('.chatContainer')
    })
})

describe('Game Menu', () => {
    it('Connects to app', () => {
      cy.get('body')
    })
})

describe('Chat Container', () => {
    it('Connects to app', () => {
      cy.get('body')
    })
})
