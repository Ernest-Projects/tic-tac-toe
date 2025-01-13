const MAIN = document.querySelector(".game-window");
const mainField = document.querySelector(".tic-tac-toe_3d_field");
const counterField = document.querySelector(".field-for-cubs");
const playField = document.querySelector(".main-field");

function delayConstruction(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let emptyFields = 9;

function createPlaySquares() {
    for (let i = 0; i < emptyFields; i++) {
        const square = document.createElement("div");
        square.className = "square";
        playField.appendChild(square);
    }
}
function createField() {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 4; i++) {
        const navElement = document.createElement("article");
        navElement.classList.add(`item${i + 1}`);
        fragment.appendChild(navElement);
    }
    mainField.appendChild(fragment);
}
function seeCurrentlyWidth() {
        const infoWindow = document.createElement("p");
        setStylesProperties([infoWindow],["position", "width", "height",  "left", "bottom", "fontSize", "margin"],
            ["absolute", "fit-content", "fit-content","0%", "0rem", "1.5rem", "1rem"]);
            infoWindow.textContent = `width: ${document.body.clientWidth}px, min: 1450px`;
            document.body.appendChild(infoWindow);
        window.addEventListener("resize", (event)=>{
        infoWindow.textContent = `width: ${document.body.clientWidth}px, min: 1450px`;
    });
}
function setAudioGame(link) {
    const audioElement = new Audio(link);
    audioElement.currentTime = 0;    
    audioElement.play();
    audioElement.volume = 0.1;
}
seeCurrentlyWidth();
createPlaySquares();
createField();

let previousGames = {}; let historyPrevious = {};
let isXturn = true, isCalled = false, Xcounter = 0,  Ocounter = 0, squareCounter = 0, counter = 0,gameCounter = 1;
let Xscore = 0, Oscore = 0;
let logs = new Map();

const audioElement = new Audio();

