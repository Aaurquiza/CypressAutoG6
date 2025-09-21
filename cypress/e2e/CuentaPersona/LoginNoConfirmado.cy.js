describe('Persona se loguea con correo no aprobado', () => {
    it('UsuarioNoAprobado', () => {
        cy.loginPersona();
        cy.get('[data-cy="error-message"]').should('contain', 'Usuario no confirmado. Te reenviamos el link por correo.');
    });
});