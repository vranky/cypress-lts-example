import {And, When, Given, Then} from 'cypress-cucumber-preprocessor/steps';
import {randomString} from "../helpers";

beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
});

Given(/^Random user is created$/, function () {
    // cy.initToken("test")
    const email = `${randomString(8)}_cs_test@test.liquidtoolnotexists`
    const firstName = randomString(8)
    const lastName = randomString(8)
    const password = "Passw0rd!"
    cy.createUser(Cypress.env("server"),email, password ,firstName, lastName)
});


Given('There is an user registered with following data', function (dataTable) {
    const table = dataTable.hashes();
    // table.forEach(row => {
    //     // row.login
    //     }
    // );
});

Given('Get user session', function (dataTable) {
    cy.getUserSession(Cypress.env("server"))
});
