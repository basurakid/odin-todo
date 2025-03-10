const createHomeLayout = () => {
    if (!document.querySelector("#home")) {

    const home = document.createElement("div");
    home.setAttribute("id", "home");

    const body = document.querySelector("body");
    body.className = "";
    body.classList.add("home-bg")

    const signature = document.createElement("div");
    signature.classList.add("signature");
    home.appendChild(signature);

    const content = document.querySelector("#content");
    content.firstChild.remove();
    content.appendChild(home);
    
    }
    
}

export {createHomeLayout};