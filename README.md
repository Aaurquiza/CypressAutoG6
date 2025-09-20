# CypressAutoG6 - Tests Automatizados para Ticketazo

Este repositorio contiene pruebas automatizadas con Cypress para validar la creación de eventos en la plataforma Ticketazo. Los tests fueron desarrollados por Maximiliano Vazquez como parte de un proyecto de automatización en la rama `newevent-test`.

## Descripción
- **`crearevento.cy.js`**: Incluye 5 tests que validan casos como fecha inválida, duración inválida, título vacío, información vacía y género vacío.
- **`eventorealista.cy.js`**: Contiene un test que simula la creación completa de un evento y verifica la transición a la etapa de preventa.
- **`eventos.json`**: Archivo de fixture con datos de prueba (usuario, lugar, fechaHora, etc.).

## Requisitos
- Node.js (versión 14 o superior recomendada).
- Cypress instalado como dependencia local.

## Instalación
1. Clona el repositorio:
git clone https://github.com/Aaurquiza/CypressAutoG6.git
cd CypressAutoG6

2. Instala las dependencias:
npm install
3. Instala Cypress:
npm install cypress --save-dev


## Ejecución de Tests
1. Abre Cypress:
npx cypress open
2. Selecciona los archivos de test en la interfaz gráfica o ejecuta directamente:
npx cypress run
- Para un archivo específico: `npx cypress run --spec cypress/e2e/ticketazo/crearevento.cy.js`

## Estructura del Proyecto
- `cypress/e2e/ticketazo/`: Directorio con los archivos de test.
- `cypress/fixtures/`: Contiene `eventos.json` con los datos de prueba.

## Notas
- Asegúrate de que las credenciales en `eventos.json` sean válidas para el entorno de testing.
- Los tests asumen la URL base `https://ticketazo.com.ar`.

## Autor
- Maximiliano Vazquez