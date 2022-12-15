describe("Login cy test", () => {
  it("login access with correct credentials", () => {
    cy.visit("http://localhost:3040");
    cy.get("#usernameField").type("admin");
    cy.get("#passwordField").type("123");
    cy.get("#validBtn").click();
    cy.get("#titleConnected");
    cy.get("#logoutBtn").click();
    cy.get("#usernameField");
  });
});
