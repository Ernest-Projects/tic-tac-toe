document.addEventListener("DOMContentLoaded", (event)=> {
    event.preventDefault();
    const header = document.querySelector(".hed");
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
    
    setTimeout(()=> {
        header.addEventListener("animationend", ()=> {
            header.style.userSelect ="none";
            mainField.style.opacity ="1";
            setTimeout(()=> {
                mainField.classList.add("animation-main-field");
                mainField.addEventListener("animationend", ()=> {
                    mainField.classList.add("transform-main-field");
                    setTimeout(()=> {
                        mainField.style.left= "20%";
                        mainField.style.transform= "rotateY(-40deg) rotateX(10deg)";
                    });
                });
            },500);
        });
    },1000);

    setTimeout(()=> {

    mainField.addEventListener("mouseenter",()=> {
        mainField.style.transform = "rotate(0deg) scale(1.3)";
    });    
    mainField.addEventListener("mouseleave",()=> {
        mainField.style.transform = "";
        mainField.style.background = "";
    });  
    },2000);






    // mainField.style.left= "20%";
    // mainField.style.transform= "rotateY(-40deg) rotateX(10deg)";
    // mainField.style.opacity ="1";
});











    