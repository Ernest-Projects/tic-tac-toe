document.addEventListener("DOMContentLoaded", (event)=> {
    event.preventDefault();
    const header = document.querySelector(".hed");
    const gameName = document.querySelector(".name");
    let animationIsEnd = false;
    const mainField = document.querySelector(".tic-tac-toe_3d_field");
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 4; i++) {
        const navElement = document.createElement("article");
        navElement.classList.add(`item${i + 1}`);
        fragment.appendChild(navElement);
    }
    mainField.appendChild(fragment);
    setTimeout(()=>  {
        header.classList.add("animation-head");
    },200); 
    
    setTimeout(() => {
        header.addEventListener("animationend", () => {
            header.style.userSelect = "none";
            mainField.style.opacity = "1";
            
            setTimeout(() => {
                mainField.classList.add("animation-main-field-forwards");
                mainField.addEventListener("animationend", () => {
                    
                    mainField.classList.remove("animation-main-field-forwards");
                    mainField.style.left = "20%";
                    mainField.classList.add("transform-main-field");
                    mainField.style.transform = "rotateY(-40deg) rotateX(10deg)";
                    
                    mainField.addEventListener("mouseenter", () => {
                        animationIsEnd = true;
                        mainField.style.transform = "rotate(0deg) scale(1.3)";
                        document.body.style.boxShadow = "inset 0 0 100px 20px black";
                        gameName.querySelector("p").classList.add("bluring-for-main-hover");
                        
                        mainField.querySelectorAll("div").forEach(element => {
                            if (element.children.length === 0 && element.textContent.trim() === "") {
                                element.classList.add("hovering-for-square");
                            }
                        });
                    });
                    mainField.addEventListener("mouseleave", () => {
                        animationIsEnd = false;

                        mainField.style.transform = "";
                        mainField.style.background = "";
                        document.body.style.boxShadow = "";
                        gameName.querySelector("p").classList.remove("bluring-for-main-hover");

                        
                    });
                    gameName.style.opacity = "1";
                    gameName.style.left = "10%";
                    gameName.style.top = "10%";


                    
                    // logic of game
                    const cubicProperty = {
                        width:"160px",
                        height:"160px",
                        position: "relative",
                        zIndex: "100",
                        opacity: "0",
                        transition: "all 0.3s ease-out",
                        backgroundPosition: "contain",
                        transform:"translateZ(188px)",
                        display:"flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundImage:  "url('/image-project/krestiki-noliki.jpg')",
                        boxShadow: "inset 0 0 20px 10px black"
                                            

                    }
                    const cubicSideProperty = {
                        position: "absolute",
                        transition: "all 0.3s ease-out",
                        transformStyle:"preserve-3d",
                        width: "50%",
                        height: "inherit",
                        backgroundImage:"inherit",
                        transform: "translateZ(-40px) rotateY(90deg)"
                    }
                    
                    let emptyFields = mainField.children.length;

                const xToe = gameName.querySelector(".X-toe ");
                const oToe = gameName.querySelector(".O-toe ");

                    mainField.querySelectorAll(".square").forEach((element, index)=> {
                        element.style.transformStyle = "preserve-3d";
                        
                        const cubic = document.createElement("div");
                        cubic.style.transformStyle = "preserve-3d";
                        cubic.className = "occupied-square";
                        Object.assign(cubic.style, cubicProperty);

                        const leftSide = document.createElement("div");
                        leftSide.style.left = "-25%";
                        Object.assign(leftSide.style, cubicSideProperty);


                        const rightSide = document.createElement("div");
                        rightSide.style.right = "-25%";

                        Object.assign(rightSide.style, cubicSideProperty);




                        let isClicked = false;
                        element.addEventListener("click", ()=> {
                            element.classList.remove("hovering-for-square");
                                if (isClicked) return;
                                 element.appendChild(cubic);
                                
                                if(emptyFields % 2 == 0 || emptyFields == 0) {
                                    cubic.innerHTML = xToe.innerHTML;
                                    cubic.appendChild(leftSide);
                                    cubic.appendChild(rightSide);
                                }
                                else if (emptyFields % 2 != 0 || emptyFields != 0) {
                                    cubic.innerHTML = oToe.innerHTML;
                                    cubic.appendChild(leftSide);
                                    cubic.appendChild(rightSide);
                                }
                                setTimeout(()=> {
                                    cubic.style.opacity = "1";
                                    cubic.style.transform ="translateZ(58px)";
                                  
                                },200);
                               emptyFields--;
                                isClicked = true;
                            });
                    });

                        // кожному елементу назначити клас з відповідним номером для подальшого реалізування внесенння його в ігрове поле (square)

                        //  реалізувати логіку упорядкування Х та О.

                        // реалізувати комбінаці ходів.

                        // реалізувати кінець при перемозі чи нічиї та запропонувати заграти ще раз.

                
                
            }, 1700);
        });
        
        
        
    }, 1000);
    
});



});







    