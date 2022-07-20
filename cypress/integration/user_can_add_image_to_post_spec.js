const signUpAndSignIn = require("./webhelper");

describe("Timeline", () => {
  afterEach(() => {
    cy.task("dropPosts");
    cy.task("dropUsers");
  });

  it("A signed in user can add an image to a post", () => {
    // run webhelper to sign up and sign in to acebook
    signUpAndSignIn();

    // submit a post
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form")
      .find("[type='text']")
      .type("I can add an image to this post!");
    cy.get("#new-post-form").submit();

    cy.get(".posts").should("contain", "I can add an image to this post!");
    cy.get('[id="add-image-btn"]').click();

    cy.get(".posts")
      .first()
      .find("img")
      .should(
        "have.attr",
        "src",
        "https://images.unsplash.com/photo-1527206363095-ca2f054128b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2874&q=80"
      );
  });
});
