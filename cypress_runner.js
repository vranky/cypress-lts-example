const cypress = require("cypress");
const yargs = require("yargs");
const { merge } = require("mochawesome-merge");
const marge = require("mochawesome-report-generator");
const rm = require("rimraf");
const cypressConfig = require("./cypress");
const ls = require("ls");

const argv = yargs
  .options({
    browser: {
      alias: "b",
      describe: "choose browser that you wanna run tests on",
      default: "chrome",
      choices: ["chrome", "electron", "edge", "firefox"],
    },
    spec: {
      alias: "s",
      describe: "run test with specific spec file",
      default: "cypress/smoke/",
    },
    mode: {
      alias: "m",
      describe: "run test in headless or headed mode",
      default: "headless",
      choices: ["headless", "headed"],
    },
    env: {
      alias: "e",
      describe: "run test with specific enviromental variables",
    },
  })
  .help().argv;

const reportDir = cypressConfig.reporterOptions.reportDir;
const reportFiles = `${reportDir}/*.json`;
// list all of existing report files
ls(reportFiles, { recurse: true }, (file) =>
  console.log(`removing ${file.full}`)
);

// delete all existing report files
rm(reportFiles, (error) => {
  if (error) {
    console.error(`Error while removing existing report files: ${error}`);
    process.exit(1);
  }
  console.log("Removing all existing report files successfully!");
});
function generateReport(options) {
  merge(options).then((report) => {
    //console.log(report);
    marge.create(report, options);
  });
}
cypress
  .run({
    browser: argv.browser,
    spec: argv.spec,
    headed: argv.mode === "headed",
    headless: argv.mode === "headless",
    configFile: argv.configFile,
    env: argv.env,
  })
  .then((results) => {
    const reporterOptions = {
      reportDir: results.config.reporterOptions.reportDir,
      files: [reportFiles],
    };
    generateReport(reporterOptions);
    process.exit(results.totalFailed);
  })
  .catch((error) => {
    console.error("errors: ", error);
    process.exit(1);
  });
