const getNextClass = require("./getNextClass");

const getCreditScores = function(data){
    let highestClass = null;
    let secondHighest = null;
    let thirdHighest = null;
    let fourthHighest = null;
    let ignoreTexts = ["There are not enough active accounts on", "your credit report to calculate a score.", "There are not enough active accounts on your credit report to calculate a score."];
    let foundCreditScores = false;
    let scoresInfo = {transUnion: {filledScore: false, filledGrade: false, filledDate: false, noScore: false, score: null, grade: null, updatedOn: null},
                        equiFax: {filledScore: false, filledGrade: false, filledDate: false, noScore: false, score: null, grade: null, updatedOn: null},
                        experian: {filledScore: false, filledGrade: false, filledDate: false, noScore: false, score: null, grade: null, updatedOn: null}}
    for(let d of data)
    {
        if(d.value == "Credit Scores")
        {
            highestClass = d.currentClass;
            foundCreditScores = true;
            secondHighest = getNextClass(highestClass, 1);
            thirdHighest = getNextClass(highestClass, 2);
            fourthHighest = getNextClass(highestClass, 3);
        }
        else if((highestClass != null && d.currentClass == highestClass) && foundCreditScores === true)
        {
            break;
        }
        else
        {
            if(foundCreditScores)
            {
                if(ignoreTexts.indexOf(d.value) >= 0)
                {
                    continue;
                }
                if(d.currentClass == secondHighest)
                {
                    if(d.value == "NO SCORE")
                    {
                        if(scoresInfo.transUnion.filledScore === false)
                        {
                            scoresInfo.transUnion.filledScore = true;
                            scoresInfo.transUnion.noScore = true;
                        }
                        else if(scoresInfo.equiFax.filledScore === false)
                        {
                            scoresInfo.equiFax.filledScore = true;
                            scoresInfo.equiFax.noScore = true;                        
                        }
                        else if(scoresInfo.experian.filledScore === false)
                        {
                            scoresInfo.experian.filledScore = true;
                            scoresInfo.experian.noScore = true;                        
                        }
                    }
                    else if(parseFloat(d.value) > 0)
                    {
                        if(scoresInfo.transUnion.filledScore === false)
                        {
                            scoresInfo.transUnion.filledScore = true;
                            scoresInfo.transUnion.score = parseFloat(d.value).toFixed(2);
                        }
                        else if(scoresInfo.equiFax.filledScore === false)
                        {
                            scoresInfo.equiFax.filledScore = true;
                            scoresInfo.equiFax.score = parseFloat(d.value).toFixed(2);                        
                        }
                        else if(scoresInfo.experian.filledScore === false)
                        {
                            scoresInfo.experian.filledScore = true;
                            scoresInfo.experian.score = parseFloat(d.value).toFixed(2);                        
                        }
                    }
                }
                else if(d.currentClass == thirdHighest)
                {
                    if(scoresInfo.transUnion.filledGrade === false)
                    {
                        scoresInfo.transUnion.filledGrade = true;
                        scoresInfo.transUnion.grade = d.value;
                    }
                    else if(scoresInfo.equiFax.filledGrade === false)
                    {
                        scoresInfo.equiFax.filledGrade = true;
                        scoresInfo.equiFax.grade = d.value;                      
                    }
                    else if(scoresInfo.experian.filledGrade === false)
                    {
                        scoresInfo.experian.filledGrade = true;
                        scoresInfo.experian.grade = d.value;                      
                    }
                }
                else if(d.currentClass == fourthHighest)
                {
                    if(scoresInfo.transUnion.filledDate === false)
                    {
                        scoresInfo.transUnion.filledDate = true;
                        scoresInfo.transUnion.updatedOn = d.value.replace("Updated ", "");
                    }
                    else if(scoresInfo.equiFax.filledDate === false)
                    {
                        scoresInfo.equiFax.filledDate = true;
                        scoresInfo.equiFax.updatedOn = d.value.replace("Updated ", "");                       
                    }
                    else if(scoresInfo.experian.filledDate === false)
                    {
                        scoresInfo.experian.filledDate = true;
                        scoresInfo.experian.updatedOn = d.value.replace("Updated ", "");                       
                    }
                }
            }
            else
            {
                continue;
            }
        }
    }
    return scoresInfo;
}
module.exports = getCreditScores;