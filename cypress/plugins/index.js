const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const browserify = require("@cypress/browserify-preprocessor");
const cucumber = require("cypress-cucumber-preprocessor").default;
const resolve = require('resolve');
require('dotenv').config()

module.exports = (on, config) => {
  const options = {
    ...browserify.defaultOptions,
    typescript: resolve.sync('typescript', { baseDir: config.projectRoot }),
  };
  on("file:preprocessor", cucumber(options));
  allureWriter(on, config);
  config.env.nginx_credentials = process.env.nginx_credentials
  config.env.keycloak_pass_dev = process.env.keycloak_pass_dev
  config.env.keycloak_pass_test = process.env.keycloak_pass_test
  // const targetEnv = config.env.server || "test";
  return config
}
