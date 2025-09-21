describe('recupero de contraseña', () => {
    it('RecuperoContrasena', () => {
        cy.visit('https://ticketazo.com.ar');
        cy.get('.justify-end > .text-sm').click(); // Click on "Iniciar sesión"
        cy.get('[data-cy="btn-forgot-password"]').click(); // Click on "¿Olvidaste tu contraseña?"
        cy.get('[data-cy="input-email"]').type('gmail@gmail.com'); // Ingresar el email registrado
        cy.get('[data-cy="btn-enviar"]').click();
        /*cy.get('Se ha enviado un correo para restablecer la contraseña').should('be.visible');*/
        cy.get('.text-green-600').should('contain', 'Se ha enviado un correo para restablecer la contraseña');
    });
});