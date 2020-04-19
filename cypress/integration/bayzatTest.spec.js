import testData from '../testData/testData.json';

context('Bayzat Test', () => {
    beforeEach(() => {
        cy.viewport(1366, 768);
        cy.visit(testData.login_URL);
        cy.bz_login(testData.login_userName, testData.login_password, testData.dashboard_URL)
    });
    it('.should() - View the Team, Add and Delete Employee', () => {
        cy.bz_navigateToTeam();
        cy.bz_addNewEmployee(testData.employeeCreationData);
        cy.bz_searchAndDeleteEmployee(testData.employeeCreationData);
    });
    afterEach(() => {
        cy.bz_logout(testData.logout_URL);
    });
});