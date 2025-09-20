let data;
before(() => {
  cy.fixture('eventos.json').then((d) => {
    data = d;
  });
});

describe('Creación de Evento Realista', () => {

  beforeEach(() => {
    cy.visit('https://ticketazo.com.ar/auth/login?callbackUrl=/newEvent');
    cy.get('[data-cy="input-email"]').type(data.usuario.email);
    cy.get('[data-cy="input-password"]').type(data.usuario.password);
    cy.get('[data-cy="btn-login"]').click();
    cy.url().should('include', '/newEvent', { timeout: 10000 });
    cy.contains('Cargar Función').should('be.visible', { timeout: 10000 });
  });

  function completarLugar(lugar = data.eventoRealista.lugar) {
    cy.get('[data-cy="select-lugar-evento"]').click();
    cy.contains('li', lugar.tipo).click();
    cy.wait(500);
    cy.get('[data-cy="input-nombre-lugar"]').should('be.visible').clear().type(lugar.nombre);
    cy.get('[data-cy="input-calle-lugar"]').should('be.visible').clear().type(lugar.calle);
    cy.get('[data-cy="input-altura-lugar"]').should('be.visible').clear().type(lugar.altura);
    cy.get('[data-cy="input-codigo-postal-lugar"]').should('be.visible').clear().type(lugar.codigoPostal);

    cy.get('input[aria-label="Provincia"]').click();
    cy.contains('li', lugar.provincia, { timeout: 10000 }).click();
    cy.get('input[aria-label="Localidad"]').click().clear().type(lugar.localidad);
    cy.contains('li', lugar.localidad, { timeout: 10000 }).click();
  }

  function completarFechaYHorario(fechaHora = data.eventoRealista.fechaHora, duracion = data.eventoRealista.duracion) {
    // Fecha
    cy.get('[data-cy="datepicker-fecha"] [role="spinbutton"][data-type="day"]')
      .should('be.visible').focus().type('{selectall}').type(fechaHora.dia.padStart(2,'0'));
    cy.get('[data-cy="datepicker-fecha"] [role="spinbutton"][data-type="month"]')
      .should('be.visible').focus().type('{selectall}').type(fechaHora.mes.padStart(2,'0'));
    cy.get('[data-cy="datepicker-fecha"] [role="spinbutton"][data-type="year"]')
      .should('be.visible').focus().type('{selectall}').type(fechaHora.anio);

    // Horario inicial
    cy.get('[data-cy="input-horario"] [role="spinbutton"][data-type="hour"]')
      .should('be.visible').focus().type('{selectall}').type(fechaHora.hora.padStart(2,'0'));
    cy.get('[data-cy="input-horario"] [role="spinbutton"][data-type="minute"]')
      .should('be.visible').focus().type('{selectall}').type(fechaHora.minuto.padStart(2,'0'));

    // Duración
    cy.get('[data-cy="input-duracion"] [role="spinbutton"][data-type="hour"]')
      .should('be.visible').focus().type('{selectall}').type(duracion.hora.padStart(2,'0'));
    cy.get('[data-cy="input-duracion"] [role="spinbutton"][data-type="minute"]')
      .should('be.visible').focus().type('{selectall}').type(duracion.minuto.padStart(2,'0'));
  }

  it('Debe crear un evento realista completo', () => {
    const evento = data.eventoRealista;

    cy.get('[data-cy="input-titulo"]').clear().type(evento.titulo);
    cy.get('[data-cy="input-info"]').clear().type(evento.info);

    completarLugar();
    completarFechaYHorario();

    // Seleccionar género
    cy.get('[data-cy="select-genero"]').click();
    cy.contains('li', evento.genero).click();

    // Seleccionar edad
    cy.get('[data-cy="select-edad"]').click();
    cy.contains('li', evento.edad).click();

    // Pulsar Siguiente para crear el evento
    cy.contains('button', 'Siguiente').click();

    // Validar que se llega a la etapa de preventa dentro de la misma página
    cy.contains('Activar Preventa', { timeout: 10000 }).should('be.visible');
  });

})