describe('Automatización: Validación de Límite de Entradas', () => {

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

    it('NO debe permitir a un usuario seleccionar más de 4 entradas', () => {
        // ... (Tu código para llegar a la página de compra)
        cy.get('[data-cy="btn-ver-evento-6"]', { timeout: 10000 })
            .scrollIntoView()
            .should('be.visible')
            .click();
        
        cy.wait(2000);

        cy.contains('Adquirir entrada').click();

        cy.wait(2000);
        // ...

        // Aumentar la cantidad de entradas hasta 4
        cy.get('[data-cy="btn-sumar-Campo"]').click();
        cy.get('[data-cy="btn-sumar-Campo"]').click();
        cy.get('[data-cy="btn-sumar-Campo"]').click();
        cy.get('[data-cy="btn-sumar-Campo"]').click();
        
        // PAUSA para ver que el botón + se deshabilitó
        cy.wait(2000);

        // Validar que el botón de sumar está deshabilitado después de 4 clics
        cy.get('[data-cy="btn-sumar-Campo"]').should('be.disabled');

        // Validar que el botón "Continuar" está habilitado, ya que el usuario tiene 4 entradas.
        cy.get('[data-cy="btn-continuar"]').should('not.be.disabled');

        // Ahora, puedes hacer clic en continuar para seguir con el flujo de compra.
        // cy.get('[data-cy="btn-continuar"]').click();
    });
});