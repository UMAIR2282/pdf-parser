const getDataAgainstClasses = require("./getDataAgainstClasses");
const getNextClass = require("./getNextClass");
const StringHelper = require("./stringHelper");

const getAccountSummaryInfo = function(data, sectionName = "Accounts Summary", subClass = "h7"){
    let highestClass = null;
    let ignoreTexts = ["There are not enough active accounts on", "your credit report to calculate a score.", "There are not enough active accounts on your credit report to calculate a score."];
    let foundSectionInfo = false;
    let sectionInfo = {transUnion: {}, equiFax: {}, experian: {}}
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
                let classes = Object.values(d.classes);
                if(sectionInfo.transUnion["Total"] == undefined)
                {
                    sectionInfo.transUnion["Total"] = {label: "Total", balance: null, payment: null};
                }
                if(sectionInfo.equiFax["Total"] == undefined)
                {
                    sectionInfo.equiFax["Total"] = {label: "Total", balance: null, payment: null};
                }
                if(sectionInfo.experian["Total"] == undefined)
                {
                    sectionInfo.experian["Total"] = {label: "Total", balance: null, payment: null};
                }
                if(d.value.indexOf("$") < 0 && (d.currentClass == subClass || classes.indexOf(subClass) >= 0))
                {
                    let columnName = StringHelper.replaceAll(d.value, ' ', '');
                    let label = d.value;
                    if(sectionInfo.transUnion[columnName] == undefined)
                    {
                        sectionInfo.transUnion[columnName] = {label: label, balance: null, payment: null};
                    }
                    if(sectionInfo.equiFax[columnName] == undefined)
                    {
                        sectionInfo.equiFax[columnName] = {label: label, balance: null, payment: null};
                    }
                    if(sectionInfo.experian[columnName] == undefined)
                    {
                        sectionInfo.experian[columnName] = {label: label, balance: null, payment: null};
                    }
                    i++;
                    let bp = data[i];
                    let bpColumnName = StringHelper.replaceAll(bp.value, ' ', '');
                    if(bpColumnName == "BalancePayment")
                    {
                        i++;
                        let amount = data[i];
                        if(sectionInfo.transUnion[columnName].balance == null)
                        {
                            sectionInfo.transUnion[columnName].balance = amount.value.split(" ")[0];
                            sectionInfo.transUnion[columnName].payment = amount.value.split(" ")[1];
                        }
                        else if(sectionInfo.equiFax[columnName].balance == null)
                        {
                            sectionInfo.equiFax[columnName].balance = amount.value.split(" ")[0];
                            sectionInfo.equiFax[columnName].payment = amount.value.split(" ")[1];
                        }
                        else if(sectionInfo.experian[columnName].balance == null)
                        {
                            sectionInfo.experian[columnName].balance = amount.value.split(" ")[0];
                            sectionInfo.experian[columnName].payment = amount.value.split(" ")[1];
                        }
                    }        
                }
                else if(d.value.indexOf("$") >= 0 && d.value.indexOf("Total Balances:") >= 0 && (d.currentClass == subClass || classes.indexOf(subClass) >= 0))
                {
                    let values = StringHelper.replaceAll(d.value, "Total Balances:", "").split(" ");
                    if(sectionInfo.transUnion["Total"].balance == null && values.length > 0 && values[0] != undefined && values[0] != null)
                    {
                        sectionInfo.transUnion["Total"].balance = values[0].trim().replace(String.fromCharCode(57442), "");
                    }
                    if(sectionInfo.equiFax["Total"].balance == null && values.length > 1 && values[1] != undefined && values[1] != null)
                    {
                        sectionInfo.equiFax["Total"].balance = values[1].trim().replace(String.fromCharCode(57442), "");
                    }
                    if(sectionInfo.experian["Total"].balance == null && values.length > 2 && values[2] != undefined && values[2] != null)
                    {
                        sectionInfo.experian["Total"].balance = values[2].trim().replace(String.fromCharCode(57442), "");
                    }
                }
                else if(d.value.indexOf("$") >= 0 && d.value.indexOf("Total Payments:") >= 0 && (d.currentClass == subClass || classes.indexOf(subClass) >= 0))
                {
                    let values = StringHelper.replaceAll(d.value, "Total Payments:", "").split(" ");
                    if(sectionInfo.transUnion["Total"].payment == null && values.length > 0 && values[0] != undefined && values[0] != null)
                    {
                        sectionInfo.transUnion["Total"].payment = values[0].trim().replace(String.fromCharCode(57442), "");
                    }
                    if(sectionInfo.equiFax["Total"].payment == null && values.length > 1 && values[1] != undefined && values[1] != null)
                    {
                        sectionInfo.equiFax["Total"].payment = values[1].trim().replace(String.fromCharCode(57442), "");
                    }
                    if(sectionInfo.experian["Total"].payment == null && values.length > 2 && values[2] != undefined && values[2] != null)
                    {
                        sectionInfo.experian["Total"].payment = values[2].trim().replace(String.fromCharCode(57442), "");
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
module.exports = getAccountSummaryInfo;