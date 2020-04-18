const testData = require('../testData/testData.json');
context('Bayzat Test', () => {
    beforeEach(() => {
            cy.visit(testData.URL);
            cy.contains('Login').click();
            cy.get('[type=email]').type(testData.login_userName);
            cy.get('[type=password]').type(testData.login_password);
            cy.get('[type=submit]').click();
            cy.url().should('eq', testData.dashboard_URL);
        });
    it('.should() - View the Team, Add and Delete Employee', () => {  
        cy.contains('View Team').scrollIntoView().should('be.visible');
        cy.contains('View Team').click();
        cy.get('.js-employee-list').find('tbody tr').should('have.length.greaterThan', 0);
        cy.contains('Add Employees').scrollIntoView().should('be.visible');
        cy.contains('Add Employees').click();
        cy.contains('Add Employee').click();
        cy.get('[name=firstName]').type(testData.employee_firstName);
        cy.get('[name=lastName]').type(testData.employee_lastName);
        cy.get('.fa-check-square').scrollIntoView().should('be.visible');
        cy.get('.fa-check-square').click();
        cy.contains('Create and add another').click();
        cy.wait(3000);
        cy.get('[name=firstName]').type(testData.employee_firstName);
        cy.get('[name=lastName]').type(testData.employee_lastName);
        cy.get('.fa-check-square').scrollIntoView().should('be.visible');
        cy.get('.fa-check-square').click();
        cy.contains('Create').click();
        cy.wait(3000);
        cy.contains('View Team').scrollIntoView().should('be.visible');
        cy.contains('View Team').click();
        cy.get('[placeholder="Search by employee name"]').scrollIntoView().should('be.visible');
        cy.get('[placeholder="Search by employee name"]').type(testData.employee_firstName + ' ' + testData.employee_lastName);
        cy.wait(5000);
        cy.get('.js-employee-list').find('tbody tr').should('have.length.greaterThan', 0);
        cy.get('.js-employee-list').find('thead i:first').and('have.class', 'fa fa-fw fa-square-o').click({ multiple: true });
        cy.get('.fa-trash-o').should('be.visible').click();
        cy.contains('Confirm').should('be.visible').click();
        cy.wait(5000);
        cy.get('.js-employee-list').find('tbody tr td').should('have.text', 'No employees yet.');
    });
    afterEach(() => {
        cy.get('[data-external-id=logout-link]').scrollIntoView().should('be.visible');
        cy.get('[data-external-id=logout-link]').click();
        cy.url().should('eq', testData.login_URL);
        cy.get('[type=submit]').should('be.visible');
    });     
});