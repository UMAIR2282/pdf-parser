const getAddresses = require("./getAddresses");
const getDateOfBirth = require("./getDateOfBirth");
const getNames = require("./getNames");

const getPersonalInfo = function(data){
    let ignoreTexts = ["There are not enough active accounts on", "your credit report to calculate a score.", "There are not enough active accounts on your credit report to calculate a score."];
    let foundPersonalInfo = false;
    let personalInfo = {transUnion: {name: null, secondName: null, dob: null, currentAddress: null, addressHistory: []},
                        equiFax: {name: null, secondName: null, dob: null, currentAddress: null, addressHistory: []},
                        experian: {name: null, secondName: null, dob: null, currentAddress: null, addressHistory: []}}
    for(let i = 0; i < data.length; i++)
    {
        let d = data[i];
        if(d == "Personal Information")
        {
            foundPersonalInfo = true;
        }
        else if(d == "Accounts Summary")
        {
            break;
        }
        else
        {
            if(foundPersonalInfo)
            {
                if(ignoreTexts.indexOf(d) >= 0)
                {
                    continue;
                }
                if(d == "Name")
                {
                    i = getNames(data, i, personalInfo);
                    d = data[i];
                }
                if(d == "Date of Birth")
                {
                    i = getDateOfBirth(data, i, personalInfo);
                    d = data[i];
                }
                if(d == "Current Address" || d == "Address History")
                {
                    i = getAddresses(data, i, personalInfo);
                    d = data[i];
                }
            }
            else
            {
                continue;
            }
        }
    }
    return personalInfo;
}
module.exports = getPersonalInfo;