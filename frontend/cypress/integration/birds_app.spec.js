/* eslint-disable no-undef */
describe('Bird app', () => {
  it('homepage can be opened', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Birds');
  });
});
