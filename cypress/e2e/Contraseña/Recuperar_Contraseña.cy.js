describe('Automatización: Recuperación de Contraseña', () => {

    const userData = {
        email: 'metallica.test@mailinator.com'
    };

    it('Debe permitir a un usuario solicitar la recuperación de su contraseña', () => {
        // Paso 1: Ir a la página de login
        cy.visit('https://vps-3696213-x.dattaweb.com/auth/login');
        
        // Paso 2: Hacer clic en el botón "¿Olvidaste tu contraseña?"
        cy.get('[data-cy="btn-forgot-password"]').click();

        // Paso 3: Validar que la URL cambió a la página de recuperación de contraseña
        cy.url({ timeout: 10000 }).should('include', '/auth/forgotPassword');

        // Paso 4: Ingresar el correo electrónico en el formulario de recuperación
        cy.get('[data-cy="input-email"]').type(userData.email);

        // Paso 5: Capturar el alert que aparece al enviar
        cy.on('window:alert', (text) => {
            cy.log('Mensaje de recuperación capturado: ' + text);
            expect(text).to.contain('Se ha enviado un correo');
        });

        // Paso 6: Hacer clic en el botón "Enviar"
        cy.get('[data-cy="btn-enviar"]').click();

        // Paso 7: (Opcional) esperar a que redirija al login
        // cy.url({ timeout: 10000 }).should('include', '/auth/login');
    });
});
