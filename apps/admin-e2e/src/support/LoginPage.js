export default (url) => ({
  elements: {
    email: "input[name='email']",
    password: "input[name='password']",
    submitButton: 'button',
  },

  navigate() {
    cy.visit(url);
    this.waitUntilVisible();
  },

  waitUntilVisible() {
    cy.get(this.elements.email);
  },

  login(email = 'randomEmail@uco.es', password = 'password') {
    cy.get(this.elements.email).type(email);
    cy.get(this.elements.password).type(password);
    cy.get(this.elements.submitButton).click();
  },
});
