export const Passwords = {
 test : Cypress.env("keycloak_pass_test"),
 dev : Cypress.env("keycloak_pass_dev"),
 staging : Cypress.env("keycloak_pass_stage"),
 uat : Cypress.env("keycloak_pass_uat"),
}
