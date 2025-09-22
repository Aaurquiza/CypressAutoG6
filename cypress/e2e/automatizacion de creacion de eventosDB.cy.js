// Datos de prueba para el inicio de sesión con credencial de Admin

// Antes de cada test, visitamos la página de inicio de sesión
beforeEach(() => {
  cy.visit("https://ticketazo.com.ar/auth/login");
});

it("Debe permitir que un usuario registrado inicie sesión correctamente", () => {
  // Paso 1: Localizar los campos e introducir el email y la contraseña
  cy.get('[data-cy="input-email"]').type("reuniteahora@hotmail.com");
  cy.get('[data-cy="input-password"]').type("Lñ$34fG77");

  // Paso 2: Hacer clic en el botón de iniciar sesión
  cy.get('[data-cy="btn-login"]').click();

  // Paso 3: Validar que el login fue exitoso buscando el input con el placeholder
  cy.get('input[placeholder="Busca tu próxima función!"]').should("be.visible");

  //ir al menu
  cy.get(".lg\\:hidden > .justify-end > .z-0").click();
  cy.get(":nth-child(2) > .pb-4").click();

  // completar los campos con datos Válidos para crear un evento
  cy.get('[data-cy="input-titulo"]').type("Rebeldia y Libertad");
  cy.get('[data-slot="selector-button"]').click();
  cy.get('[data-slot="header"]').click();
  cy.get('[data-slot="header"]').then(($header) => {
    if (!$header.text().includes("octubre 2025")) {
      cy.get('[data-slot="next-button"]').click();
      cy.wait(300); // Espera breve para que se actualice
      cy.contains('[data-slot="cell"]', "23").click();
      cy.get('[data-cy="select-edad"] > .inline-flex').click();
      cy.get('[data-cy="option-edad-ATP"]').click();
      cy.get('[data-cy="select-genero"] > .inline-flex').click();
      cy.get('[data-cy="option-genero-Teatro"]').click();
      cy.get('[data-cy="input-horario"]')
        .click()
        .then(($el) => {
          const el = $el[0];
          el.innerText = "14:00"; // Cambia el contenido directamente
          el.dispatchEvent(new Event("input", { bubbles: true }));
          el.dispatchEvent(new Event("blur")); // Simula que el usuario sale del campo
          // Duración en horas
          cy.get('[data-type="hour"][contenteditable="true"]')
            .click()
            .then(($el) => {
              const el = $el[0];
              el.innerText = "2"; // 2 horas
              el.dispatchEvent(new Event("input", { bubbles: true }));
              el.dispatchEvent(new Event("blur"));
            });

          // Duración en minutos
          cy.get('[data-type="minute"][contenteditable="true"]')
            .click()
            .then(($el) => {
              const el = $el[0];
              el.innerText = "00"; // 30 minutos
              el.dispatchEvent(new Event("input", { bubbles: true }));
              el.dispatchEvent(new Event("blur"));

              //selección de Lugar
              cy.get('[data-cy="select-lugar-evento"] > .inline-flex').click();
              cy.contains('[role="option"]', "Otro").click();
              cy.get('[data-cy="input-nombre-lugar"]').type("Rebelde");
              cy.get('[data-cy="input-calle-lugar"]').type("Moreno");
              cy.get('[data-cy="input-altura-lugar"]').type("1810");
              cy.get('[data-cy="input-codigo-postal-lugar"]').type("1846");
              cy.get(
                ":nth-child(13) > .data-\\[hidden\\=true\\]\\:hidden > .shadow-xs > .group-data-\\[has-label\\=true\\]\\:items-end"
              ).click();
              cy.contains("Buenos Aires").click();
              cy.should("have.text", "Buenos Aires");
              cy.get(
                ":nth-child(14) > .data-\\[hidden\\=true\\]\\:hidden > .shadow-xs > .group-data-\\[has-label\\=true\\]\\:items-end"
              ).click();
              cy.get('input[aria-label="Localidad"]')
                .clear()
                .type("Adrogué{enter}");
              cy.get('[data-cy="input-info"]').type(
                "Entre copas y versos, se leyeron textos que hablaban de cuerpos silenciados, de madres que buscaban hijos, de una ciudad que resistía desde la palabra. Uno de los asistentes, un joven estudiante, escribió en una servilleta: “Hoy entendí que la poesía también grita”. Ese papel, olvidado entre vasos vacíos, fue encontrado años después por su hija, quien lo incluyó en una muestra sobre el ciclo Poesía Abierta. Ese gesto mínimo, íntimo, resume lo que fue Rebeldía y Libertad: una trinchera cultural donde cada palabra era un acto de resistencia."
              );

              function avanzarYValidarEntradas() {
                cy.contains("button", "Siguiente").click();
                cy.contains("Nombre de Entrada", { timeout: 10000 }).should(
                  "be.visible"
                );
              }
            });
        });
    }
  });
});
