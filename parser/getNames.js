const getNames = function(data, idx, personalInfo)
{
    let filledTransUnion = false;
    let filledEquiFax = false;
    let filledExperian = false;
    let filledKnownAsTransUnion = false;
    let filledKnownAsEquiFax = false;
    let filledKnownAsExperian = false;
    let i = idx;
    for(i = idx; i < data.length; i++)
    {
        let d = data[i];
        if(d == undefined || d == null || d.trim().length <= 0)
        {
            continue;
        }
        if(d == "Name")
        {
            if(filledTransUnion === false)
            {
                filledTransUnion = true;
                personalInfo.transUnion.name = d = data[++i];;
            }
            else if(filledEquiFax === false)
            {
                filledEquiFax = true;
                personalInfo.equiFax.name = d = data[++i];;                     
            }
            else if(filledExperian === false)
            {
                filledExperian = true;
                personalInfo.experian.name = d = data[++i];;                     
            }
        }
        else if(d == "Also Known As")
        {
            if(filledKnownAsTransUnion === false)
            {
                filledKnownAsTransUnion = true;
                personalInfo.transUnion.secondName = d = data[++i];;
            }
            else if(filledKnownAsEquiFax === false)
            {
                filledKnownAsEquiFax = true;
                personalInfo.equiFax.secondName = d = data[++i];;                     
            }
            else if(filledKnownAsExperian === false)
            {
                filledKnownAsExperian = true;
                personalInfo.experian.secondName = d = data[++i];;                     
            }
        }
        else if(d == "Date of Birth" || (filledTransUnion && filledEquiFax && filledExperian && filledKnownAsTransUnion && filledKnownAsEquiFax && filledKnownAsExperian))
        {
            break;
        }
    }
    return i;
}
module.exports = getNames;