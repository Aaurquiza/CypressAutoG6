describe('Test de Errores Críticos: Reserva con Tiempo Expirado', () => {

    const userData = {
        email: 'metallica.test@mailinator.com',
        password: 'Metal_Test#2001'
    };
    
    const compradorData = {
        nombre: 'Metallica',
        apellido: 'Test S.A',
        email: 'metallica.test@mailinator.com',
        dni: '45200199' 
    };

    before(() => {
        // Iniciar sesión
        cy.visit('https://vps-3696213-x.dattaweb.com/auth/login');
        cy.get('[data-cy="input-email"]').type(userData.email);
        cy.get('[data-cy="input-password"]').type(userData.password);
        cy.get('[data-cy="btn-login"]').click();
        cy.get('input[placeholder="Busca tu próxima función!"]', { timeout: 10000 }).should('be.visible');
    });

    it('NO debe permitir la reserva si el tiempo ha expirado (espera real)', () => {
        // Paso 1: Navegar a la página del evento y seleccionar entrada
        cy.get('[data-cy="btn-ver-evento-6"]', { timeout: 10000 })
            .scrollIntoView()
            .should('be.visible')
            .click();
        
        cy.contains('Adquirir entrada').click();
        cy.get('[data-cy="btn-sumar-Campo"]').click();
        cy.get('[data-cy="btn-continuar"]').should('not.be.disabled').click();

        // Paso 2: Llenar el formulario del comprador
        cy.get('input[placeholder="Nombre"]').type(compradorData.nombre);
        cy.get('input[placeholder="Apellido"]').type(compradorData.apellido);
        cy.get('input[placeholder="Email"]').type(compradorData.email);
        cy.get('input[placeholder="DNI"]').type(compradorData.dni);

        // Paso 3: Esperar que el tiempo de reserva expire (4 minutos y 30 segundos)
        cy.wait(270000); 

        // Paso 4: Intentar hacer clic en el botón para generar la entrada
        // Este comando debería fallar, lo que confirmaría que la lógica funciona.
        cy.get('button').contains('Generar Entrada (Vendedor)', { timeout: 10000 })
            .should('not.be.disabled') // Este should fallará si el botón se deshabilita.
            .click();
    });
});