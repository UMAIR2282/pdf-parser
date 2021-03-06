const getAddresses = require("./getAddresses");
const getDataAgainstClasses = require("./getDataAgainstClasses");
const getDateOfBirth = require("./getDateOfBirth");
const getNames = require("./getNames");
const getNextClass = require("./getNextClass");

const getPersonalInfo = function(data){
    let highestClass = null;
    let secondHighest = null;
    let thirdHighest = null;
    let fourthHighest = null;
    let ignoreTexts = ["There are not enough active accounts on", "your credit report to calculate a score.", "There are not enough active accounts on your credit report to calculate a score."];
    let foundPersonalInfo = false;
    let personalInfo = {transUnion: {}, equiFax: {}, experian: {}}
    for(let i = 0; i < data.length; i++)
    {
        let d = data[i];
        if(d.value == "Personal Information")
        {
            highestClass = d.currentClass;
            foundPersonalInfo = true;
            secondHighest = getNextClass(highestClass, 1);
            thirdHighest = getNextClass(highestClass, 2);
            fourthHighest = getNextClass(highestClass, 3);
        }
        else if((highestClass != null && d.currentClass == highestClass) && foundPersonalInfo === true)
        {
            break;
        }
        else
        {
            if(foundPersonalInfo)
            {
                if(ignoreTexts.indexOf(d.value) >= 0)
                {
                    continue;
                }
                if(d.currentClass == "h5")
                {
                    i = getDataAgainstClasses(data, i, personalInfo, d.currentClass, highestClass);
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