const squareCollection = playField.querySelectorAll(":scope > .square");
const header = document.querySelector(".hed");
const gameName = document.querySelector(".name");
const xToe = counterField.querySelector(".X-toe");
const oToe = counterField.querySelector(".O-toe");
const firstVisual = counterField.querySelector(".visual-toe:nth-child(1)");
const secondVisual = counterField.querySelector(".visual-toe:nth-child(2)");
const message = document.createElement("p");

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
function setStylesProperties(elements,styles, values) {
    elements.forEach((element) => {
        styles.forEach((style, index) => {
            element.style[style] = values[index];
        });
    });
}
async function setOpacityValue(name,value) {
    Object.assign(name.style, {opacity: `${value}`});
}
function setPropertyForScore(first, second) {
   
    setStylesProperties([first], 
        ["filter","transform"], ["blur(1rem)", "scale(1)"]);
     setStylesProperties([second], 
        ["filter","transform", "boxShadow"], ["blur(0rem)", "scale(1.1)","0 0 10px 1px black" ]);
}
async function showMessage(text = "") {
    setStylesProperties([message], 
        ["transform", "position", "opacity", "color", "alignText", "transition", "fontSize", "zIndex", "pointerEvents"],
    ["translateX(-100px)","absolute","1", "black","center","all 0.3s ease-out", "5rem", "100", "none" ]);
    
    message.textContent = text;
    document.body.appendChild(message);
   
    await delayConstruction(200); //
    setStylesProperties([message], 
        ["transform"], ["translateX(100px)"]);
    if (text === "Resetting") {
        for (let ina = 0; ina < 3; ina++) {
            await delayConstruction(60); //
            message.textContent += ".";
        }
    }
    await delayConstruction(900); //
    setStylesProperties([message], 
        ["transform"], ["translateX(-100px)"]);
    await delayConstruction(200); //
        setOpacityValue(message, 0);

}
async function fullResetGame() {
    console.clear();
    squareCounter = 0;
    setStylesProperties([firstVisual, secondVisual], 
        ["filter","transform", "boxShadow"], ["blur(0rem)", "scale(1)", "none"]);
    console.log(`%cNew game is started!`, "color: grey; font-style: italic");
    await delayConstruction(300); //
    playField.innerHTML = "";
    playField.appendChild(gameName);
    logs.clear();
    Object.keys(previousGames).forEach(key => delete previousGames[key]);
    for (let i = 0; i < 9; i++) {
        const square = document.createElement("div");
        square.className = "square";
        playField.appendChild(square);
    }
    gameCounter = 1; emptyFields = 9; counter = 0; Ocounter = 0; Xcounter = 0; isXturn = true; isCalled = true; Xscore = 0; Oscore = 0;
    activateGame();
    await delayConstruction(300); //
    counterField.querySelector(".X-counter").textContent = "-0";
    counterField.querySelector(".O-counter").textContent = "0-";
}
async function partialResetGame(result ="") {
    showMessage(result);
    setStylesProperties([firstVisual, secondVisual], 
        ["filter", "transform", "boxShadow"], ["blur(0rem)", "scale(1)", "none"])
    squareCollection.forEach(element => {
        element.classList.remove("hovering-for-square");
        element.removeAttribute("data-value");
    });
        await delayConstruction(200); //
        setAudioGame("./krestiki-noliki-sound/zapsplat_bells_bell_med_large_ring_designed_105573.mp3");
    playField.innerHTML = "";
    playField.appendChild(gameName);
    logs.clear();
    counterField.querySelector(".X-counter").textContent = `-${Xscore}`;
    counterField.querySelector(".O-counter").textContent = `${Oscore}-`;
    for (let i = 0; i < 9; i++) {
        const square = document.createElement("div");
        square.className = "square";
        playField.appendChild(square);
    }
    isXturn = true; emptyFields = 9; squareCounter = 0; Xcounter = 0; Ocounter = 0;
    await delayConstruction(400); //
    for (child of playField.children) {
        child.classList.add("hovering-for-square");
    }
    activateGame();
    await delayConstruction(250); //
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
    logs.set("result", message);
    logs.set("color", color);

    previousGames[counter] = new Map(logs);
    for (let game in previousGames) {
        console.log(`%c${(game == 0) ? "" : "\n\n"} Game ${parseInt(game) + 1}:`, "font-size: 2rem; ");
        console.log(`\t %cresult: ${previousGames[game].get("result")}`, `color:${previousGames[game].get("color")}; font-size: 2rem;`);
        
        const moves = Array.from(previousGames[game].entries());
        quantity = 1;

        for (let move = 0; move < moves.length - 2; move++) {
            const [index, symbol] = moves[move];
            console.log(`\t %cMove ${parseInt(quantity)}: { %cSquare: ${index + 1} %c=> %c${symbol} }`, `color: ${previousGames[game].get("color")}; font-size: 1.2rem`, "font-size: 1.2rem", "font-size: 1.2rem; color: grey", `color: ${previousGames[game].get("color")}; font-size: 1.2rem`);
            quantity++;
        }
    }

    counter++;
    logs.clear();
    console.groupEnd();
    setStylesProperties([MAIN], ["opacity"], ["0"]);
    await delayConstruction(800); //
    setStylesProperties([MAIN], ["opacity"], ["1"]);
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
        setStylesProperties([rightSide], ["right"], ["-25%"]);
        setStylesProperties([leftSide], ["left"], ["-25%"]);
        element.addEventListener("click", async () => {
            if (isClicked) return;
            setAudioGame("./krestiki-noliki-sound/zapsplat_foley_box_container_metal_small_industrial_pick_up_from_concrete_ground_light_scrape_002_52548.mp3");
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
            setOpacityValue(cubic.querySelector("p"), 0);
            Object.assign(cubic.style, {opacity: "1", transform: "translateZ(58px)"});
            let stopDelay = delayConstruction(2500); //

            if (emptyFields <= 6) {
                for(let combination of winningCombinations) {
                    let [a, b, c] = combination;
                    if (
                        ((squareCollection[a].getAttribute("data-value") ==
                        squareCollection[b].getAttribute("data-value")) && 
                        (squareCollection[b].getAttribute("data-value") ==
                        squareCollection[c].getAttribute("data-value"))) && squareCollection[a].getAttribute("data-value") != null && squareCollection[b].getAttribute("data-value") != undefined
                    ) {
                        if (squareCollection[a].getAttribute("data-value") === "X") {
                            Xscore++;
                            saveGame("X win", "green");
                            partialResetGame("X win!");
                            break;
                        }
                        else if (squareCollection[a].getAttribute("data-value") === "O") {
                            Oscore++;
                            saveGame("O win", "green");
                            partialResetGame("O win!");
                            break;
                        }
                }
            }
        }
            await stopDelay; //
            if (emptyFields === 0) {
                saveGame("Draw", "orange");
                partialResetGame("Draw!");
            }
        });
    });
}
const resetButton = document.querySelector(".reset-button");
resetButton.addEventListener("click", async () => {
    if (Xscore > 0 || Xcounter > 0) {
        setOpacityValue(MAIN, 0);
        showMessage("Resetting");
        await delayConstruction(1200); //
        setOpacityValue(MAIN, 1);
        showMessage();
    }
});
async function gameStyleStructure() {
    await delayConstruction(200); //
    header.classList.add("animation-head");
    await delayConstruction(1000); //
    header.addEventListener("animationend", async () => {
        updateAmimationStates("rotate", mainField);
        setStylesProperties([header], ["userSelect"], ["none"]);
        setOpacityValue(mainField, 1);
        await delayConstruction(700); //
        mainField.classList.add("animation-main-field-forwards");
        await delayConstruction(300); //
        setOpacityValue(gameName, 1);
        mainField.addEventListener("animationend", async () => {
        setOpacityValue(resetButton, 1);
            mainField.classList.remove("animation-main-field-forwards");
            mainField.classList.add("transform-main-field");
            setStylesProperties([mainField], ["transform","left"], ["rotateY(-40deg) rotateX(10deg)", "20%"]);
            mainField.addEventListener("mouseenter", () => {
                    setAudioGame("./krestiki-noliki-sound/zapsplat_foley_cupboard_door_wooden_creaky_slight_movement_005_106698.mp3");
                if (isXturn) {
                    setPropertyForScore(secondVisual, firstVisual);
                } else {
                    setPropertyForScore(firstVisual, secondVisual);
                }
                setStylesProperties([mainField], 
                    ["transform","boxShadow"], ["rotate(0deg) scale(1.3)", "0 0 20px 5px black"]);
                    document.body.style.boxShadow = "inset 0 0 100px 20px black";
                    playField.querySelectorAll(".square").forEach((element) => {
                        if (element.children.length === 0 && element.textContent.trim() === "") {
                            element.classList.add("hovering-for-square");
                        }
                });
            });
            mainField.addEventListener("mouseleave", () => {
                setAudioGame("./krestiki-noliki-sound/zapsplat_foley_cupboard_door_wooden_creaky_slight_movement_002_106695.mp3");
                setStylesProperties([firstVisual, secondVisual], 
                    ["filter","transform", "boxShadow"], ["blur(0rem)", "scale(1)", "none"]);
                    setStylesProperties([mainField], 
                        ["transform", "left"], ["rotateY(-40deg) rotateX(10deg)", "20%"]); 
                        setStylesProperties([document.body, mainField], 
                            ["boxShadow"], ["none"]); 
                        });
                        setOpacityValue(counterField, 1);
                        activateGame();
                        await delayConstruction(200); //
                        setStylesProperties([counterField], 
                            ["left",], ["5%"]); 
        });
    });
}
gameStyleStructure();
