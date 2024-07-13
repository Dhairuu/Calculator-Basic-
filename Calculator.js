const Operands = document.querySelectorAll('.Operands');
const Operators = document.querySelectorAll('.Operators');
const DisplayBox = document.getElementById('Display-Box');
const Deletion = document.getElementById('Clear');
const Result = document.getElementById('Result');
const Percentage = document.getElementById('Percentage');
const SignChange = document.getElementById('Sign-Change');
let digits = [];
let Sign,SignCount = 0;
let Number1,Number2;
let isResult = false;
let isSign = false;
let isNumber1 = true;
let isNumber2 = false;
let PreviousValue2;

Operands.forEach((Operand)=>{
    Operand.addEventListener('click',(event)=>{
        let Clicked = event.target.textContent;
        if(isResult) { //This to Reset the Calculator
            console.log(`Reset`);
            isNumber1 = true;
            isNumber2 = false;
            isResult = false;
        }

        if(digits.length == 0 && Clicked == 0) {
            console.log(`0 not allowed in the start`);
            return;
        }
        if(digits.includes('.') && Clicked == '.') {
            console.log(`More than one '.' is not allowed`);
            return;
        }
        digits.push(Clicked);
        if(isNumber1) {
            Number1 = digits.join('');
            console.log(`Number1: ${Number1}`);
            DisplayBox.textContent = Number1;
        }
        else if(isNumber2) {
            DisplayBox.style.fontSize =`6em`;
            Number2 = digits.join('');
            console.log(`Number2: ${Number2}`);
            DisplayBox.textContent = Number2;
        }
        Deletion.textContent = 'C';
    })
})

Operators.forEach((Operator)=>{
    Operator.addEventListener('click',(event)=>{
        isResult = false;
        isNumber2 = true;
        if(isNumber1) {
            isNumber1 = false;
            digits.length = 0;
        }
        try {
            if(!isNaN(Number2)) {
                throw new Error();
            }
        }catch(error) {
            DisplayBox.textContent = `Error`;
            console.error(`NO Sign Allowed after entering Number2`)
        }
        let Clicked = event.target.textContent;
        Sign = Clicked;
        DisplayBox.textContent = Number1;
        Deletion.textContent = 'C';
        console.log(`Sign: ${Sign}`);
    })
})

Deletion.addEventListener('click',(event)=>{
    DisplayBox.style.fontSize = `6em`;
    let Icon = Deletion.textContent;
    digits.length = 0;
    if(Icon == 'AC') {
        isNumber1 = true;
        isNumber2 = false;
        Number1 = Number2 = PreviousValue2 = Sign = undefined;
        DisplayBox.textContent = 0;
    }
    if(Icon == 'C') {
        if(!isNaN(Number2)) {
            isNumber2 = true;
            Number2 = undefined;
            DisplayBox.textContent = 0;
        }
        else if(!isNaN(Sign)) {
            isNumber1 = true;
            isNumber2 = false;
            Sign = undefined;
        }
        else {
            isNumber1 = true;
            isNumber2 = false;
            Number1 = undefined;
            DisplayBox.textContent = 0;
        }
        Deletion.textContent = 'AC';
    }
})

Result.addEventListener('click',(event)=>{
    Number1 = Number(Number1);
    Number2 = Number(Number2);
    let FinalAnswer;
    // if(isNaN(Number2) && isNaN(Sign)) {
    //     return;
    // }
    if(!isNaN(PreviousValue2) && isNaN(Number2)) {
        Number2 = PreviousValue2;
    }
    if(isNaN(Number2) || isNaN(Number1)) {
        DisplayBox.textContent = `Error`;
        return;
    }
    switch(Sign) {
        case '+':
            FinalAnswer = Number1 + Number2;
            break;
        case '-':
            FinalAnswer = Number1 - Number2;
            break;
        case 'x':
            FinalAnswer = Number1 * Number2;
            break;
        case '/':
            FinalAnswer = Number1 / Number2;
            break;
    }
    console.log(`Result: ${Number1} ${Sign} ${Number2} => ${FinalAnswer}`);
    Number1 = FinalAnswer;
    PreviousValue2 = Number2;
    DisplayBox.textContent = Number1;
    digits.length = 0;
    Number2 = undefined;
    isResult = true;
})

SignChange.addEventListener('click',(event)=>{
    let value = DisplayBox.textContent;
    if(value == Number1) {
        Number1 = -Number1;
        DisplayBox.textContent = Number1;
    }
    if(value == Number2) {
        Number2 = -Number2;
        DisplayBox.textContent = Number2;
    }
})

Percentage.addEventListener('click',(event)=>{
    let value = DisplayBox.textContent;
    if(value == Number1) {
        Number1 = Number1/100;
        DisplayBox.textContent = Number1;
    }
    if(value == Number2) {
        Number2 = Number2/100;
        DisplayBox.textContent = Number2;
    }
})

function Show() {
    console.log(`Number 1: ${Number1}`);
    console.log(`Operator: ${Sign}`);
    console.log(`Number 2: ${Number2}`);
    console.log(`Display Screen: ${DisplayBox.textContent}`);
    console.log(`PreviousValue of Number2 : ${PreviousValue2}`);
}
const Window = window;
Window.addEventListener('click',()=>{
    let CurrentLength = digits.length;
    console.log(CurrentLength);
    if(CurrentLength < 11 && CurrentLength > 7 ) {
        DisplayBox.style.fontSize =`4em`;
    }
    else if(CurrentLength > 11) {
        DisplayBox.style.fontSize =`2em`;
    }
})

// setInterval(Show,9000);



