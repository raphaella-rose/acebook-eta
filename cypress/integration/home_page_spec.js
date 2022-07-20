describe("Home page", () => {
  it.skip("has a title", () => {
    cy.visit("/");
    cy.get(".title").should("contain", "Acebook");
  });

  it.skip("Navigates to Sign up page from Home", () => {
    cy.visit("/");
    cy.contains("Sign Up").click();
    cy.url().should("include", "/users/new");
  });

  it.skip("Navigates to Sign in page from Home", () => {
    cy.visit("/");
    cy.contains("Sign In").click();
    cy.url().should("include", "/sessions/new");
  });
});
