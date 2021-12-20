const getNextClass = require("./getNextClass");
const StringHelper = require("./stringHelper");

const getDataAgainstClasses = function(data, idx, returnInfo, currentClass, parentClass, secondHighest = null, thirdHighest = null, fourthHighest = null)
{
    if(secondHighest == null)
    {
        secondHighest = getNextClass(currentClass, 1);
    }
    if(thirdHighest == null)
    {
        thirdHighest = getNextClass(currentClass, 2);
    }
    if(fourthHighest == null)
    {
        fourthHighest = getNextClass(currentClass, 3);
    }
    let i = idx;
    for(i = idx; i < data.length; i++)
    {
        let d = data[i];
        let dClasses = Object.values(d.classes);
        if(d.value == undefined || d.value == null || d.value.trim().length <= 0)
        {
            continue;
        }
        else if(d.currentClass == parentClass || dClasses.indexOf(parentClass) >= 0)
        {
            break;
        }
        if(d.currentClass == currentClass || d.classes.indexOf(currentClass) >= 0)
        {
            let columnName = StringHelper.replaceAll(d.value, ' ', '');
            let label = d.value;
            let values = [];
            for(i = i + 1; i < data.length; i++)
            {
                let c = data[i];
                let classes = Object.values(c.classes);
                if(c.value == undefined || c.value == null || c.value.trim().length <= 0)
                {
                    continue;
                }
                if(c.currentClass == currentClass || c.currentClass == parentClass)
                {
                    break;
                }
                if((c.currentClass == secondHighest || c.currentClass == thirdHighest || c.currentClass == fourthHighest)
                   || (classes.indexOf(secondHighest) >= 0 || classes.indexOf(thirdHighest) >= 0 || classes.indexOf(fourthHighest) >= 0)
                )
                {
                    values.push(c.value);
                }
            }
            i = i - 1;
            if(values == undefined || values == null)
            {
                values = "---";
            }
            else if(values.length == 1)
            {
                values = values[0];
            }
            if(returnInfo.transUnion[columnName] == undefined || returnInfo.transUnion[columnName] == null)
            {
                returnInfo.transUnion[columnName] = {label: label, values: values};
            }
            else if(returnInfo.equiFax[columnName] == undefined || returnInfo.equiFax[columnName] == null)
            {
                returnInfo.equiFax[columnName] = {label: label, values: values};
            }
            else if(returnInfo.experian[columnName] == undefined || returnInfo.experian[columnName] == null)
            {
                returnInfo.experian[columnName] = {label: label, values: values};
            }
        }
    }
    if(i > (idx + 1))
    {
        i = i - 1;
    }
    return i;
}
module.exports = getDataAgainstClasses;