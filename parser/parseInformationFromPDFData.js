const getCreditScores = require("./getCreditScores");
const getPersonalInfo = require("./getPersonalInfo");

const parseInformationFromPDFData = function(data){
    let scores = getCreditScores(data);
    let personalInfo = getPersonalInfo(data);
    console.log("Scores", scores, "PersonalInfo", personalInfo);
};
module.exports = parseInformationFromPDFData;