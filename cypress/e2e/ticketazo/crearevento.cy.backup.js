describe('Validaciones de Creación de Evento', () => {

  beforeEach(() => {
    // Ir directo al login con callback
    cy.visit('https://ticketazo.com.ar/auth/login?callbackUrl=/newEvent')

    // Login con usuario nuevo para creación de eventos
    cy.get('[data-cy="input-email"]').type('maximilianogv@gmail.com')
    cy.get('[data-cy="input-password"]').type('MGVproducciones1@')
    cy.get('[data-cy="btn-login"]').click()

    // Verificar que el login fue exitoso y redirige al formulario
    cy.url().should('include', '/newEvent', { timeout: 10000 })
    cy.contains('Cargar Función').should('be.visible', { timeout: 10000 })
  })

  it('No debe permitir fecha en el pasado', () => {
    // Limpiar y completar título
    cy.get('[data-cy="input-titulo"]').clear().type('Evento con fecha inválida')
    // Completar descripción
    cy.get('[data-cy="input-info"]').clear().type('Test fecha en el pasado')

    // Seleccionar lugar (Otro y completar campos)
    cy.get('[data-cy="select-lugar-evento"]').click()
    cy.contains('li', 'Otro').click()
    cy.wait(500) // Espera para que se rendericen los campos dinámicos

    cy.get('[data-cy="input-nombre-lugar"]').should('be.visible').type('Estadio Max')
    cy.get('[data-cy="input-calle-lugar"]').should('be.visible').type('Calle Falsa 123')
cy.get('[data-cy="input-altura-lugar"]').should('be.visible').type('123')
cy.get('[data-cy="input-codigo-postal-lugar"]').should('be.visible').type('1234')

// Después de completar Calle, Altura y Código Postal
// Seleccionar Provincia
cy.get('input[aria-label="Provincia"]')
  .should('be.visible')
  .click()

cy.contains('li', 'Buenos Aires', { timeout: 10000 }).click()

// Abrir dropdown de localidad y escribir algo para filtrar
cy.get('input[aria-label="Localidad"]')
  .should('not.be.disabled')
  .click()
  .type('Ensenada')

// Seleccionar la opción visible
cy.contains('li', 'Ensenada', { timeout: 10000 })
  .should('be.visible')
  .click()


// Seleccionar edad
    cy.get('[data-cy="select-edad"]').click()
    cy.contains('li', 'ATP').click()

    // Esperar contenedor de fecha
    cy.get('[data-cy="datepicker-fecha"]').should('be.visible', { timeout: 10000 })

    // Establecer fecha en el pasado (01/01/2020)
    cy.get('[data-cy="datepicker-fecha"] [role="spinbutton"][data-type="day"]').should('be.visible').focus().type('{selectall}{backspace}01')
    cy.wait(500)
    cy.get('[data-cy="datepicker-fecha"] [role="spinbutton"][data-type="month"]').should('be.visible').focus().type('{selectall}{backspace}01')
    cy.wait(500)
    cy.get('[data-cy="datepicker-fecha"] [role="spinbutton"][data-type="year"]').should('be.visible').focus().type('{selectall}{backspace}2020')

    // Establecer hora (12:00)
    cy.get('[data-cy="input-duracion"] [role="spinbutton"][data-type="hour"]').focus().type('{selectall}{backspace}12')
    cy.get('[data-cy="input-duracion"] [role="spinbutton"][data-type="minute"]').focus().type('{selectall}{backspace}00')

    // Submit
    cy.contains('button', 'Siguiente').click()

    // Validar error de fecha
    cy.contains('La fecha debe ser al menos 24 horas a partir de hoy.', { timeout: 10000 }).should('be.visible')
  })

  it('Debe mostrar error en duración inválida', () => {
    // Limpiar y completar título
    cy.get('[data-cy="input-titulo"]').clear().type('Evento con duración inválida')
    // Completar descripción
    cy.get('[data-cy="input-info"]').clear().type('Test duración inválida')
    // Seleccionar lugar (Otro y completar campos)
    cy.get('[data-cy="select-lugar-evento"]').click()
    cy.contains('li', 'Otro').click()
    cy.wait(500) // Espera para renderizar campos dinámicos

    cy.get('[data-cy="input-nombre-lugar"]').should('be.visible').type('Estadio Max')
    cy.get('[data-cy="input-calle-lugar"]').should('be.visible').type('Calle Falsa 123')
cy.get('[data-cy="input-calle-altura"]').should('be.visible').type('123')
cy.get('[data-cy="input-localidad-lugar"]').should('be.visible').type('Localidad Test')
cy.get('[data-cy="input-codigo-postal-lugar"]').should('be.visible').type('1234')

    // Seleccionar edad
    cy.get('[data-cy="select-edad"]').click()
    cy.contains('li', 'ATP').click()

    // Esperar contenedor de fecha
    cy.get('[data-cy="datepicker-fecha"]').should('be.visible', { timeout: 10000 })

    // Establecer fecha válida futura (20/09/2025)
    cy.get('[data-cy="datepicker-fecha"] [role="spinbutton"][data-type="day"]').should('be.visible').focus().type('{selectall}{backspace}20')
    cy.wait(500)
    cy.get('[data-cy="datepicker-fecha"] [role="spinbutton"][data-type="month"]').should('be.visible').focus().type('{selectall}{backspace}09')
    cy.wait(500)
    cy.get('[data-cy="datepicker-fecha"] [role="spinbutton"][data-type="year"]').should('be.visible').focus().type('{selectall}{backspace}2025')

    // Establecer duración inválida (99:99)
    cy.get('[data-cy="input-duracion"] [role="spinbutton"][data-type="hour"]').focus().type('{selectall}{backspace}99')
    cy.get('[data-cy="input-duracion"] [role="spinbutton"][data-type="minute"]').focus().type('{selectall}{backspace}99')

    // Submit
    cy.contains('button', 'Siguiente').click()

    // Validar error de duración
    cy.contains('Duración inválida', { timeout: 10000 }).should('be.visible')
  })

  it('No debe permitir título vacío', () => {
    // Limpiar título pre-escrito
    cy.get('[data-cy="input-titulo"]').clear()
    // Completar descripción
    cy.get('[data-cy="input-info"]').clear().type('Test sin título')
    // Seleccionar lugar (Otro y completar campos)
    cy.get('[data-cy="select-lugar-evento"]').click()
    cy.contains('li', 'Otro').click()
    cy.wait(500)

        cy.get('[data-cy="input-nombre-lugar"]').should('be.visible').type('Estadio Max')
    cy.get('[data-cy="input-calle-lugar"]').should('be.visible').type('Calle Falsa 123')
cy.get('[data-cy="input-calle-altura"]').should('be.visible').type('123')
cy.get('[data-cy="input-localidad-lugar"]').should('be.visible').type('Localidad Test')
cy.get('[data-cy="input-codigo-postal-lugar"]').should('be.visible').type('1234')

    // Seleccionar edad
    cy.get('[data-cy="select-edad"]').click()
    cy.contains('li', 'ATP').click()

    // Esperar contenedor de fecha
    cy.get('[data-cy="datepicker-fecha"]').should('be.visible', { timeout: 10000 })

    // Establecer fecha válida futura (20/09/2025)
    cy.get('[data-cy="datepicker-fecha"] [role="spinbutton"][data-type="day"]').should('be.visible').focus().type('{selectall}{backspace}20')
    cy.wait(500)
    cy.get('[data-cy="datepicker-fecha"] [role="spinbutton"][data-type="month"]').should('be.visible').focus().type('{selectall}{backspace}09')
    cy.wait(500)
    cy.get('[data-cy="datepicker-fecha"] [role="spinbutton"][data-type="year"]').should('be.visible').focus().type('{selectall}{backspace}2025')

    // Establecer hora (12:00)
    cy.get('[data-cy="input-duracion"] [role="spinbutton"][data-type="hour"]').focus().type('{selectall}{backspace}12')
    cy.get('[data-cy="input-duracion"] [role="spinbutton"][data-type="minute"]').focus().type('{selectall}{backspace}00')

    // Submit
    cy.contains('button', 'Siguiente').click()

    // Validar error de título
    cy.contains('El título es obligatorio', { timeout: 10000 }).should('be.visible')
  })

  it('No debe permitir info vacía', () => {
    // Limpiar y completar título
    cy.get('[data-cy="input-titulo"]').clear().type('Evento sin descripción')
    // Seleccionar lugar (Otro y completar campos)
    cy.get('[data-cy="select-lugar-evento"]').click()
    cy.contains('li', 'Otro').click()
    cy.wait(500)
    cy.get('input[placeholder*="Calle"]').type('Calle Falsa 123')
    cy.get('input[placeholder*="Altura"]').type('123')
    cy.get('input[placeholder*="Localidad"]').type('Localidad Test')
    cy.get('input[placeholder*="Código Postal"]').type('1234')
    // Seleccionar edad
    cy.get('[data-cy="select-edad"]').click()
    cy.contains('li', 'ATP').click()

    // Esperar contenedor de fecha
    cy.get('[data-cy="datepicker-fecha"]').should('be.visible', { timeout: 10000 })

    // Establecer fecha válida futura (20/09/2025)
    cy.get('[data-cy="datepicker-fecha"] [role="spinbutton"][data-type="day"]').should('be.visible').focus().type('{selectall}{backspace}20')
    cy.wait(500)
    cy.get('[data-cy="datepicker-fecha"] [role="spinbutton"][data-type="month"]').should('be.visible').focus().type('{selectall}{backspace}09')
    cy.wait(500)
    cy.get('[data-cy="datepicker-fecha"] [role="spinbutton"][data-type="year"]').should('be.visible').focus().type('{selectall}{backspace}2025')

    // Establecer hora (12:00)
    cy.get('[data-cy="input-duracion"] [role="spinbutton"][data-type="hour"]').focus().type('{selectall}{backspace}12')
    cy.get('[data-cy="input-duracion"] [role="spinbutton"][data-type="minute"]').focus().type('{selectall}{backspace}00')

    // Limpiar descripción
    cy.get('[data-cy="input-info"]').clear()

    // Submit
    cy.contains('button', 'Siguiente').click()

    // Validar error de descripción
    cy.contains('La descripción es obligatoria', { timeout: 10000 }).should('be.visible')
  })

})