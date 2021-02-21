/// <reference types="Cypress" />

const USERNAME_ID = "username";
const PASSWORD_ID = "password";
const SIGN_IN_BTN_ID = "kc-login";
const INVALID_LOGIN_ALERT_CLS = "kc-feedback-text";

export const SignInPage = {
    fillUsername: (username: string) => cy.byID(USERNAME_ID).type(username),
    fillPassword: (password: string) => cy.byID(PASSWORD_ID).type(password),
    submitSignIn: () => cy.byID(SIGN_IN_BTN_ID).click(),
    invalidLoginPopUpAppeared: (alertMsg: string) =>
        cy.byClass(INVALID_LOGIN_ALERT_CLS).contains(alertMsg),
};
