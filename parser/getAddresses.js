const getAddresses = function(data, idx, personalInfo)
{
    let filledTransUnion = false;
    let filledEquiFax = false;
    let filledExperian = false;
    let filledHistoryTransUnion = false;
    let filledHistoryEquiFax = false;
    let filledHistoryExperian = false;
    let i = idx;
    for(i = idx; i < data.length; i++)
    {
        let d = data[i];
        if(d == undefined || d == null || d.trim().length <= 0)
        {
            continue;
        }
        if(d == "Current Address")
        {
            if(filledTransUnion === false)
            {
                filledTransUnion = true;
                personalInfo.transUnion.currentAddress = {lines: []}
                for(i = i + 1; i < data.length; i++)
                {
                    d = data[i];
                    if(d == undefined || d == null || d.trim().length <= 0 || d == "Current Address" || d == "Address History")
                    {
                        break;
                    }
                    personalInfo.transUnion.currentAddress.lines.push(d);
                }
                i = i - 1;
            }
            else if(filledEquiFax === false)
            {
                filledEquiFax = true; 
                personalInfo.equiFax.currentAddress = {lines: []}
                for(i = i + 1; i < data.length; i++)
                {
                    d = data[i];
                    if(d == undefined || d == null || d.trim().length <= 0 || d == "Current Address" || d == "Address History")
                    {
                        break;
                    }
                    personalInfo.equiFax.currentAddress.lines.push(d);
                }
                i = i - 1;            
            }
            else if(filledExperian === false)
            {
                filledExperian = true;
                personalInfo.experian.currentAddress = {lines: []}
                for(i = i + 1; i < data.length; i++)
                {
                    d = data[i];
                    if(d == undefined || d == null || d.trim().length <= 0 || d == "Current Address" || d == "Address History")
                    {
                        break;
                    }
                    personalInfo.experian.currentAddress.lines.push(d);
                }
                i = i - 1;             
            }
        }
        else if(d == "Address History")
        {
            if(filledHistoryTransUnion === false)
            {
                filledHistoryTransUnion = true;
                personalInfo.transUnion.addressHistory = [];
                let address = {lines: []}
                for(i = i + 1; i < data.length; i++)
                {
                    d = data[i];
                    if(d == undefined || d == null || d.trim().length <= 0)
                    {
                        personalInfo.transUnion.addressHistory.push(JSON.parse(JSON.stringify(address)));
                        address = {lines: []}
                    }
                    if(d == "Address History" || d == "Employer History")
                    {
                        if(address.lines.length > 0)
                        {
                            personalInfo.transUnion.addressHistory.push(JSON.parse(JSON.stringify(address)));
                        }
                        console.log(personalInfo.transUnion.addressHistory, "address history lines trans")
                        address = {lines: []}
                        break;
                    }
                    address.lines.push(d);
                }
                i = i - 1;
            }
            else if(filledHistoryEquiFax === false)
            {
                filledHistoryEquiFax = true;
                personalInfo.equiFax.addressHistory = [];
                let address = {lines: []}
                for(i = i + 1; i < data.length; i++)
                {
                    d = data[i];
                    if(d == undefined || d == null || d.trim().length <= 0)
                    {
                        personalInfo.equiFax.addressHistory.push(JSON.parse(JSON.stringify(address)));
                        address = {lines: []}
                    }
                    if(d == "Address History" || d == "Employer History")
                    {
                        if(address.lines.length > 0)
                        {
                            personalInfo.equiFax.addressHistory.push(JSON.parse(JSON.stringify(address)));
                        }
                        console.log(personalInfo.equiFax.addressHistory, "address history lines equiFax")
                        address = {lines: []}
                        break;
                    }
                    address.lines.push(d);
                }
                i = i - 1;                    
            }
            else if(filledHistoryExperian === false)
            {
                filledHistoryExperian = true;
                personalInfo.experian.addressHistory = [];
                let address = {lines: []}
                for(i = i + 1; i < data.length; i++)
                {
                    d = data[i];
                    if(d == undefined || d == null || d.trim().length <= 0)
                    {
                        personalInfo.experian.addressHistory.push(JSON.parse(JSON.stringify(address)));
                        address = {lines: []}
                    }
                    if(d == "Address History" || d == "Employer History")
                    {
                        if(address.lines.length > 0)
                        {
                            personalInfo.experian.addressHistory.push(JSON.parse(JSON.stringify(address)));
                        }
                        console.log(personalInfo.experian.addressHistory, "address history lines experian")
                        address = {lines: []}
                        break;
                    }
                    address.lines.push(d);
                }
                i = i - 1;                      
            }
        }
        else if(d == "Date of Birth" || (filledTransUnion && filledEquiFax && filledExperian && filledHistoryTransUnion && filledHistoryEquiFax && filledHistoryExperian))
        {
            break;
        }
    }
    return i;
}
module.exports = getAddresses;