describe('Automatización: Flujo Completo de Compra de Entradas', () => {

    const userData = {
        email: 'metallica.test@mailinator.com',
        password: 'Metal_Test#2001'
    };

    before(() => {
        cy.visit('https://vps-3696213-x.dattaweb.com/auth/login');
        cy.get('[data-cy="input-email"]').type(userData.email);
        cy.get('[data-cy="input-password"]').type(userData.password);
        cy.get('[data-cy="btn-login"]').click();
        cy.get('input[placeholder="Busca tu próxima función!"]', { timeout: 10000 }).should('be.visible');
    });

    it('Debe permitir a un usuario logueado seleccionar 4 entradas y continuar', () => {
        // Paso 1: Scroll hasta el botón "Ver evento" y hacer click
        cy.get('[data-cy="btn-ver-evento-6"]', { timeout: 10000 })
            .scrollIntoView()
            .should('be.visible')
            .click();
        
        cy.wait(2000);

        // Paso 2: Click en "Adquirir entrada"
        cy.contains('Adquirir entrada').click();

        cy.wait(2000);

        // Paso 3: Aumentar la cantidad de entradas a 4
        cy.get('[data-cy="btn-sumar-Campo"]').click();
        cy.get('[data-cy="btn-sumar-Campo"]').click();
        cy.get('[data-cy="btn-sumar-Campo"]').click();
        cy.get('[data-cy="btn-sumar-Campo"]').click();
        
        // Opcional: Validar que el campo muestre el número 4
        // Si tu aplicación tiene un input para la cantidad, puedes usar esta aserción
        // cy.get('[data-cy="selector-cantidad"]').should('have.value', '4');

        cy.wait(2000);

        // Paso 4: Validar que el botón "Continuar" está habilitado y hacer click
        cy.get('[data-cy="btn-continuar"]').should('not.be.disabled').click();
    });
});