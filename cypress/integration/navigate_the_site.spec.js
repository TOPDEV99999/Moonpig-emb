context('Navigation', () => {
  it('can navigate around the website', () => {
    cy.visit('http://localhost:8080')

    cy.get('[id="shop-button"]').click()
    cy.get('section:contains("Price")')

    cy.get('[id="back"]').click()
    cy.get('h2:contains("See All Cards")')

    cy.get('[id="see-cards"]').click()
    cy.get('section:contains("Price")')
  })
})