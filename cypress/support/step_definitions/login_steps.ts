import {And, When, Given, Then} from 'cypress-cucumber-preprocessor/steps';
import {SignInPage} from "../../page-objects/sigInPage";
import {getPlatformUrl} from "../constants/urlFactory";

Given('user jump into lts login page', () => {
    cy.visit(getPlatformUrl(Cypress.env('server')));
})


// Then('Url contains {string}', (character) => {
//     Filter.urlContains(character);
// })

When("user enter a username {string}", (username) => {
    SignInPage.fillUsername(username)
})

And("user enter a password {string}", (password) => {
    SignInPage.fillPassword(password)
})

And("user click on sign-in button", () => {
    SignInPage.submitSignIn()
})

Then("user jumped into dashboard welcome page", () => {
   cy.url().should('contain', "/welcome");
})

Then("invalid login warning message appeared with text {string}", (alert) => {
    SignInPage.invalidLoginPopUpAppeared(alert)
})

// When('I filter car by {int} nth {string}', (nth, filterType) => {
//     if (filterType == 'Energy') {
//         Filter.filterByAnyEnergy(nth);
//     } else {
//         Filter.filterByAnyGearbox(nth);
//     }
// })
//
// When('I filter car by price', (dataTable) => {
//     const table = dataTable.hashes();
//     table.forEach(row => {
//             cy.navigateWithCookies(`${offers_finance_url}?prices=${row.minPrice}%2C${row.maxPrice}`)
//         }
//     );
// })

// When('start server for api validation', function (dataTable) {
//     const table = dataTable.hashes();
//     table.forEach(row => {
//             cy.server();
//             cy.route(row.method,
//                 `**${row.partialUrl}`
//             ).as(row.alias);
//         }
//     );
// });
//
// Then(/^legal text (should|should not) exists$/, function (textExists) {
//     let result = (textExists === 'should') ? 'exist' : 'not.exist'
//     Models.getPrices().getLegalTexts().should(result);
// });
//
// Then('verify resultCode of api with alias {string}', function (alias) {
//     cy.wait(`@${alias}`).should("have.property", "status", 200);
// });

// Given(/^create user is called$/, function () {
//
//     cy.createUser("test",)
// });
