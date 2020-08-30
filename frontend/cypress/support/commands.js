/* eslint-disable no-undef */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

export const login = () => {
  cy.server();
  cy.route('POST', '/api/login', 'fixture:login-response');
  cy.visit('http://localhost:3000/login');
  cy.get('[name="username"]').type('shdjhsjdhsj');
  cy.get('[name="password"]').type('kfhkfhdkfh');
  cy.route('GET', '/api/birds', 'fixture:birds-response');
  cy.get('button').click();
};

export const deleteBird = (id) => {
  cy.server();
  cy.route('DELETE', `/api/birds/${id}`, 'fixture:delete-birds-response');
};

export const getBird = (id) => {
  cy.server();
  login();
  cy.route('GET', `/api/birds/${id}`, 'fixture:bird-response');
};

export const signUp = () => {
  cy.server();
  cy.route('POST', '/api/users', 'fixture:sign-up-response');
  cy.visit('http://localhost:3000/signup');
  cy.get('[name="firstName"]').type('kepa');
  cy.get('[name="lastName"]').type('oblak');
  cy.get('[name="username"]').type('kepa1');
  cy.get('[name="password"]').type('1234');
  cy.get('[name="confirmPassword"]').type('1234');
  cy.get('button').click();
};

export const addBird = () => {
  cy.server();
  login();
  cy.route('POST', '/api/birds', 'fixture:create-bird-response');
  cy.get('[name="commonname"]').type('danfe');
  cy.get('[name="species"]').type('species');
  cy.get('[name="rarity"]').type('rarity');
  cy.get('input[type="file"]').attachFile({
    fileContent: fileContent.toString(),
    fileName: 'testPicture.png',
    mimeType: 'image/png',
  });
};
