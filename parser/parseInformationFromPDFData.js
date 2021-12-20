const getAccountSummaryInfo = require("./getAccountSummary");
const getCreditScores = require("./getCreditScores");
const getPersonalInfo = require("./getPersonalInfo");
const getSectionInfo = require("./getSectionInfo");

const parseInformationFromPDFData = function(data){
    let scores = getCreditScores(data);
    let personalInfo = getSectionInfo(data, "Personal Information", "h5");
    let accountsSummary = getAccountSummaryInfo(data);
    let allAccounts = getSectionInfo(data, "All Accounts", "h5");
    console.log("Scores", scores, "PersonalInfo", personalInfo, "AccountsSummary", accountsSummary, "AllAccounts", allAccounts);
};
module.exports = parseInformationFromPDFData;