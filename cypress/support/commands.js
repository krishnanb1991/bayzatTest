// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add('bz_login', (userName, password, dashURL) => {
    cy.get('[type=email]').clear()
        .type(userName);
    cy.get('[type=password]').clear()
        .type(password);
    cy.get('[type=submit]').click();
    cy.url().should('eq', dashURL);
});
Cypress.Commands.add('bz_navigateToTeam', () => {
    cy.contains('View Team').scrollIntoView()
        .should('be.visible');
    cy.contains('View Team').click();
    cy.get('.js-employee-list').find('tbody tr')
        .should('have.length.greaterThan', 0);
});
Cypress.Commands.add('bz_addNewEmployee', (employeeData) => {
    cy.contains('Add Employees').scrollIntoView()
        .should('be.visible');
    cy.contains('Add Employees').click();
    cy.contains('Add Employee').click();
    if (employeeData.length > 0) {
        employeeData.forEach(emp => {
            cy.get('[name=firstName]').clear()
                .type(emp.employee_firstName);
            cy.get('[name=lastName]').clear()
                .type(emp.employee_lastName);
            if (!emp.isEmailRequired) {
                cy.get('.fa-check-square').scrollIntoView()
                    .should('be.visible');
                cy.get('.fa-check-square').click();
            } else { /* TODO- Add Email Address to the respective field before saving... */ }
            cy.contains('Create and add another').click();
            cy.wait(3000);
        });
    } else { throw new Error("Test data not found!") };
});
Cypress.Commands.add('bz_searchAndDeleteEmployee', (employeeData) => {
    cy.bz_navigateToTeam();
    if (employeeData.length > 0) {
        employeeData.forEach(emp => {
            cy.get('[placeholder="Search by employee name"]').scrollIntoView()
                .should('be.visible');
            cy.get('[placeholder="Search by employee name"]').clear()
                .type(emp.employee_firstName + ' ' + emp.employee_lastName);
            cy.wait(5000);
            cy.get('.js-employee-list').find('tbody tr').should('have.length.greaterThan', 0);
            cy.get('.js-employee-list').find('tbody tr:first i:first').and('have.class', 'fa fa-fw fa-square-o').click();
            cy.get('.fa-trash-o').should('be.visible').click();
            cy.contains('Confirm').should('be.visible').click();
            cy.wait(5000);
        });
        cy.get('.js-employee-list').find('tbody tr td').should('have.text', 'No employees yet.');
    } else { throw new Error("Test data not found!") };
});
Cypress.Commands.add('bz_logout', (logoutURL) => {
    cy.get('[data-external-id=logout-link]').scrollIntoView().should('be.visible');
    cy.get('[data-external-id=logout-link]').click();
    cy.url().should('eq', logoutURL);
    cy.get('[type=submit]').should('be.visible');
})
