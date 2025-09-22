describe('Automatización del Registro y Login de Usuario No Confirmado', () => {

    // Datos base para el registro y login
    const userData = {
        nombres: 'Prueba',
        apellido: 'NoConfirmado',
        telefono: '3517294401',
        provincia: 'Buenos Aires',
        localidad: 'San Isidro',
        diaNacimiento: '17',
        mesNacimiento: '10',
        anioNacimiento: '2001',
        password: 'Metal_Test#2001'
    };

    it('Debe registrar un nuevo usuario y luego denegarle el acceso por no haber confirmado el correo', () => {
        // Generar un email y DNI aleatorios para la unicidad de la prueba
        const randomEmail = `usuario.noconfirmado${Math.floor(Math.random() * 10000)}@mailinator.com`;
        const randomDni = `${Math.floor(10000000 + Math.random() * 90000000)}`;

        // PASO 1: Proceso de Registro
        cy.visit('https://ticketazo.com.ar/auth/registerUser');

        cy.get('[data-cy="input-nombres"]').type(userData.nombres);
        cy.get('[data-cy="input-apellido"]').type(userData.apellido);
        cy.get('[data-cy="input-telefono"]').type(userData.telefono);
        cy.get('[data-cy="input-dni"]').type(randomDni);

        cy.get('[data-cy="select-provincia"]').click();
        cy.contains(userData.provincia).click();
        cy.get('[data-cy="select-localidad"]').type(userData.localidad);
        cy.contains(userData.localidad).click();

        cy.get('[data-type="day"]').type(userData.diaNacimiento);
        cy.get('[data-type="month"]').type(userData.mesNacimiento);
        cy.get('[data-type="year"]').type(userData.anioNacimiento);

        cy.get('[data-cy="input-email"]').type(randomEmail);
        cy.get('[data-cy="input-confirmar-email"]').type(randomEmail);

        cy.get('[data-cy="input-password"]').type(userData.password);
        cy.get('[data-cy="input-repetir-password"]').type(userData.password);

        cy.get('button[type="submit"]').click();

        // Validar que el registro fue exitoso y redirige a la página de login
        cy.url().should('include', '/auth/login');

        // PASO 2: Intento de Inicio de Sesión
        // Intenta iniciar sesión con el usuario recién creado que no está confirmado
        cy.get('[data-cy="input-email"]').type(randomEmail);
        cy.get('[data-cy="input-password"]').type(userData.password);
        cy.get('[data-cy="btn-login"]').click();

        // PASO 3: Validación del Mensaje de Error
        // La prueba debe fallar al intentar iniciar sesión y mostrar el mensaje de usuario no confirmado
        cy.contains('Usuario no confirmado. Te reenviamos el link por correo.').should('be.visible');
        
        // Validar que no hay redirección exitosa
        cy.url().should('not.include', '/dashboard'); 
    });
});