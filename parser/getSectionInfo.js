const getDataAgainstClasses = require("./getDataAgainstClasses");
const getNextClass = require("./getNextClass");

const getSectionInfo = function(data, sectionName, subClass = "h5"){
    let highestClass = null;
    let secondHighest = null;
    let thirdHighest = null;
    let fourthHighest = null;
    let ignoreTexts = ["There are not enough active accounts on", "your credit report to calculate a score.", "There are not enough active accounts on your credit report to calculate a score."];
    let foundSectionInfo = false;
    let sectionInfo = {transUnion: {}, equiFax: {}, experian: {}}
    for(let i = 0; i < data.length; i++)
    {
        let d = data[i];
        if(d.value == sectionName)
        {
            highestClass = d.currentClass;
            foundSectionInfo = true;
            secondHighest = getNextClass(highestClass, 1);
            thirdHighest = getNextClass(highestClass, 2);
            fourthHighest = getNextClass(highestClass, 3);
        }
        else if((highestClass != null && d.currentClass == highestClass) && foundSectionInfo === true)
        {
            break;
        }
        else
        {
            if(foundSectionInfo)
            {
                if(ignoreTexts.indexOf(d.value) >= 0)
                {
                    continue;
                }
                if(d.currentClass == subClass)
                {
                    i = getDataAgainstClasses(data, i, sectionInfo, d.currentClass, highestClass);
                    if(highestClass != null && data[i].currentClass == highestClass)
                    {
                        break;
                    }
                }
            }
            else
            {
                continue;
            }
        }
    }
    return sectionInfo;
}
module.exports = getSectionInfo;