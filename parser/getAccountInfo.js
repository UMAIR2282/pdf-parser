const StringHelper = require("./stringHelper");

const getAccountInfo = function(data, idx, accountInfo)
{
    let i = idx;
    for(i = idx; i < (idx + 3); i++)
    {
        let d = data[i];
        if(d == undefined || d == null || d.value == undefined || d.value == null || d.value.trim().length <= 0)
        {
            continue;
        }
        if(d.currentClass == "h7" && (accountInfo.bankName == undefined || accountInfo.bankName == null))
        {
            accountInfo.bankName = d.value;
        }
        else if(d.currentClass == "h5" && (accountInfo.accountNumber == undefined || accountInfo.accountNumber == null))
        {
            accountInfo.accountNumber = StringHelper.replaceAll(d.value, "Account" + String.fromCharCode(57442) + "# ", "");
        }
        else if(d.currentClass == "h5" && (accountInfo.accountStatus == undefined || accountInfo.accountStatus == null))
        {
            accountInfo.accountStatus = d.value;
        }
    }
    return i;
}
module.exports = getAccountInfo;