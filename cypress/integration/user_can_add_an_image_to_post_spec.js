const signUpAndSignIn = require("./webhelper");

describe("Timeline", () => {
  afterEach(() => {
    cy.task("dropPosts");
    cy.task("dropUsers");
  });
  it("displays an image in a post", () => {
    // run webhelper to sign up and sign in to acebook
    signUpAndSignIn();

    // submit a post
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form")
      .find('[type="text"]')
      .type("This post has an image");
    cy.get("#new-post-form").submit();

    cy.contain("Add an image").click();
    cy.get("upload-image-form")
      .find("input[type=file]")
      .selectFile("./fixtures/sampleImage.png");
    cy.get("#upload-image-form").submit();
  });
});
