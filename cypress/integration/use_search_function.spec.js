context('Search', () => {
  it('can navigate around the website', () => {
    cy.visit('http://localhost:8080')

    cy.get('[id="shop-button"]').click()
    cy.get('section:contains("Search")')

    cy.get('[id="search"]').type('christmas')
  })
})