export {createAboutLayout};

const createAboutLayout = () => {
    if (!document.querySelector("#about")) {

        const about = document.createElement("div");
        about.setAttribute("id", "about");
    
        const body = document.querySelector("body");
        body.className = "";
        body.classList.add("about-bg")
    
        const aboutWrapper = document.createElement("div");
        aboutWrapper.classList.add("about-condor");

        const aboutText = document.createElement("div");
        aboutText.classList.add("text-condor");

        const textH2 = document.createElement("h2");
        textH2.classList.add("drop-shadow");
        textH2.textContent = "about condor";
        
        aboutText.appendChild(textH2);

        const textP1 = document.createElement("p");
        textP1.textContent = "Tontela Condor is a man of many talents, a visionary whose influence extends far beyond the football pitch. His passions reach deep into the worlds of design, culture, and, most notably, cuisine. He embarked on a new journey, blending the rich culinary traditions of Barbados and Africa into something entirely unique. His restaurant is not just a place to eat. It is a statement, a celebration of heritage, and a bridge between continents."
        const textP2 = document.createElement("p");
        textP2.textContent = "Beyond food and art, Condor has always been outspoken about the social and political issues affecting Black communities worldwide. His work is driven by a deep commitment to honoring African roots, preserving culture, and challenging the narratives that have long shaped the experiences of people of African descent."
        const textP3 = document.createElement("p");
        textP3.textContent = "Tontela Condor’s vision is clear: to create spaces where history, identity, and innovation come together, whether on the field, in the kitchen, or in the conversations that shape the future."

        aboutText.appendChild(textP1);
        aboutText.appendChild(textP2);
        aboutText.appendChild(textP3);

        const aboutImg = document.createElement("div");
        aboutImg.classList.add("img-condor");

        aboutWrapper.appendChild(aboutText);
        aboutWrapper.appendChild(aboutImg);

        about.appendChild(aboutWrapper);



        const content = document.querySelector("#content");
        content.firstChild.remove();
        content.appendChild(about);
        }
}