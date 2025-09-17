// Comando genérico para visitar una URL y verificar redirección
Cypress.Commands.add('visitAndCheckRedirect', (url, expectedUrlPart) => {
  cy.visit(url);
  cy.url().should('include', expectedUrlPart);
});

// Comando genérico para llenar un formulario de login
Cypress.Commands.add('fillLoginForm', (emailSelector, passwordSelector, submitSelector, email, password) => {
  cy.get(emailSelector || '[data-cy="input-email"]').type(email);
  cy.get(passwordSelector || '[data-cy="input-password"]').type(password);
  cy.get(submitSelector || '[data-cy="btn-login"]').click(); // Asumimos btn-login para el botón convencional
});

// Comando para login tradicional con redirección
Cypress.Commands.add('loginWithForm', (email, password, emailSelector = '[data-cy="input-email"]', passwordSelector = '[data-cy="input-password"]', submitSelector = '[data-cy="btn-login"]', redirectUrl = '/newEvent') => {
  cy.visitAndCheckRedirect('https://ticketazo.com.ar/newEvent', '/auth/login');
  cy.fillLoginForm(emailSelector, passwordSelector, submitSelector, email, password);
  cy.url().should('include', redirectUrl);
});

// Comando genérico para logout (opcional, lo dejamos por ahora)
Cypress.Commands.add('logout', (logoutSelector = 'button[aria-label="Logout"]') => {
  cy.get(logoutSelector).click();
});