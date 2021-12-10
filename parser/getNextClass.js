const getNextClass = function(currentClass, nextLevel)
{
    let currentLevel = currentClass.substring(1);
    if(parseInt(currentLevel) > 0)
    {
        return currentClass.substring(0, 1) + (parseInt(currentLevel) + parseInt(nextLevel));
    }
    return null;
}

module.exports = getNextClass;