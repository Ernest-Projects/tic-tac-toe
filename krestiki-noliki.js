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

squares.forEach((square, index) => {
    square.setAttribute("data-value", index % 2 === 0 ? "X" : "O");
});

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

const leftSide = document.createElement("div");
const rightSide = document.createElement("div");

let Xcounter = 0;
let Ocounter = 0;
const fragment = document.createDocumentFragment();

function setCubicProperty(left, right, front) {
    const cubicProperty = {
        width: "160px",
        height: "160px",
        position: "relative",
        zIndex: "100",
        opacity: "0",
        transition: "all 0.3s ease-out",
        backgroundPosition: "contain",
        transform: "translateZ(188px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url('/image-project/krestiki-noliki.jpg')",
        boxShadow: "inset 0 0 20px 10px black",
        transformStyle: "preserve-3d",
        filter: ""
    };

    const cubicSideProperty = {
        position: "absolute",
        transition: "all 0.3s ease-out",
        transformStyle: "preserve-3d",
        width: "50%",
        height: "inherit",
        backgroundImage: "inherit",
        transform: "translateZ(-40px) rotateY(90deg)"
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
        filter: "blur(1rem)",
        transform: "scale(1)"
    });

    Object.assign(second.style, {
        filter: "blur(0rem)",
        transform: "scale(1.1)"
    });
}

function resetGame() {
    playField.innerHTML = "";

    if (animationIsEnd) {
        setPropertyForScore(secondVisual, firstVisual);
    }

    for (let i = 0; i < 9; i++) {
        const square = document.createElement("div");
        square.className = "square";
        playField.appendChild(square);
    }

    emptyFields = 9; 
    Ocounter = 0;
    Xcounter = 0;

    counterField.querySelector(".X-counter").textContent = "-0";
    counterField.querySelector(".O-counter").textContent = "0-";

    activateGame();
}

 async function activateGame() {
    playField.querySelectorAll(".square").forEach((element, index) => {
        let isClicked = false; 
        const cubic = document.createElement("div");
        cubic.className = `occupied-square cubic playfield${index + 1}`;

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

            if (emptyFields % 2 == 0 || emptyFields == 0) {
                cubic.innerHTML = oToe.innerHTML;
                Ocounter++;
                setPropertyForScore(secondVisual, firstVisual);
            } else if (emptyFields % 2 != 0 || emptyFields != 0) {
                cubic.innerHTML = xToe.innerHTML;
                Xcounter++;
                setPropertyForScore(firstVisual, secondVisual);
            }
            cubic.appendChild(leftSide);
            cubic.appendChild(rightSide);

            await delayConstruction(200); //
            cubic.querySelector("p").style.opacity = "0";
                Object.assign(cubic.style, {
                    opacity: "1",
                    transform: "translateZ(58px)"
                });


                let stopDelay = delayConstruction(3700);

            updateAnimation();
            emptyFields--;

            if (element.querySelector(".X-counter")) {
                counterField.querySelector(".X-counter").textContent = `-${Xcounter}`;
            } else {
                counterField.querySelector(".O-counter").textContent = `${Ocounter}-`;
            }
            
            isClicked = true;

            await stopDelay; //

                if (emptyFields === 0) {
                    mainField.classList.add(".full-rotate"); 
                    resetGame(); 
                }  

        });
    });
}

function updateAnimation() {}

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
            header.style.userSelect = "none";
            mainField.style.opacity = "1";
    
            await delayConstruction(700); //

                mainField.classList.add("animation-main-field-forwards");
                mainField.addEventListener("animationend", async () => {
                    resetButton.style.opacity = "1";
                    mainField.classList.remove("animation-main-field-forwards");
                    mainField.classList.add("transform-main-field");
    
                    Object.assign(mainField.style, {
                        transform: "rotateY(-40deg) rotateX(10deg)",
                        left: "20%"
                    });
    
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
                                element.classList.add("hovering-for-square");
                            }
                        });
                    });
    
                    mainField.addEventListener("mouseleave", () => { 
                        animationIsEnd = false;
    
                        [firstVisual.style, secondVisual.style].forEach(style => {
                            Object.assign(style, {
                                filter: "blur(0rem)",
                                transform: "scale(1)"
                            });
                        });
    
                        Object.assign(mainField.style, {
                            transform: "rotateY(-40deg) rotateX(10deg)",
                            left: "20%"
                        });
    
                        document.body.style.boxShadow = "";
                        gameName.querySelector("p").classList.remove("bluring-for-main-hover");
                    });
    
                    Object.assign(gameName.style, {
                        opacity: "1",
                        top: "10%"
                    });
    
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

