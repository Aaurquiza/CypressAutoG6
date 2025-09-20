describe('Automatización del registro de usuario', () => {
    // Antes de cada test, visitamos la página de registro
    beforeEach(() => {
        cy.visit('https://ticketazo.com.ar/auth/registerUser');
    });

    it('Debe registrar a un nuevo usuario en Ticketazo', () => {
        // Generar email y DNI aleatorios para evitar duplicados
        const randomEmail = `metallica.test${Math.floor(Math.random() * 10000)}@mailinator.com`;
        const randomDni = `${Math.floor(10000000 + Math.random() * 90000000)}`;

        // Paso 1: Localizar los campos e introducir los datos
        cy.get('[data-cy="input-nombres"]').type('Metallica');
        cy.get('[data-cy="input-apellido"]').type('Test S.A');
        cy.get('[data-cy="input-telefono"]').type('3517294401');
        cy.get('[data-cy="input-dni"]').type('45.200.199');

        // Seleccionar Provincia y Localidad
        cy.get('[data-cy="select-provincia"]').click();
        cy.contains('Buenos Aires').click();
        cy.get('[data-cy="select-localidad"]').type('San Isidro');
        cy.contains('San Isidro').click();

        // Ingresar la fecha de nacimiento
        cy.get('[data-type="day"]').type('17');
        cy.get('[data-type="month"]').type('10');
        cy.get('[data-type="year"]').type('2001');

        // Usar la variable de email para ambos campos
        cy.get('[data-cy="input-email"]').type(randomEmail);
        cy.get('[data-cy="input-confirmar-email"]').type(randomEmail);

        // Ingresar y confirmar la contraseña
        cy.get('[data-cy="input-password"]').type('Metal_Test#2001');
        cy.get('[data-cy="input-repetir-password"]').type('Metal_Test#2001');

        // Paso 2: Hacer clic en el botón de registro
        cy.get('button[type="submit"]').click();

        // Paso 3: Validar que el registro fue exitoso verificando la redirección
        cy.url().should('include', '/auth/login');
    });
});