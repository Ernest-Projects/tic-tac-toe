function delayConstruction(ms) {
    return new Promise(resolve=> {setTimeout(resolve, ms)}) //
}
let emptyFields = 9;
const playField = document.querySelector(".main-field");
for (let i = 0; i < emptyFields; i++) {
    const square = document.createElement("div");
    square.className = "square";
    square.setAttribute("data-value", i);
    playField.appendChild(square);
}
const squareCollection = playField.querySelectorAll(":scope > .square");
const squares = Array.from(playField.children);
let previousGames = {};
const header = document.querySelector(".hed");
const gameName = document.querySelector(".name");
let animationIsEnd = false;
let ultimatePointer = false;
const mainField = document.querySelector(".tic-tac-toe_3d_field");
const counterField = document.querySelector(".field-for-cubs");
const xToe = counterField.querySelector(".X-toe");
const oToe = counterField.querySelector(".O-toe");
const firstVisual = counterField.querySelector(".visual-toe:nth-child(1)");
const secondVisual = counterField.querySelector(".visual-toe:nth-child(2)");
let isXturn = true;
let isCalled = false;
let Xcounter = 0;
let gameCounter = 1;
let Ocounter = 0;
const fragment = document.createDocumentFragment();
let logs = new Map(); 

function setCubicProperty(left, right, front) {
    const cubicProperty = {
        width: "160px",height: "160px",position: "relative",zIndex: "100",opacity: "0",transition: "all 0.3s ease-out",backgroundPosition: "contain",transform: "translateZ(188px)",display: "flex",justifyContent: "center",alignItems: "center",backgroundImage: "url('/image-project/krestiki-noliki.jpg')",boxShadow: "inset 0 0 20px 10px black",transformStyle: "preserve-3d",filter: ""
    };
    const cubicSideProperty = {
        position: "absolute",transition: "all 0.3s ease-out",transformStyle: "preserve-3d",width: "50%",height: "inherit",backgroundImage: "inherit",transform: "translateZ(-40px) rotateY(90deg)"
    };
    [left, right].forEach(side => {
        Object.assign(side.style, cubicSideProperty);
    });
    Object.assign(front.style, cubicProperty);
}
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];
function setPropertyForScore(first, second) {
    Object.assign(first.style, {
        filter: "blur(1rem)",transform: "scale(1)"});
    Object.assign(second.style, {
        filter: "blur(0rem)",transform: "scale(1.1)"});
}
function fullResetGame() {
    console.clear();
    console.log(`%cNew game is started!`, "color: grey; font-style: italic");
    gameCounter = 1;
    playField.innerHTML = "";
    isCalled = true;
    counter = 0;
    logs.clear();
   Object.keys(previousGames).forEach(key => delete previousGames[key])
    if (animationIsEnd) {setPropertyForScore(secondVisual, firstVisual);}
    for (let i = 0; i < 9; i++) {
        const square = document.createElement("div");
        square.className = "square";
        playField.appendChild(square);
    }
    emptyFields = 9; 
    Ocounter = 0;
    Xcounter = 0;
    isXturn = true;
    counterField.querySelector(".X-counter").textContent = "-0";
    counterField.querySelector(".O-counter").textContent = "0-";
    activateGame();
}
let squareCounter = 1;

function partialResetGame () {
    playField.innerHTML = "";
    logs.clear();
    if (animationIsEnd) {setPropertyForScore(secondVisual, firstVisual);}
    for (let i = 0; i < 9; i++) {
        const square = document.createElement("div");
        square.className = "square";
        playField.appendChild(square);
    }
    emptyFields = 9; 
    Ocounter = 0;
    Xcounter = 0;
    isXturn = true;
    squareCounter = 0;
    activateGame();

}

