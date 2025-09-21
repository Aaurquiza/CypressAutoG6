
const ClienteEmail = 'metallica.test@mailinator.com';
const ClientePassword = 'Metal_Test#2001';

Cypress.Commands.add('loginCliente', () => {
  cy.visit('https://vps-3696213-x.dattaweb.com/');
  cy.get('.justify-end > .text-sm').click(); // Click on "Iniciar sesión"
  cy.get('[data-cy="input-email"]').type(ClienteEmail);
  cy.get('[data-cy="input-password"]').type(ClientePassword);
  cy.get('[data-cy="btn-login"]').click();
  cy.get('[data-cy="error-message"]').should('not.exist');
});

Cypress.Commands.add('logOut', () => {
cy.get('.lg\\:hidden > .justify-end > .z-0').click(); // Open the menu
cy.get(':nth-child(8) > .pb-4').should('be.visible').click(); // Click on "Cerrar sesión"
});

const PersonaEmail = 'gmail@gmail.com';
const PersonaPassword = 'Gmail12.';

Cypress.Commands.add('loginPersona', () => {
  cy.visit('https://vps-3696213-x.dattaweb.com/');
  cy.get('.justify-end > .text-sm').click(); // Click on "Iniciar sesión"
  cy.get('[data-cy="input-email"]').type(PersonaEmail);
  cy.get('[data-cy="input-password"]').type(PersonaPassword);
  cy.get('[data-cy="btn-login"]').click();
  cy.get('[data-cy="error-message"]').should('not.exist');
});





// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })