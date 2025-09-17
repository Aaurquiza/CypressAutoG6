describe('Validación de Login y Redirección en Ticketazo (Formulario Tradicional)', () => {
  it('Debe redirigir a login y fallar con email inválido', () => {
    cy.visitAndCheckRedirect('https://ticketazo.com.ar/newEvent', '/auth/login');
    cy.fixture('crearevento.json').then((data) => {
      cy.fillLoginForm('[data-cy="input-email"]', '[data-cy="input-password"]', '[data-cy="btn-login"]', 'e', data.contrasenaInvalida);
      cy.get('[data-slot="error-message"]').should('contain', 'Incluye un signo "@" en la dirección de correo electrónico');
    });
  });

  it('Debe logearse correctamente con formulario tradicional y redirigir a newEvent', () => {
    cy.fixture('crearevento.json').then((data) => {
      cy.loginWithForm(data.usuarioValido, data.contrasenaValida);
    });
  });
});