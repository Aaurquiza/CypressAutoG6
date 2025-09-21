/*El siguiente test verifica que al intentar recuperar la contraseña con un mail no registrado,
se muestra el mensaje de error correspondiente.*/

describe('recupero de contraseña', () => {
    it('RecuperoContrasena', () => {
        cy.visit('https://ticketazo.com.ar');
        cy.get('.justify-end > .text-sm').click(); // Click on "Iniciar sesión"
        cy.get('[data-cy="btn-forgot-password"]').click(); // Click on "¿Olvidaste tu contraseña?"
        cy.get('[data-cy="input-email"]').type('mailinvalido@invalido'); // Ingresar el email registrado
        cy.get('[data-cy="btn-enviar"]').click();
        cy.get('.text-red-600').should('contain', 'Mail Invalido');
    });
});