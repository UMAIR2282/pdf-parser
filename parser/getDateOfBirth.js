const getDateOfBirth = function(data, idx, personalInfo)
{
    let filledTransUnion = false;
    let filledEquiFax = false;
    let filledExperian = false;
    let i = idx;
    for(i = idx; i < data.length; i++)
    {
        let d = data[i];
        if(d == undefined || d == null || d.trim().length <= 0)
        {
            continue;
        }
        if(d == "Date of Birth")
        {
            if(filledTransUnion === false)
            {
                filledTransUnion = true;
                personalInfo.transUnion.dob = d = data[++i];;
            }
            else if(filledEquiFax === false)
            {
                filledEquiFax = true;
                personalInfo.equiFax.dob = d = data[++i];;                     
            }
            else if(filledExperian === false)
            {
                filledExperian = true;
                personalInfo.experian.dob = d = data[++i];;                     
            }
        }
        else if(d == "Current Address" || d == "Address History" || (filledTransUnion && filledEquiFax && filledExperian))
        {
            break;
        }
    }
    return i;
}
module.exports = getDateOfBirth;