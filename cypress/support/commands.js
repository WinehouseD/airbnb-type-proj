Cypress.Commands.add('login', (email, password) => {
  cy.visit('http://localhost:5173/signin');

  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button').contains('Sign In').click();

  cy.url().should('not.include', '/signin');
});
