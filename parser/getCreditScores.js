const getCreditScores = function(data){
    let ignoreTexts = ["There are not enough active accounts on", "your credit report to calculate a score.", "There are not enough active accounts on your credit report to calculate a score."];
    let foundCreditScores = false;
    let scoresInfo = {transUnion: {filledScore: false, filledGrade: false, filledDate: false, noScore: false, score: null, grade: null, updatedOn: null},
                        equiFax: {filledScore: false, filledGrade: false, filledDate: false, noScore: false, score: null, grade: null, updatedOn: null},
                        experian: {filledScore: false, filledGrade: false, filledDate: false, noScore: false, score: null, grade: null, updatedOn: null}}
    for(let d of data)
    {
        if(d == "Credit Scores")
        {
            foundCreditScores = true;
        }
        else if(d == "Personal Information")
        {
            break;
        }
        else
        {
            if(foundCreditScores)
            {
                if(ignoreTexts.indexOf(d) >= 0)
                {
                    continue;
                }
                if(d == "NO SCORE")
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
                else if(parseInt(d) > 0)
                {
                    if(scoresInfo.transUnion.filledScore === false)
                    {
                        scoresInfo.transUnion.filledScore = true;
                        scoresInfo.transUnion.score = parseInt(d);
                    }
                    else if(scoresInfo.equiFax.filledScore === false)
                    {
                        scoresInfo.equiFax.filledScore = true;
                        scoresInfo.equiFax.score = parseInt(d);                        
                    }
                    else if(scoresInfo.experian.filledScore === false)
                    {
                        scoresInfo.experian.filledScore = true;
                        scoresInfo.experian.score = parseInt(d);                        
                    }
                }
                else if(d.indexOf("Updated") >= 0)
                {
                    if(scoresInfo.transUnion.filledDate === false)
                    {
                        scoresInfo.transUnion.filledDate = true;
                        scoresInfo.transUnion.updatedOn = d.replace("Updated ", "");
                    }
                    else if(scoresInfo.equiFax.filledDate === false)
                    {
                        scoresInfo.equiFax.filledDate = true;
                        scoresInfo.equiFax.updatedOn = d.replace("Updated ", "");                       
                    }
                    else if(scoresInfo.experian.filledDate === false)
                    {
                        scoresInfo.experian.filledDate = true;
                        scoresInfo.experian.updatedOn = d.replace("Updated ", "");                       
                    }
                }
                else
                {
                    if(scoresInfo.transUnion.filledGrade === false)
                    {
                        scoresInfo.transUnion.filledGrade = true;
                        scoresInfo.transUnion.grade = d;
                    }
                    else if(scoresInfo.equiFax.filledGrade === false)
                    {
                        scoresInfo.equiFax.filledGrade = true;
                        scoresInfo.equiFax.grade = d;                      
                    }
                    else if(scoresInfo.experian.filledGrade === false)
                    {
                        scoresInfo.experian.filledGrade = true;
                        scoresInfo.experian.grade = d;                      
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