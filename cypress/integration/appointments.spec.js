const { CYCLIC_KEY } = require("@storybook/addon-actions/dist/constants");

describe("Appointments", () => {

  beforeEach(() => {
    cy.request('get', 'http://localhost:8001/api/debug/reset');

    cy.visit("/")
    
    cy.contains("[data-testid=day]", "Monday");
  });

  it("should book an interview", () => {

    cy.get("[alt=Add]")
      .first()
      .click();

    cy.get("[data-testid=student-name-input]")
      .type("Lydia Miller-Jones");
    
    cy.get("[alt='Sylvia Palmer']")
      .click();

    cy.get(".button--confirm")
      .click();
    
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {

    cy.get("[alt=Edit]")
      .first()
      .click({force:true});

    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Archie 2 Cohen");
    
    cy.get("[alt='Tori Malcolm']")
      .click();

    cy.get(".button--confirm")
      .click();
    
    cy.contains(".appointment__card--show", "Archie 2 Cohen");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });
});