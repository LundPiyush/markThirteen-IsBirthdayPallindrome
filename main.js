const btnCheck = document.querySelector("#btn-check");
const inputDOB = document.querySelector("#input-dob");
const message = document.querySelector("#message");

function reverseString(str){
    return str.split('').reverse().join('');
}

function isPalindrome(str){
    return str === reverseString(str);
}

function dateToString(date){
    var dateToStr = {day : '', month : '', year : ''};
    if (date.day < 10)
        dateToStr.day = '0' + date.day;
    else 
        dateToStr.day = date.day.toString();

    if (date.month < 10)
        dateToStr.month = '0' + date.month;
    else 
        dateToStr.month = date.month.toString();
    
    dateToStr.year = date.year.toString();
    return dateToStr;
}

function dateAllVariations(date){
    var dateStr = dateToString(date)
    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromesForAllDateFormats(date){
    var listOfDates = dateAllVariations(date);
    var flag = false;

    for(let i=0; i<listOfDates.length; i++)
        if(isPalindrome(listOfDates[i])){
            flag = true;
            break;
        }
    return flag;
}

function isLeapyear(year){
    if(year % 4===0 && year % 100 !== 0 || year % 400 ===0)
        return true
    return false
}

function getNextDate(date){
    var daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    
    var day = date.day + 1
    var month = date.month;
    var year = date.year;

    if(month == 2){
        if(isLeapyear(year)){
            if(day>29){
                day = 1
                month++
            }
        }
        else{
            if(day>28){
                day = 1
                month++
            }
        }
    }
    else{
        if(day > daysInMonths[month-1]){
            day = 1
            month++
        }
    }

    if(month > 12){
        month = 1
        year++
    }

    return { 
        day:day,
        month: month,
        year:year
    }
}

function getPreviousDate(date){
    var daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    var day = date.day - 1;
    var month = date.month;
    var year = date.year;

    if (month === 3)
        if (isLeapYear(year)){
            if(day === 0){
                day = 29;
                month = 2;
            }
        }
        else{
            if(day === 0){
                day = 28;
                month = 2;
            }
        }
    else{
        if(day === 0){
            month--;
            day = daysInMonths[month-1];
        }
    }

    if(month === 0){
        day = 31;
        month = 12;
        year--;
    }
    return {
        day : day,
        month : month,
        year: year
    }
}

function getNextPalindrome(date){
    var count = 0;
    var nextDate = getNextDate(date);

    while(1){
        count++;
        if(checkPalindromesForAllDateFormats(nextDate))
            break;
        nextDate = getNextDate(nextDate);
    }
    return [count, nextDate];
}

function getPreviousPalindrome(date){
    var count = 0;
    var prevDate = getPreviousDate(date);

    while(1){
        count++;
        if(checkPalindromesForAllDateFormats(prevDate))
            break;
        prevDate = getPreviousDate(prevDate);
    }
    return [count, previousDate];
}

function checkIsBirthdayPallindrome(){
    if(inputDOB.value === '')
        message.innerText = 'Enter the valid bithdate'
    else{
        
    }
    
}

btnCheck.addEventListener("click",checkIsBirthdayPallindrome)