function updateSquareStates(index, symbol) {
    logs.set(index, symbol);
    
    let logout = "";
    let isfirst = true;
    console.group(`%cSquare States: (${squareCounter})`, "font-size: 1.5rem; ");
    for (const [key, value] of logs) {
        if (isfirst) {
            logout += ` %c=> %c{Square: ${key + 1}, Symbol: ${value}} => `;
            isfirst = false;
            continue;
        }
        logout += `{Square: ${key + 1}, Symbol: ${value}} => `;

        squareCounter++;
    }
    console.log(`%c${logout}`, "font-size: 1.2rem;", "color: rgb(188, 93, 195); font-size:1.2rem", "font-size: 1.2rem; color:white");
    console.groupEnd();
    logout = "";
    
}
function updateFieldState(fieldValue) {
    console.clear();
    console.group(`%cField States:`, "font-size: 1.5rem; ");
    console.log(`%cQuantity of empty squares: %c${fieldValue}`, "font-size: 1.2rem; ", "color:red; font-size: 1.2rem");
    console.groupEnd();
}
function updateAmimationStates (name,field) {
    let mainAnimations = field.getAnimations();
    mainAnimations.forEach(animation => {
        console.log(`${name} animation is ${animation.playState}`);
    });
}
let counter = 0;
function saveGame (message, color) {
    console.clear();
    console.group("%cHistory of games:", "font-size: 3rem;");
    let quantity = 1;
    previousGames[counter] = new Map(logs);
    for (let game in previousGames) {
       
        console.log(`%c${(game == 0) ? "" : "\n\n"} Game ${parseInt(game) + 1}:`, "font-size: 2rem; ");
        console.log(`\t %cresult: ${message}`, "color:orange; font-size: 2rem; ");
        quantity = 1;
        for (let [index, symbol] of previousGames[game]) {
           
            console.log(`\t %cMove ${parseInt(quantity)}: { %cSquare: ${index + 1} %c=> %c${symbol} }`,`color: ${color}; font-size: 1.2rem`, "font-size: 1.2rem", "font-size: 1.2rem; color: grey", `color: ${color}; font-size: 1.2rem`);
            quantity++;
        }
    }
    counter++;
    logs.clear();
    console.groupEnd();
}
async function activateGame() {
    playField.querySelectorAll(".square").forEach((element, index) => {
        let isClicked = false; 
        const cubic = document.createElement("div");
        cubic.className = `occupied-square cubic playfield${index + 1}`;
        const leftSide = document.createElement("div");
        const rightSide = document.createElement("div");
        setCubicProperty(leftSide, rightSide, cubic);
        rightSide.style.right = "-25%";
        leftSide.style.left = "-25%";
        element.addEventListener("click", async () => {
            if (isClicked) return; 
            if (element.querySelector(".X-counter")) {
                counterField.querySelector(".X-counter").textContent = `-${Xcounter}`;
            } else {
                counterField.querySelector(".O-counter").textContent = `${Ocounter}-`;
            }
            element.classList.remove("hovering-for-square");
            element.appendChild(cubic);
            if (isXturn) {
                cubic.innerHTML = xToe.innerHTML; Xcounter++;
                element.setAttribute("data-value", "X");
                setPropertyForScore(firstVisual, secondVisual);
                isXturn = false;
            } else {
                cubic.innerHTML = oToe.innerHTML; Ocounter++;
                element.setAttribute("data-value", "O");
                setPropertyForScore(secondVisual, firstVisual);
                isXturn = true;
            }
            updateFieldState(emptyFields - 1);
            updateSquareStates(index, element.getAttribute("data-value"));
            cubic.appendChild(leftSide); cubic.appendChild(rightSide);
           
            isClicked = true; emptyFields--;
            await delayConstruction(200); //
            cubic.querySelector("p").style.opacity = "0";
                Object.assign(cubic.style, {
                    opacity: "1", transform: "translateZ(58px)" });
                let stopDelay = delayConstruction(1500); //
            if (element.querySelector(".X-counter")) {
                counterField.querySelector(".X-counter").textContent = `-${Xcounter}`;
            } else {
                counterField.querySelector(".O-counter").textContent = `${Ocounter}-`;
            }

          
            await stopDelay; //
            if (emptyFields === 0) {
                mainField.classList.add(".full-rotate"); 
                saveGame("draw", "orange");
                partialResetGame();
                   for(let element of playField.children) {
                    element.removeAttribute("data-value");}
                }  
        });
    });
}
const resetButton = document.querySelector(".reset-button");
for (let i = 0; i < 4; i++) {
    const navElement = document.createElement("article");
    navElement.classList.add(`item${i + 1}`);
    fragment.appendChild(navElement);
}
mainField.appendChild(fragment);
async function gameStyleStructure() {
    await delayConstruction(200); //
    header.classList.add("animation-head");
    await delayConstruction(1000); //
        header.addEventListener("animationend",async () => {
            updateAmimationStates("rotate",mainField);
            header.style.userSelect = "none";
            mainField.style.opacity = "1";
            await delayConstruction(700); //
            mainField.classList.add("animation-main-field-forwards");
            mainField.addEventListener("animationend", async () => {
                resetButton.style.opacity = "1";
                mainField.classList.remove("animation-main-field-forwards");
                mainField.classList.add("transform-main-field");
                Object.assign(mainField.style, {
                        transform: "rotateY(-40deg) rotateX(10deg)", left: "20%" });
    
                    mainField.addEventListener("mouseenter", () => {
                        animationIsEnd = true;
                        if (Xcounter > Ocounter) {
                            setPropertyForScore(firstVisual, secondVisual);
                        } else if (Xcounter === Ocounter) {
                            setPropertyForScore(secondVisual, firstVisual);
                        }
                        mainField.style.transform = "rotate(0deg) scale(1.3)";
                        document.body.style.boxShadow = "inset 0 0 100px 20px black";
                        gameName.querySelector("p").classList.add("bluring-for-main-hover");
                        playField.querySelectorAll(".square").forEach((element) => {
                            if (element.children.length === 0 && element.textContent.trim() === "") {
                                element.classList.add("hovering-for-square");}
                        });
                    });
                    mainField.addEventListener("mouseleave", () => { 
                        animationIsEnd = false;
                        [firstVisual.style, secondVisual.style].forEach(style => {
                            Object.assign(style, {
                                filter: "blur(0rem)", transform: "scale(1)" });
                            });
                        Object.assign(mainField.style, {
                            transform: "rotateY(-40deg) rotateX(10deg)", left: "20%" });
                        document.body.style.boxShadow = "";
                        gameName.querySelector("p").classList.remove("bluring-for-main-hover");
                    });
                    Object.assign(gameName.style, {
                        opacity: "1", top: "10%"});
                    counterField.style.opacity = "1";
                  await delayConstruction(200); //
                        gameName.style.left = "10%";
                  await delayConstruction(400); //
                        counterField.style.left = "10%";
                    activateGame();
                });
        });
}
gameStyleStructure();

