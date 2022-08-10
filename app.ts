const gameContainerDiv = document.querySelector(".game-container")!;
const buttonDiv = document.getElementById("buttons-div")!;
const levelDisplay = document.getElementById("level-display")!;
const incorrectDisplay = document.getElementById("incorrect-display")!;

let buttons: HTMLButtonElement[] = [];
let levelInProgress: boolean = false;
let level: number = 3;
let correctGuesses = 0;
let incorrectGuesses = 0;
let numbers: number[] = [];

for(let i = 0; i < 36; i++){
    const button = document.createElement("button");
    button.value = i.toString();
    buttons.push(button);
    buttonDiv.appendChild(button);
}

setTimeout(function(){
    startLevel();
}, 1000);


function startLevel(){
    enableAllButtons();
    levelDisplay.innerText = "Level:    " + level;
    numbers = getArrayOfNumbers();
    changeColorOfButton();
}

function changeColorOfButton(){
    for(let i = 0; i < numbers.length; i++){
        buttons[numbers[i]].classList.add("color-button");
    }
    setTimeout(function(){
        for(let i = 0; i < numbers.length; i++){
            buttons[numbers[i]].classList.remove("color-button");
        }
        levelInProgress = true;
    }, 1500);
    
}


function getArrayOfNumbers(){
    let numbers: number[] = [];
    for(let i = 0; i < level; i++){
        const num = getRandomNumber();
        if(numbers.includes(num)){
            i--;
            continue;
        }
        numbers.push(num);
        console.log(num);
    }
    return numbers;
}

function getRandomNumber(){
    return Math.floor(Math.random() * 36) + 0; 
}

buttons.forEach(button => {
    button.addEventListener('click', e => {
        if(!levelInProgress){
            return;
        }
        button.disabled = true;
        if(checkIfGuessIsCorrect(parseInt(button.value))){
            changeButtonClass(button, "correct-button");
            correctGuesses++;
            if(correctGuesses == level){
                level++;
                correctGuesses = 0;
                levelInProgress = false;
                clearAllButtons();
                startLevel();
                
                if(level >= 15){
                    endGame();
                    levelInProgress = false;
                }
            }
            return;
        }
        incorrectGuesses++;
        incorrectDisplay.innerText = incorrectGuesses + "/10 incorrect";
        changeButtonClass(button, "incorrect-button");
        if(incorrectGuesses >= 10){
            endGame();
            levelInProgress = false;
        }
        button.classList.add("incorrect-button");
    });
});

function checkIfGuessIsCorrect(buttonValue: number){
    return numbers.includes(buttonValue);
}

function clearAllButtons(){
    buttons.forEach(button => {
        button.removeAttribute('class');
    })
}

function enableAllButtons(){
    buttons.forEach(button => {
        button.disabled = false;
    })
}

function changeButtonClass(button: HTMLButtonElement, classType: string){
    button.classList.add(classType);
}

function endGame(){
    gameContainerDiv.innerHTML = `
    <h1>GAME OVER</h1>
    <h3>You reached level ${level}!</h3>
    `
}
