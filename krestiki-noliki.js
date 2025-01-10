const MAIN = document.querySelector(".game-window");

function delayConstruction(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let emptyFields = 9;
const playField = document.querySelector(".main-field");
const gameName = document.querySelector(".name");

for (let i = 0; i < emptyFields; i++) {
    const square = document.createElement("div");
    square.className = "square";
    playField.appendChild(square);
}

const squareCollection = playField.querySelectorAll(":scope > .square");
const squares = Array.from(playField.children);
let previousGames = {};
const header = document.querySelector(".hed");
let ultimatePointer = false;
const mainField = document.querySelector(".tic-tac-toe_3d_field");
const counterField = document.querySelector(".field-for-cubs");
const xToe = counterField.querySelector(".X-toe");
const oToe = counterField.querySelector(".O-toe");
const firstVisual = counterField.querySelector(".visual-toe:nth-child(1)");
const secondVisual = counterField.querySelector(".visual-toe:nth-child(2)");
let isXturn = true, isCalled = false, Xcounter = 0,  Ocounter = 0, squareCounter = 0, counter = 0,gameCounter = 1;
const message = document.createElement("p");
message.style.transform = "translateX(-100px)";
document.body.appendChild(message);

const resetWindow = document.querySelector(".reset-window");
const fragment = document.createDocumentFragment();
let logs = new Map();

function setCubicProperty(left, right, front) {
    const cubicProperty = {
        width: "160px",height: "160px",position: "relative",zIndex: "100",opacity: "0",transition: "all 0.3s ease-out",backgroundPosition: "contain",transform: "translateZ(188px)",display: "flex",justifyContent: "center",alignItems: "center",backgroundImage: "url('/image-project/krestiki-noliki.jpg')",boxShadow: "inset 0 0 20px 10px black",transformStyle: "preserve-3d",filter: ""
    };
    const cubicSideProperty = {
        position: "absolute",transition: "all 0.3s ease-out",transformStyle: "preserve-3d",width: "50%",height: "inherit",backgroundImage: "inherit",transform: "translateZ(-40px) rotateY(90deg)"
    };
    [left, right].forEach(side => Object.assign(side.style, cubicSideProperty));
    Object.assign(front.style, cubicProperty);
}

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function setPropertyForScore(first, second) {
    Object.assign(first.style, { filter: "blur(1rem)", transform: "scale(1)" });
    Object.assign(second.style, { filter: "blur(0rem)", transform: "scale(1.1)", boxShadow: "0 0 10px 1px black" });
}

async function showMessage(text = "") {
    message.style.transform = "translateX(-100px)";
    message.textContent = text;
    Object.assign(message.style, {
        position: "absolute",opacity: "1",color: "black",alignText: "center",transition: "all 0.3s ease-out",fontSize: "5rem",zIndex: "100",pointerEvents: "none"
    });
    await delayConstruction(200); //
    message.style.transform = "translateX(100px)";
    if (text === "Resetting") {
        for (let ina = 0; ina < 3; ina++) {
            await delayConstruction(60); //
            message.textContent += ".";
        }
    }
    await delayConstruction(900); //
    message.style.transform = "translateX(-100px)";
}

async function fullResetGame() {
    console.clear();
    [firstVisual.style, secondVisual.style].forEach(style => Object.assign(style, {
        filter: "blur(0rem)", transform: "scale(1)", boxShadow: "none"
    }));
    console.log(`%cNew game is started!`, "color: grey; font-style: italic");
    gameCounter = 1;
    await delayConstruction(300); //
    playField.innerHTML = "";
    playField.appendChild(gameName);
    isCalled = true;
    counter = 0;
    logs.clear();
    Object.keys(previousGames).forEach(key => delete previousGames[key]);
    for (let i = 0; i < 9; i++) {
        const square = document.createElement("div");
        square.className = "square";
        playField.appendChild(square);
    }
    emptyFields = 9; Ocounter = 0; Xcounter = 0; isXturn = true;
    activateGame();
    await delayConstruction(300); //
    counterField.querySelector(".X-counter").textContent = "-0";
    counterField.querySelector(".O-counter").textContent = "0-";
}

async function partialResetGame() {
    [firstVisual.style, secondVisual.style].forEach(style => {
        Object.assign(style, {filter: "blur(0rem)", transform: "scale(1)", boxShadow: "none"});
    });
    await delayConstruction(200); //
    playField.innerHTML = "";
    playField.appendChild(gameName);
    gameName.classList.add("vibrating-animation");
    logs.clear();
    for (let i = 0; i < 9; i++) {
        const square = document.createElement("div");
        square.className = "square";
        playField.appendChild(square);
    }
    isXturn = true;
    emptyFields = 9;
    squareCounter = 0;
    await delayConstruction(500); //
    for (child of playField.children) {
        child.classList.add("hovering-for-square");
    }
    activateGame();
    await delayConstruction(300); //
    showMessage();
}

function updateSquareStates(index, symbol) {
    logs.set(index, symbol);
    squareCounter++;
    let isfirst = true;
    console.group(`\n%cSquare States: (${squareCounter})`, "font-size: 1.5rem; ");
    for (const [key, value] of logs) {
        if (isfirst) {
            console.log(`\t%c=> %c{Square: ${key + 1}, Symbol: ${value}}`, "font-size: 1.2rem; color: rgb(188, 93, 195); ", "font-size: 1.2rem");
            isfirst = false;
            continue;
        }
        console.log(`\t%c=> %c{Square: ${key + 1}, Symbol: ${value}}`, "font-size: 1.2rem; color: rgb(188, 93, 195); ", "font-size: 1.2rem");
    }
    console.groupEnd();
}

function updateFieldState(fieldValue) {
    console.clear();
    console.group(`%cField States:`, "font-size: 1.5rem; ");
    console.log(`\t%cQuantity of empty squares: %c${fieldValue}`, "font-size: 1.2rem; ", "color:red; font-size: 1.2rem");
    console.groupEnd();
}

function updateAmimationStates(name, field) {
    let mainAnimations = field.getAnimations();
    mainAnimations.forEach(animation => {
        console.log(`${name} animation is ${animation.playState}`);
    });
}

async function saveGame(message, color) {
    console.clear();
    console.group("%cHistory of games:", "font-size: 3rem;");
    let quantity = 1;
    previousGames[counter] = new Map(logs);
    for (let game in previousGames) {
        console.log(`%c${(game == 0) ? "" : "\n\n"} Game ${parseInt(game) + 1}:`, "font-size: 2rem; ");
        console.log(`\t %cresult: ${message}`, "color:orange; font-size: 2rem; ");
        quantity = 1;
        for (let [index, symbol] of previousGames[game]) {
            console.log(`\t %cMove ${parseInt(quantity)}: { %cSquare: ${index + 1} %c=> %c${symbol} }`, `color: ${color}; font-size: 1.2rem`, "font-size: 1.2rem", "font-size: 1.2rem; color: grey", `color: ${color}; font-size: 1.2rem`);
            quantity++;
        }
    }
    counter++;
    logs.clear();
    console.groupEnd();
    MAIN.style.opacity = "0";
    await delayConstruction(1000); //
    MAIN.style.opacity = "1";
}
function setMoveSettings(element, variative, status) {
    element.innerHTML = variative.innerHTML; 
    isXturn = status;
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
            element.classList.remove("hovering-for-square");
            element.appendChild(cubic);
            if (isXturn) {
                Xcounter++;
                setMoveSettings(cubic,xToe, false);
                element.setAttribute("data-value", "X");

                setPropertyForScore(firstVisual, secondVisual);
            } else {
                Ocounter++;
                setMoveSettings(cubic,oToe, true);
                element.setAttribute("data-value", "O");
                setPropertyForScore(secondVisual, firstVisual);
            }
            updateFieldState(emptyFields - 1);
            updateSquareStates(index, element.getAttribute("data-value"));
            cubic.appendChild(leftSide); cubic.appendChild(rightSide);
            isClicked = true; emptyFields--;
            await delayConstruction(200); //
            cubic.querySelector("p").style.opacity = "0";
            Object.assign(cubic.style, {opacity: "1", transform: "translateZ(58px)"});
            let stopDelay = delayConstruction(2500); //
            if (element.querySelector(".X-counter")) {
                counterField.querySelector(".X-counter").textContent = `-${Xcounter}`;
            } else {
                counterField.querySelector(".O-counter").textContent = `${Ocounter}-`;
            }
            await stopDelay; //
            if (emptyFields === 0) {
                mainField.classList.add(".full-rotate");
                saveGame("draw", "orange");
                showMessage("draw!");
                partialResetGame();
                for (let element of playField.children) {
                    element.removeAttribute("data-value");
                }
            }
        });
    });
}

