import {getResetPwdUrl, getUserSession} from "../constants/urlFactory";

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace,no-redeclare
    namespace Cypress {
        interface Chainable<Subject> {
            getUserSession(server: string): Chainable<void>;
        }
    }
}
Cypress.Commands.add(
    'getUserSession',
    //1st phase of authorization
    (server: string) => {
        cy.request({
            method: 'GET',
            url: getUserSession(server),
            headers: {
                'referrer' : `https://${server}.liquidtool.com/home`
             },
        }).then(resp => {
            const cookieFirst = resp.allRequestResponses[0]["Request Headers"].cookie
            const location = resp.allRequestResponses[1]["Response Headers"].location
            const cookieLast = resp.requestHeaders['cookie']
            const paramsList = cookieLast.split(/; /)

            cy.wrap(cookieFirst.split("SESSION=")[1]).as("sessionId")
            cy.wrap(paramsList[0].split("KC_RESTART=")[1]).as("kcRestart")
            cy.wrap(paramsList[1].split("AUTH_SESSION_ID_LEGACY=")[1]).as("authSessionIdLegacy")
            cy.wrap(paramsList[2].split("AUTH_SESSION_ID=")[1]).as("authSessionId")
            cy.wrap(location).as("location")
        });
    },
);
