describe('Validaciones de Creación de Evento', () => {

  beforeEach(() => {
    cy.visit('https://ticketazo.com.ar/auth/login?callbackUrl=/newEvent')
    cy.get('[data-cy="input-email"]').type('maximilianogv@gmail.com')
    cy.get('[data-cy="input-password"]').type('MGVproducciones1@')
    cy.get('[data-cy="btn-login"]').click()
    cy.url().should('include', '/newEvent', { timeout: 10000 })
    cy.contains('Cargar Función').should('be.visible', { timeout: 10000 })
  })

  // Función para completar lugar y dirección
  function completarLugar() {
    cy.get('[data-cy="select-lugar-evento"]').click()
    cy.contains('li', 'Otro').click()
    cy.wait(500)
    cy.get('[data-cy="input-nombre-lugar"]').should('be.visible').type('Estadio Max')
    cy.get('[data-cy="input-calle-lugar"]').should('be.visible').type('Calle Falsa 123')
    cy.get('[data-cy="input-altura-lugar"]').should('be.visible').type('123')
    cy.get('[data-cy="input-codigo-postal-lugar"]').should('be.visible').type('1234')

    cy.get('input[aria-label="Provincia"]').click()
    cy.contains('li', 'Buenos Aires', { timeout: 10000 }).click()
    cy.get('input[aria-label="Localidad"]').click().type('Ensenada')
    cy.contains('li', 'Ensenada', { timeout: 10000 }).click()
  }

  // Función para completar fecha y hora
  function completarFechaHora(dia = '20', mes = '09', anio = '2025', hora = '12', minuto = '00') {
    cy.get('[data-cy="datepicker-fecha"] [role="spinbutton"][data-type="day"]').clear().type(dia)
    cy.get('[data-cy="datepicker-fecha"] [role="spinbutton"][data-type="month"]').clear().type(mes)
    cy.get('[data-cy="datepicker-fecha"] [role="spinbutton"][data-type="year"]').clear().type(anio)
    cy.get('[data-cy="input-duracion"] [role="spinbutton"][data-type="hour"]').clear().type(hora)
    cy.get('[data-cy="input-duracion"] [role="spinbutton"][data-type="minute"]').clear().type(minuto)
  }

  it('No debe permitir fecha en el pasado', () => {
    cy.get('[data-cy="input-titulo"]').clear().type('Evento con fecha inválida')
    cy.get('[data-cy="input-info"]').clear().type('Test fecha en el pasado')
    completarLugar()
    completarFechaHora('01','01','2020','12','00')
    cy.contains('button', 'Siguiente').click()
    cy.contains('La fecha debe ser al menos 24 horas a partir de hoy.', { timeout: 10000 }).should('be.visible')
  })

  it('No debe permitir duración inválida', () => {
    cy.get('[data-cy="input-titulo"]').clear().type('Evento con duración inválida')
    cy.get('[data-cy="input-info"]').clear().type('Test duración inválida')
    completarLugar()
    completarFechaHora() // Fecha válida

    // Intentar duración inválida
    cy.get('[data-cy="input-duracion"] [role="spinbutton"][data-type="hour"]').clear().type('25')
    cy.get('[data-cy="input-duracion"] [role="spinbutton"][data-type="minute"]').clear().type('61')

    // Validar que el sistema corrige los valores automáticamente
    cy.get('[data-cy="input-duracion"] [role="spinbutton"][data-type="hour"]').should('not.have.value', '25')
    cy.get('[data-cy="input-duracion"] [role="spinbutton"][data-type="minute"]').should('not.have.value', '61')
  })

  it('No debe permitir título vacío', () => {
    cy.get('[data-cy="input-titulo"]').clear()
    cy.get('[data-cy="input-info"]').clear().type('Test sin título')
    completarLugar()
    completarFechaHora()
    cy.contains('button', 'Siguiente').click()
    cy.contains('El título no puede estar vacío.').should('be.visible')
  })

  it('No debe permitir información vacía', () => {
    cy.get('[data-cy="input-titulo"]').clear().type('Evento sin descripción')
    cy.get('[data-cy="input-info"]').clear()
    completarLugar()
    completarFechaHora()
    cy.contains('button', 'Siguiente').click()
    cy.contains('Debe agregar una descripción del evento.').should('be.visible')
  })

})