const resetButton = document.querySelector(".reset-button");

async function setOpacityValue(value) {
    Object.assign(MAIN.style, {opacity: `${value}`});
}

resetButton.addEventListener("click", async () => {
    if (Xcounter > 0) {
        setOpacityValue(0);
        showMessage("Resetting");
        await delayConstruction(1200); //
        setOpacityValue(1);
        showMessage();
    }
});
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
    header.addEventListener("animationend", async () => {
        updateAmimationStates("rotate", mainField);
        header.style.userSelect = "none";
        mainField.style.opacity = "1";
        await delayConstruction(700); //
        mainField.classList.add("animation-main-field-forwards");
        await delayConstruction(300); //
        gameName.style.opacity = "1";
        mainField.addEventListener("animationend", async () => {
            gameName.classList.add("vibrating-animation");
            resetButton.style.opacity = "1";
            mainField.classList.remove("animation-main-field-forwards");
            mainField.classList.add("transform-main-field");
            Object.assign(mainField.style, {transform: "rotateY(-40deg) rotateX(10deg)", left: "20%"});
            mainField.addEventListener("mouseenter", () => {
                if (isXturn) {
                    setPropertyForScore(secondVisual, firstVisual);
                } else {
                    setPropertyForScore(firstVisual, secondVisual);
                }
                mainField.style.transform = "rotate(0deg) scale(1.3)";
                Object.assign(mainField.style, {
                    transform: "rotate(0deg) scale(1.3)",
                    boxShadow: "0 0 20px 5px black"
                });
                document.body.style.boxShadow = "inset 0 0 100px 20px black";
                playField.querySelectorAll(".square").forEach((element) => {
                    if (element.children.length === 0 && element.textContent.trim() === "") {
                        element.classList.add("hovering-for-square");
                    }
                });
            });
            mainField.addEventListener("mouseleave", () => {
                [firstVisual.style, secondVisual.style].forEach(style => {
                    Object.assign(style, {
                        filter: "blur(0rem)", transform: "scale(1)", boxShadow: "none"
                    });
                });
                Object.assign(mainField.style, {
                    transform: "rotateY(-40deg) rotateX(10deg)", left: "20%"
                });
                [document.body.style, mainField.style].forEach((style) => {
                    Object.assign(style, {boxShadow: "none"});
                });
            });
            counterField.style.opacity = "1";
            await delayConstruction(200); //
            counterField.style.left = "5%";
            activateGame();
        });
    });
}
gameStyleStructure();
