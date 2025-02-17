describe("Mobile Stories Feature", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000");
    });

    // check if the stories list is visible and scrollable
    it("should display a horizontally scrollable list of stories", () => {
        cy.get("#usersList").should("be.visible").and("have.css", "overflow-x", "scroll");
    });

    // click on the first story and check if it opens
    it("should allow user to start viewing a story", () => {
        cy.get("#user-1").click();
        cy.get("#story-1").should("be.visible");
    });

    // should open next story after 5 second
    it("should open next story after 5 second", () => {
        cy.get("#user-2").click();
        cy.wait(5002);
        cy.get("#story-2").should("be.visible");
    });
});
