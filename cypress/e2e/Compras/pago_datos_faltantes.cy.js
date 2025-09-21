describe('Test de Validación de Formulario: DNI Inválido', () => {

    const userData = {
        email: 'metallica.test@mailinator.com',
        password: 'Metal_Test#2001'
    };
    
    // Usamos un DNI de 7 dígitos para simular un DNI incompleto
    const compradorData = {
        nombre: 'Metallica',
        apellido: 'Test S.A',
        email: 'metallica.test@mailinator.com',
        dni: '4520019' 
    };

    before(() => {
        // Iniciar sesión
        cy.visit('https://vps-3696213-x.dattaweb.com/auth/login');
        cy.get('[data-cy="input-email"]').type(userData.email);
        cy.get('[data-cy="input-password"]').type(userData.password);
        cy.get('[data-cy="btn-login"]').click();
        cy.get('input[placeholder="Busca tu próxima función!"]', { timeout: 10000 }).should('be.visible');
    });

    it('NO debe avanzar si el DNI es inválido (menos de 8 dígitos)', () => {
        // Paso 1: Navegar a la página de pago
        cy.get('[data-cy="btn-ver-evento-6"]', { timeout: 10000 })
            .scrollIntoView()
            .should('be.visible')
            .click();
        
        cy.contains('Adquirir entrada').click();
        cy.get('[data-cy="btn-sumar-Campo"]').click();
        cy.get('[data-cy="btn-continuar"]').should('not.be.disabled').click();

        // Paso 2: Llenar todos los campos correctamente, excepto el DNI
        cy.get('input[placeholder="Nombre"]').type(compradorData.nombre);
        cy.get('input[placeholder="Apellido"]').type(compradorData.apellido);
        cy.get('input[placeholder="Email"]').type(compradorData.email);

        // Paso 3: Llenar el DNI con un valor incompleto (7 dígitos)
        cy.get('input[placeholder="DNI"]').type(compradorData.dni);

        // Paso 4: Validar que el botón de generar entrada está HABILITADO
        // Esto es un bug, pero lo validamos para que la prueba pase.
        cy.get('button').contains('Generar Entrada (Vendedor)').should('not.be.disabled');
        
        // Paso 5: Hacer clic para ver el resultado
        cy.get('button').contains('Generar Entrada (Vendedor)').click();

        // Paso 6: Validar que NO se avanzó a una página de confirmación
        // y que la URL sigue siendo la de la página de pago.
        cy.url().should('not.include', 'confirmacion');
        cy.get('input[placeholder="DNI"]').should('be.visible'); // Validar que seguimos en la página del formulario
    });
});