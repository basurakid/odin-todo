export {createMenuLayout};

const createMenuLayout = () => {
    if (!document.querySelector("#menu")) {

        const menu = document.createElement("div");
        menu.setAttribute("id", "menu");
    
        const body = document.querySelector("body");
        body.className = "";
        body.classList.add("menu-bg")
    
        const menusText = [
            [
                ["Starter:", "Plantain & Groundnut Soup – Creamy peanut soup with caramelized plantains."],
                ["Appetizer:", "Jerk Suya Skewers – Grilled beef skewers with jerk-suya spice."],
                ["Main Course:", "Bajan Snapper & Jollof Rice – Grilled snapper over fragrant jollof rice."],
                ["Dessert:", "Rum Malva Pudding – South African sponge soaked in Bajan rum sauce."],
                ["Drink Pairing:", "Hibiscus Sorrel Spritz – Floral, citrus-infused refresher."]
            ],
            [
                ["Starter:", "Callaloo & Egusi Dip – Creamy greens with crispy cassava chips."],
                ["Appetizer:", "Baobab-Tamarind Wings – Smoked wings with tangy-sweet glaze."],
                ["Main Course:", "Oxtail in Palm & Coconut Curry – Slow-braised, rich & aromatic."],
                ["Dessert:", "Plantain Beignets – Nutmeg-dusted fritters with spiced honey."],
                ["Drink Pairing:", "Ginger Baobab Rum Punch – Bold, zesty, and spiced."]
            ],
            [
                ["Starter:", "Coconut & Okra Soup – Silky, spiced, and aromatic."],
                ["Appetizer:", "Akara & Cou Cou Bites – Black-eyed pea fritters & cornmeal."],
                ["Main Course:", "Jackfruit & Sweet Potato Curry – Slow-simmered, rich & hearty."],
                ["Dessert:", "Grilled Pineapple with Hibiscus Syrup – Caramelized & citrusy."],
                ["Drink Pairing:", "Mango-Soursop Cooler – Tropical, smooth, and refreshing."]
            ],
        ]

        for (let i = 0; i < 3; i++) {
            const option = document.createElement("div");
            option.classList.add("card");
            const title = document.createElement("h2");
            title.textContent = `Option ${i+1}`;
            title.classList.add("drop-shadow");
            option.appendChild(title);
            const hr = document.createElement("hr");
            option.appendChild(hr);

            for (const course of menusText[i]){
                const courseH3 = document.createElement("h3");
                courseH3.textContent = course[0];
                option.appendChild(courseH3);
                const courseP = document.createElement("p");
                courseP.textContent = course [1];
                option.appendChild(courseP);
            }
            menu.appendChild(option);
        }

        const content = document.querySelector("#content");
        content.firstChild.remove();
        content.appendChild(menu);
        
        }
}