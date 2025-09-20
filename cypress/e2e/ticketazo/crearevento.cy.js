/// <reference types="cypress" />

// Cargar datos de test desde JSON
let data;
before(() => {
  cy.fixture('eventos.json').then((d) => {
    data = d;
  });
});

describe('Validaciones de Creación de Evento', () => {

  beforeEach(() => {
    cy.visit('https://ticketazo.com.ar/auth/login?callbackUrl=/newEvent');
    cy.get('[data-cy="input-email"]').type(data.usuario.email);
    cy.get('[data-cy="input-password"]').type(data.usuario.password);
    cy.get('[data-cy="btn-login"]').click();
    cy.url().should('include', '/newEvent', { timeout: 10000 });
    cy.contains('Cargar Función').should('be.visible', { timeout: 10000 });
  });

  // Función para completar lugar y dirección
  function completarLugar(lugar = data.lugar) {
    cy.get('[data-cy="select-lugar-evento"]').click();
    cy.contains('li', lugar.tipo).click();
    cy.wait(500);
    cy.get('[data-cy="input-nombre-lugar"]').should('be.visible').type(lugar.nombre);
    cy.get('[data-cy="input-calle-lugar"]').should('be.visible').type(lugar.calle);
    cy.get('[data-cy="input-altura-lugar"]').should('be.visible').type(lugar.altura);
    cy.get('[data-cy="input-codigo-postal-lugar"]').should('be.visible').type(lugar.codigoPostal);

    cy.get('input[aria-label="Provincia"]').click();
    cy.contains('li', lugar.provincia, { timeout: 10000 }).click();
    cy.get('input[aria-label="Localidad"]').click().type(lugar.localidad);
    cy.contains('li', lugar.localidad, { timeout: 10000 }).click();
  }

  // Función para completar fecha y duración
  function completarFechaHora(fechaHora = data.fechaHora) {
    cy.get('[data-cy="datepicker-fecha"] [role="spinbutton"][data-type="day"]').clear().type(fechaHora.dia);
    cy.get('[data-cy="datepicker-fecha"] [role="spinbutton"][data-type="month"]').clear().type(fechaHora.mes);
    cy.get('[data-cy="datepicker-fecha"] [role="spinbutton"][data-type="year"]').clear().type(fechaHora.anio);
    cy.get('[data-cy="input-duracion"] [role="spinbutton"][data-type="hour"]').clear().type(fechaHora.hora);
    cy.get('[data-cy="input-duracion"] [role="spinbutton"][data-type="minute"]').clear().type(fechaHora.minuto);
  }

  it('No debe permitir fecha en el pasado', () => {
    cy.get('[data-cy="input-titulo"]').clear().type(data.test.fechaInvalida.titulo);
    cy.get('[data-cy="input-info"]').clear().type(data.test.fechaInvalida.info);
    completarLugar();
    completarFechaHora(data.test.fechaInvalida.fechaHora);
    cy.contains('button', 'Siguiente').click();
    cy.contains('La fecha debe ser al menos 24 horas a partir de hoy.', { timeout: 10000 }).should('be.visible');
  });

  it('No debe permitir duración inválida', () => {
    cy.get('[data-cy="input-titulo"]').clear().type(data.test.duracionInvalida.titulo);
    cy.get('[data-cy="input-info"]').clear().type(data.test.duracionInvalida.info);
    completarLugar();
    completarFechaHora(); // fecha válida por defecto

    // Intentar duración inválida
    cy.get('[data-cy="input-duracion"] [role="spinbutton"][data-type="hour"]').clear().type('25');
    cy.get('[data-cy="input-duracion"] [role="spinbutton"][data-type="minute"]').clear().type('61');

    // Validar que el sistema corrige automáticamente
    cy.get('[data-cy="input-duracion"] [role="spinbutton"][data-type="hour"]').should('not.have.value', '25');
    cy.get('[data-cy="input-duracion"] [role="spinbutton"][data-type="minute"]').should('not.have.value', '61');
  });

  it('No debe permitir título vacío', () => {
    cy.get('[data-cy="input-titulo"]').clear();
    cy.get('[data-cy="input-info"]').clear().type(data.test.tituloVacio.info);
    completarLugar();
    completarFechaHora();
    cy.contains('button', 'Siguiente').click();
    cy.contains('El título no puede estar vacío.').should('be.visible');
  });

  it('No debe permitir información vacía', () => {
  cy.get('[data-cy="input-titulo"]').clear().type(data.test.infoVacia.titulo);

  // Escenario 1: escribir y borrar para que aparezca el error inline
  cy.get('[data-cy="input-info"]').clear().type('x').clear();
  cy.contains('La información no puede estar vacía.').should('be.visible');

  // Escenario 2: pulsar Siguiente con campo vacío
  completarLugar();
  completarFechaHora();
  cy.contains('button', 'Siguiente').click();
  cy.contains('Debe agregar una descripción del evento.').should('be.visible');
});


  it('No debe permitir género vacío', () => {
    cy.get('[data-cy="input-titulo"]').clear().type(data.test.generoVacio.titulo);
cy.get('[data-cy="input-info"]').clear() // deja vacío
    completarLugar();
    completarFechaHora();
    // No seleccionamos género a propósito
    cy.get('[data-cy="select-edad"]').click(); // Necesario para habilitar validaciones
    cy.contains('button', 'Siguiente').click();
    cy.contains('Debe seleccionar un género para el evento.').should('be.visible');
  });

});
