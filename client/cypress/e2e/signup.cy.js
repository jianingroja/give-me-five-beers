describe('sign up', () => {
  it('should sign up new user', () => {
    cy.visit('http://localhost:5173/signup');
    cy.contains('Sign up');

    cy.get('[data-cy="username"]').type('test-user-1');
    cy.get('[data-cy="password"]').type('test-user-1');
    cy.get('[btn-cy="submit"]').click();

    cy.url().should('include', '/home');
  });

  // todo: user already exist
  // todo: clear db
  // todo: put url into env
});
