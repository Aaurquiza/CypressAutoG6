describe('Automatización del Login: Caso Negativo', () => {

    // Datos de prueba para el inicio de sesión incorrecto
    const userData = {
        email: 'metallica.test@mailinator.com',
        password: 'password_incorrecta' // Contraseña incorrecta
    };
    
    // Antes de cada test, visitamos la página de inicio de sesión
    beforeEach(() => {
        cy.visit('https://ticketazo.com.ar/auth/login');
    });

    it('No debe permitir el inicio de sesión con una contraseña incorrecta', () => {
        // Paso 1: Localizar los campos e introducir el email y la contraseña incorrecta
        cy.get('[data-cy="input-email"]').type(userData.email);
        cy.get('[data-cy="input-password"]').type(userData.password);

        // Paso 2: Hacer clic en el botón de iniciar sesión
        cy.get('[data-cy="btn-login"]').click();

        // Paso 3: Validar que el login falló buscando el mensaje de error exacto
        cy.contains('Correo o contraseña incorrectos').should('be.visible'); 
    });
});