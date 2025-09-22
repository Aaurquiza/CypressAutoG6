// Antes de cada test, visitamos la página de inicio de sesión
beforeEach(() => {
  cy.visit("https://ticketazo.com.ar/auth/login");
});

it("Debe permitir que un usuario registrado inicie sesión correctamente", () => {
  // Paso 1: Localizar los campos e introducir el email y la contraseña
  cy.get('[data-cy="input-email"]').type("admin@admin.com");
  cy.get('[data-cy="input-password"]').type("admin");

  // Paso 2: Hacer clic en el botón de iniciar sesión
  cy.get('[data-cy="btn-login"]').click();

  // Paso 3: Validar que el login fue exitoso buscando el input con el placeholder
  cy.get('input[placeholder="Busca tu próxima función!"]').should("be.visible");

  //Aprobar evntos con credencial de Admin
  //cy.get(".lg\\:hidden > .justify-end > .z-0").click();
  //cy.get(":nth-child(9) > .pb-4").click();
  //cy.get('[data-cy="select-estado-429"] > .absolute').click();
  //cy.get('[data-cy="option-estado-429-aprobado"]').click();
  //cy.get('[data-cy="btn-confirmar-modal"]').click();
  //cy.contains('.cursor-pointer', 'Aprobado').click();

  //Aprobación de evento 424
 cy.get('.lg\\:hidden > .justify-end > .z-0').click();
cy.get(':nth-child(9) > .pb-4').click();
cy.get('[data-cy="select-estado-424"] > .absolute').click()
cy.get('[data-cy="option-estado-424-aprobado"]').click();
cy.get('[data-cy="btn-confirmar-modal"]').click();
cy.contains('.cursor-pointer', 'Aprobado').click();





});
