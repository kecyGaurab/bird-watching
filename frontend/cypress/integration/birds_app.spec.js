/* eslint-disable no-undef */
import { login, deleteBird, getBird, signUp } from '../support/commands';

describe('login', () => {
  it('can log in', () => {
    login();
  });
});

describe('Bird app', () => {
  it('should let author to delete the observation', () => {
    getBird('5f4405835af8e2f75663ef53');
    cy.get('[data-testid="5f4405835af8e2f75663ef53"]').click();
    cy.url().should('include', '/5f4405835af8e2f75663ef53');
    cy.get('[data-testid="delete-bird"]').should('exist');
    cy.get('[data-testid="edit-bird"]').parent().click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/5f4405835af8e2f75663ef53/edit');
    });
    cy.get('[data-testid="close-dialog"]').click();
    cy.get('[data-testid="delete-bird"]').click();
    deleteBird('5f4405835af8e2f75663ef53');
    cy.get('[data-testid="confirm-delete"]').click();
    cy.get('[data-testid="5f4405835af8e2f75663ef53"]').should('not.exist');
  });
});

describe('signing in', () => {
  it('can let new user sign up', () => {
    signUp();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/login');
    });
  });
});
