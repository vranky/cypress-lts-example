import {
  getAdminLtsUrl,
  getPlatformUrl,
  getResetPwdUrl,
  getUrl,
  getUserUrl,
  getUserUrlWithId
} from '../constants/urlFactory';
import {Passwords} from '../constants/passwordFactory';
import {getTime, randomNumber} from "../helpers";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace,no-redeclare
  namespace Cypress {
    interface Chainable<Subject> {
      initTokenService(server: string): Chainable<void>;
      createUserService(server: string, email: string, password: string, first_name: string, last_name: string): Chainable<void>;
      setUserPasswordService(server: string, user_id: string, password: string): Chainable<void>;
      createUser(server: string, email: string, password: string, first_name: string, last_name: string): Chainable<void>;
      findUserService(server: string, email: string): Chainable<void>;
      setUserPasswordService(server: string, email: string, password: string): Chainable<void>;
      verifyUserService(server: string, email: string, first_name: string, last_name: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add('initTokenService', (server: string) => {
  cy.request({
    method: 'POST',
    url: getUrl(server),
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: {
      grant_type: 'password',
      client_id: 'admin-cli',
      username: 'admin',
      password: Passwords[server],
    },
  }).then((it) => {
    cy.wrap(it.body.access_token).as('access_token');
    cy.wrap(it.body.refresh_token).as('refresh_token');
  });
});

Cypress.Commands.add(
  'createUserService',
  (server: string, email: string, password: string, first_name: string, last_name: string) => {
    cy.get('@access_token').then((token) => {
      cy.request({
        method: 'POST',
        url: getAdminLtsUrl(server) + '/users',
        headers: {
          accept: 'application/json',
          authorization: 'Bearer ' + token,
          'content-type': 'application/json',
          cookie: 'x-language=en',
        },
        body: {
          enabled: true,
          attributes: {
            locale: ['en'],
          },
          emailVerified: true,
          email: email,
          firstName: first_name,
          lastName: last_name,
        },
      })
    });
  },
);
Cypress.Commands.add(
  'findUserService',
  (server: string, email: string) => {
    // cy.initToken(server);
    cy.get('@access_token').then((token) => {
      cy.request({
        method: 'GET',
        url: getUserUrl(server,email),
        headers: {
          authorization: 'Bearer ' + token,
        },
      }).then((fu)=>{
        cy.log(JSON.stringify(fu.body))
        cy.wrap(fu.body[0].id).as("user_id")
      })
    });
  },
);

Cypress.Commands.add(
  'setUserPasswordService',
  (server: string, user_id: string, password: string) => {
    cy.get("@user_id").then((userId) => {
    cy.get('@access_token').then((token) => {
      cy.request({
        method: 'PUT',
        url: getResetPwdUrl(server, userId as unknown as string),
        headers: {
          accept: 'application/json',
          authorization: 'Bearer ' + token,
          'content-type': 'application/json',
          cookie: 'x-language=en',
        },
        body: {
          "type": "password",
          "value": password,
          "temporary": false
        },
      });
    });
    });
  },
);


Cypress.Commands.add(
  'verifyUserService',
  (server: string, email: string, first_name: string, last_name: string) => {
    cy.get("@user_id").then((userId) => {
    cy.get('@access_token').then((token) => {
      cy.request({
        method: 'PUT',
        url: getUserUrlWithId(server, userId),
        headers: {
          accept: 'application/json',
          authorization: 'Bearer ' + token,
          'content-type': 'application/json',
          cookie: 'x-language=en',
        },
        body:{
          "id": userId,
          "createdTimestamp": getTime(),
          "username": email,
          "enabled": true,
          "totp": false,
          "emailVerified": true,
          "firstName": first_name,
          "lastName": last_name,
          "email": email,
          "attributes": {
            "locale": ["en"]},
          "disableableCredentialTypes": [],
          "requiredActions": [],
          "notBefore": 0,
          "access": {
            "manageGroupMembership": true,
            "view": true,
            "mapRoles": true,
            "impersonate": true,
            "manage": true}
        },
      });
    });
    });
  },
);

Cypress.Commands.add(
  'finishRegistrationService',
  (server: string, company_name: string, first_name: string, last_name: string) => {
    // TODO header from user_api
    // cy.get('@access_token').then((token) => {
      cy.request({
        method: 'PUT',
        url: getPlatformUrl(server),
        // headers: {
        //   accept: 'application/json',
        //   authorization: 'Bearer ' + token,
        //   'content-type': 'application/json',
        //   cookie: 'x-language=en',
        // },
        body: { "gender" : "MALE",
          "costCenter" : "",
          "dateFormat" : "DAY_MONTH_YEAR",
          "companyName" : company_name,
          "givenName" : first_name,
          "shippingAddressSame" : true,
          "familyName" : last_name,
          "vatNumber" : randomNumber(100000,10000000),
          "unitSystem" : "SI",
          "phoneNumber" : "",
          "language" : "en",
          "timeZone" : { "name" : "Europe/Bratislava", "offset" : -120 },
          "website" : "",
          "address" : { "addressLine1" : "Brezany 123",
          "addressLine2" : "123",
          "addressLine3" : "",
          "postalCode" : "01004",
          "city" : "Brezany",
          "state" : "52bbaf71-c996-454f-bffc-99be7dde869b",
          "country" : { "id" : "27e66071-455a-e211-b14b-00155d000603",
          "currency" : "EUR",
          "unitSystem" : "SI" } } },
      });
    // });
  },
);


Cypress.Commands.add(
  'createUser',
  (server: string, email: string, password: string, first_name: string, last_name: string) => {
    cy.initTokenService(server);
    cy.createUserService(server, email, password, first_name, last_name);
    cy.findUserService(server, email);
    cy.setUserPasswordService(server, email, password);
    cy.verifyUserService(server, email, first_name, last_name);
  },
);
