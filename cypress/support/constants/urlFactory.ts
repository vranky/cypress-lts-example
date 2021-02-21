

export const getUrl = (server: string) => {
 return `https://identity.${server}.liquidtool.com/auth/realms/master/protocol/openid-connect/token`
}

export const getPlatformUrl = (server: string) => {
 return `https://${Cypress.env('nginx_credentials')}@platform.${server}.liquidtool.com`
}

export const getAdminLtsUrl = (server: string) => {
 return `https://identity.${server}.liquidtool.com/auth/admin/realms/lts`
}

export const getResetPwdUrl = (server: string, userId: string) => {
 return `${getAdminLtsUrl(server)}/users/${userId}/reset-password`
}

export const getUserUrl = (server: string, user_name: string) => {
 return `${getAdminLtsUrl(server)}/users?briefRepresentation=true&first=0&max=20&search=${user_name}`
}

export const getUserUrlWithId = (server: string, userId: string) => {
 return `${getAdminLtsUrl(server)}/users/${userId}`
}

export const getUserSession = (server: string) => {
 return `https://${server}.liquidtool.com/login?client_id=liquid-tool-portal&referrer=https://${server}.liquidtool.com/dashboard`
}
