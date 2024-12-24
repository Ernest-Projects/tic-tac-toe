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
                        gameName.classList.add("bluring-for-main-hover");
                        
                        mainField.querySelectorAll("div").forEach(element => {
                            element.classList.add("hovering-for-square");
                        });
                    });
                    mainField.addEventListener("mouseleave", () => {
                        animationIsEnd = false;

                        mainField.style.transform = "";
                        mainField.style.background = "";
                        document.body.style.boxShadow = "";
                        gameName.classList.remove("bluring-for-main-hover");
                        
                    });
                    gameName.style.opacity = "1";
                    gameName.style.left = "10%";
                    gameName.style.top = "20%";
                    
                    // logic of game
                    const cubicProperty = {
                        position: "absolute",
                            width:"100px",
                                aspectRatio: "1/1",
                                    background: "red",
                                    left: "10%",
                                     top: "10%",
                                     zIndex: "100"

                    }
                    let counterOfquares = 0;
                    
                    while (counterOfquares < 9) {

                        const cubic = document.createElement("div");
                        Object.assign(cubic.style, cubicProperty);
                        body.appendChild(cubic);


                        // кожному елементу назначити клас з відповідним номером для подальшого реалізування внесенння його в ігрове поле (square)

                        //  реалізувати логіку упорядкування Х та О.

                        // реалізувати комбінаці ходів.

                        // реалізувати кінець при перемозі чи нічиї та запропонувати заграти ще раз.


                        if(mainField.querySelector("div")) {

                        }
                        
                        counterOfquares++;
                        
                    }
                    
                    
                    
                });
                
                
                
                
            }, 500);
        });
        
        
        
    }, 1000);
    
});











    