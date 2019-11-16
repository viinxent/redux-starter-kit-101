import { v4 } from 'uuid';

const runTimeVer = v4();
const taskName = `A new task - ${runTimeVer}`;
const updateTaskName = `A updated task - ${runTimeVer}`;

describe("To don'ts", () => {
  it("Can visit to don'ts home", () => {
    cy.visit('/');
  });

  it("Can create new to don'ts", () => {
    cy.get('#create-task-input')
      .type(taskName)
      .type('{enter}');

    cy.get('.tasks.pending>li')
      .contains(taskName)
      .should('have.length', 1);

    cy.wait(1000);
  });

  it("Can update to don'ts name", () => {
    cy.get('.tasks.pending>li')
      .contains(taskName)
      .click();

    cy.get('.tasks.pending>li')
      .find('.task-name.input>input')
      .should('have.value', taskName)
      .clear()
      .type(updateTaskName)
      .type('{enter}');

    cy.get('.tasks.pending>li')
      .contains(updateTaskName)
      .should('have.length', 1);

    cy.wait(1000);
  });

  it("Can update to don'ts status", () => {
    cy.get('.tasks.pending>li')
      .contains(updateTaskName)
      .closest('form')
      .find('.task-toggle-status')
      .click();

    cy.wait(1000);

    cy.get('.task-status-switcher')
      .find('button')
      .contains('Done')
      .click();

    cy.wait(1000);

    cy.get('.tasks.done>li')
      .contains(updateTaskName)
      .should('have.length', 1);
  });

  it("Can delete to don'ts", () => {
    cy.wait(1000);

    cy.get('.tasks.done>li')
      .contains(updateTaskName)
      .closest('form')
      .find('button.task-delete')
      .click();

    cy.wait(1000);

    cy.get('.tasks.done>li').should('have.length', 0);

    cy.get('.task-status-switcher')
      .find('button')
      .contains('Pending')
      .click();

    cy.wait(1000);

    cy.get('.tasks.pending>li').should('have.length', 0);
  });
});
