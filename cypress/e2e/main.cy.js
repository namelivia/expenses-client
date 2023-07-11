describe('e2e tests', () => {
  it('welcome page', () => {
    cy.intercept('GET', 'https://expenses.localhost.pomerium.io/api/users/me', {
      fixture: 'users/me',
    }).as('getMe')
    cy.intercept(
      'GET',
      'https://expenses.localhost.pomerium.io/api/expenses/totals',
      {
        fixture: 'expenses/totals',
      },
    ).as('getTotals')
    cy.visit('/')
    cy.contains('New')
    cy.contains('List')
  })
})
