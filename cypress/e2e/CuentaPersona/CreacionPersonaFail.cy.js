/* Genera error al seleccinar la localidad por duplicidad en el nombre*/


describe('Registro de usuario', () => {
  it('Registrar nuevo usuario', () => {
    cy.visit('https://ticketazo.com.ar');
    cy.get('.justify-end > .text-sm').click(); // log in 
    cy.get('[data-cy="btn-register-user"]').click(); // registrarse
    cy.get('[data-cy="input-nombres"]').type('prueba');
    cy.get('[data-cy="input-apellido"]').type('logueo');
    cy.get('[data-cy="input-telefono"]').type('1500150015');
    cy.get('[data-cy="input-dni"]').type('20202020'); //siguiente provincia
    cy.get('[data-cy="select-provincia"]').click(); // Abre el dropdown
    cy.contains('.cursor-pointer', 'Córdoba').click(); // Selecciona la provincia
    
    cy.get('[data-cy="select-localidad"]').click(); //.type('Córdoba')
    cy.contains('.cursor-pointer', 'Córdoba').click();
    // Seleccionar la fecha de nacimiento
    cy.get('[data-cy="input-fecha-nacimiento"]').click(); 
    cy.contains('dd').type('10'); // Seleccionar el dia
    cy.contains('mm').type('11'); // Seleccionar el mes.
    cy.contains('aaaa').type('1989'); // Seleccionar el anio
    // Completar el email
    cy.get('[data-cy="input-email"]').type('gmail@gmail.com');
    cy.get('[data-cy="input-confirmar-email"]').type('gmail@gmail.com');
    // Completar la contraseña
    cy.get('[data-cy="input-password"]').type('Gmail12.');
    cy.get('[data-cy="input-repetir-password"]').type('Gmail12.');
    // Paso 4 Hacer click en el botón de registro
    cy.get('[data-cy="btn-registrarse"]').click();




    });
});