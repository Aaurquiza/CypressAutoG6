describe('Automatización del Login de Usuario', () => {

    // Datos de prueba para el inicio de sesión
    const userData = {
        email: 'metallica.test@mailinator.com',
        password: 'Metal_Test#2001'
    };

    // Antes de cada test, visitamos la página de inicio de sesión
    beforeEach(() => {
        cy.visit('https://ticketazo.com.ar/auth/login');
    });

    it('Debe permitir que un usuario registrado inicie sesión correctamente', () => {
        // Paso 1: Localizar los campos e introducir el email y la contraseña
        cy.get('[data-cy="input-email"]').type(userData.email);
        cy.get('[data-cy="input-password"]').type(userData.password);

        // Paso 2: Hacer clic en el botón de iniciar sesión
        cy.get('[data-cy="btn-login"]').click();

        // Paso 3: Validar que el login fue exitoso buscando el input con el placeholder
        cy.get('input[placeholder="Busca tu próxima función!"]').should('be.visible'); 
    });
});