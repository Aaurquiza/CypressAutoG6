describe('Automatización del registro de usuario', () => {

    // Objeto con los datos de prueba
    const userData = {
        nombres: 'Metallica',
        apellido: 'Test S.A',
        email: 'metallica.test@mailinator.com',
        dni: '45200199', // El DNI se ingresa sin puntos
        telefono: '3517294401',
        provincia: 'Buenos Aires',
        localidad: 'San Isidro',
        diaNacimiento: '17',
        mesNacimiento: '10',
        anioNacimiento: '2001',
        password: 'Metal_Test#2001'
    };
    
    // Antes de cada test, visitamos la página de registro
    beforeEach(() => {
        cy.visit('https://ticketazo.com.ar/auth/registerUser');
    });

    it('Debe registrar a un nuevo usuario en Ticketazo', () => {

        // Paso 1: Localizar los campos e introducir los datos
        cy.get('[data-cy="input-nombres"]').type(userData.nombres);
        cy.get('[data-cy="input-apellido"]').type(userData.apellido);
        cy.get('[data-cy="input-telefono"]').type(userData.telefono);
        cy.get('[data-cy="input-dni"]').type(userData.dni);

        // Seleccionar Provincia y Localidad
        cy.get('[data-cy="select-provincia"]').click();
        cy.contains(userData.provincia).click();
        cy.get('[data-cy="select-localidad"]').type(userData.localidad);
        cy.contains(userData.localidad).click();

        // Ingresar la fecha de nacimiento
        cy.get('[data-type="day"]').type(userData.diaNacimiento);
        cy.get('[data-type="month"]').type(userData.mesNacimiento);
        cy.get('[data-type="year"]').type(userData.anioNacimiento);

        // Usar la variable de email para ambos campos
        cy.get('[data-cy="input-email"]').type(userData.email);
        cy.get('[data-cy="input-confirmar-email"]').type(userData.email);

        // Ingresar y confirmar la contraseña
        cy.get('[data-cy="input-password"]').type(userData.password);
        cy.get('[data-cy="input-repetir-password"]').type(userData.password);

        // Paso 2: Capturar el alert que debe aparecer al registrarse
        cy.on('window:alert', (text) => {
            expect(text).to.contain('Usuario registrado con éxito');
        });

        // Paso 3: Hacer clic en el botón de registro
        cy.get('button[type="submit"]').click();

        // Paso 4: Validar que el registro fue exitoso verificando la redirección
        cy.url().should('include', '/auth/login');
    });
});