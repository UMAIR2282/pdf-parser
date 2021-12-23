const getAccountInfo = require("./getAccountInfo");
const getDataAgainstClasses = require("./getDataAgainstClasses");
const StringHelper = require("./stringHelper");

const getAllAccountsInfo = function(data, sectionName = "All Accounts", subClass = "h7"){
    let highestClass = null;
    let ignoreTexts = ["There are not enough active accounts on", "your credit report to calculate a score.", "There are not enough active accounts on your credit report to calculate a score."];
    let foundSectionInfo = false;
    let accountsInfo = [];
    for(let i = 0; i < data.length; i++)
    {
        let d = data[i];
        let dClasses = Object.values(d.classes);
        if(d.value == sectionName)
        {
            highestClass = d.currentClass;
            foundSectionInfo = true;
        }
        else if(((highestClass != null && d.currentClass == highestClass) || (highestClass != null && dClasses.indexOf(highestClass) >= 0)) && foundSectionInfo === true)
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
                let accountInfo = {bankName: null, accountNumber: null, accountStatus: null, accountDetails: {transUnion: {}, equiFax: {}, experian: {}}};
                let paymentInfo = {transUnion: {}, equiFax: {}, experian: {}};
                i = getAccountInfo(data, i, accountInfo);
                if(data.length > i)
                {
                    if((highestClass != null && data[i].currentClass == highestClass) || (highestClass != null && Object.values(data[i].classes).indexOf(highestClass) >= 0))
                    {
                        break;
                    }
                    i = getDataAgainstClasses(data, i, accountInfo.accountDetails, data[i].currentClass, "hd");
                }
                if(data.length > i)
                {
                    if((highestClass != null && data[i].currentClass == highestClass) || (highestClass != null && Object.values(data[i].classes).indexOf(highestClass) >= 0))
                    {
                        break;
                    }
                    i = getDataAgainstClasses(data, i, paymentInfo, data[i].currentClass, "h7");
                    if(data[i] && (data[i].currentClass == "h7" || data[i].currentClass == "h3"))
                    {
                        i--;
                    }
                    accountInfo.paymentInfo = paymentInfo;
                }
                accountsInfo.push(JSON.parse(JSON.stringify(accountInfo)));
            }
            else
            {
                continue;
            }
        }
    }
    return accountsInfo;
}
module.exports = getAllAccountsInfo;