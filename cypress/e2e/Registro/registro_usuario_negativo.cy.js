describe('Automatización del registro de usuario: Casos negativos', () => {
    beforeEach(() => {
        cy.visit('https://ticketazo.com.ar/auth/registerUser');
    });

    it('No debería registrar a un usuario con una contraseña menor a 6 caracteres', () => {
        // Datos de prueba personalizados
        const email = 'metallica.test@mailinator.com';
        const nombre = 'Metallica';
        const apellido = 'Test S.A';
        const shortPassword = 'Metal_'; 
        const dni = '45200199';

        // Paso 1: Localizar los campos e introducir los datos
        cy.get('[data-cy="input-nombres"]').type(nombre);
        cy.get('[data-cy="input-apellido"]').type(apellido);
        cy.get('[data-cy="input-telefono"]').type('3517294401');
        cy.get('[data-cy="input-dni"]').type(dni);
        
        // Seleccionar Provincia y Localidad
        cy.get('[data-cy="select-provincia"]').click();
        cy.contains('Buenos Aires').click();
        cy.get('[data-cy="select-localidad"]').type('San Isidro');
        cy.contains('San Isidro').click();
        
        // Ingresar la fecha de nacimiento
        cy.get('[data-type="day"]').type('17');
        cy.get('[data-type="month"]').type('10');
        cy.get('[data-type="year"]').type('2001');

        // Ingresar el email
        cy.get('[data-cy="input-email"]').type(email);
        cy.get('[data-cy="input-confirmar-email"]').type(email);

        // Ingresar la contraseña corta que causará el fallo
        cy.get('[data-cy="input-password"]').type(shortPassword);
        cy.get('[data-cy="input-repetir-password"]').type(shortPassword);

        // Paso 2: Hacer clic en el botón de registro
        cy.get('button[type="submit"]').click();

        // Paso 3: Validar que el registro falla verificando que la URL no cambia
        cy.url().should('not.include', '/auth/login');
    });
});