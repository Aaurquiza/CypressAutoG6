describe('Cliente se desloguea correctamente', () => {
    it('Deslogueo', () => {
        cy.loginCliente();
        cy.logOut();
    });
});