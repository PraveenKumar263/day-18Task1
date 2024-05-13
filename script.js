//cache
const cache = {};

// Fetch data from api
async function fetchRandomCharacterData(house) {
    try {
        if(cache[house]!==undefined) {
            return cache[house];
        }
        else {
            const response = await fetch(`https://hp-api.onrender.com/api/characters/house/${house}`);
            const data = await response.json();
            cache[house] = data;
            return data;
        }
        
    } catch (error) {
        console.error('Error fetching character data:', error);
        return [];
    }
}

function clearContent() {
    row.innerHTML = '';
}

// Display characther cards
function displayCharacterCards(house) {
    clearContent();
    fetchRandomCharacterData(house).then(characters => {
        characters.forEach(character => {
            const col = createDivElement("col-md-6 col-lg-3");
            const card = createDivElement("card mt-2");

            const image = document.createElement("img");
            image.className = "card-img-top";
            image.setAttribute("src", character.image || "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/ERR0R_NO_IMAGE_FOUND.jpg/640px-ERR0R_NO_IMAGE_FOUND.jpg");
            image.style = "height: 280px";

            const card_body = createDivElement("card-body");
            const name = createDivElement("card-title");
            name.innerHTML = `<b>${character.name}</b>`;

            const details = createDivElement("card-text");
            details.innerHTML = `
                <p>Species: ${character.species}</p>
                <p>Gender: ${character.gender}</p>
                <p>House: ${character.house}</p>
                <p>Date of Birth: ${character.dateOfBirth}</p>
                <p>Wand: ${character.wand.wood} (${character.wand.length}" - ${character.wand.core})</p>
                <p>Patronus: ${character.patronus}</p>
                <p>Played by: ${character.actor}</p>
            `;

            card_body.append(name, details);
            card.append(image, card_body);
            col.appendChild(card);
            row.appendChild(col);
        });
        adjustCardHeights();
        toggleBackButtonVisibility(true);
    });
}

// To ensure card of similar height
function adjustCardHeights() {
    const rows = document.querySelectorAll('.row');
    rows.forEach(row => {
        const cards = row.querySelectorAll('.card');
        const maxCardHeight = Math.max(...Array.from(cards).map(card => card.scrollHeight));
        cards.forEach(card => {
            card.style.height = maxCardHeight + 'px';
        });
    });
}

// Create div element with class
function createDivElement(classname){
    let ele = document.createElement("div");
    ele.className = classname;
    return ele;
}

// Basic element setup
const container = createDivElement("container mt-2");
const row = createDivElement("row");
document.body.appendChild(container);
container.appendChild(row);

const hogwarts_houses = [
    {   
        name: "Gryffindor", 
        description: "Gryffindor is known for its bravery, courage, and determination.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Blason_Gryffondor.svg/640px-Blason_Gryffondor.svg.png" 
    },
    {   
        name: "Hufflepuff", 
        description: "Hufflepuff values hard work, patience, loyalty, and fair play.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Coat_of_arms_Hufflepuff.svg/640px-Coat_of_arms_Hufflepuff.svg.png" 
    },
    { 
        name: "Ravenclaw", 
        description: "Ravenclaw values intelligence, creativity, learning, and wit.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Blason_Serdaigle.svg/640px-Blason_Serdaigle.svg.png" 
    },
    { 
        name: "Slytherin",
        description: "Slytherin values ambition, cunning, leadership, and resourcefulness.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Blason_Serpentard.svg/640px-Blason_Serpentard.svg.png" 
    }
];

// Display hogwart houses
function renderHouseCards() {
    clearContent();
    hogwarts_houses.forEach(house => {
        const col = createDivElement("col-md-6 col-lg-3");
        const card = createDivElement("card mt-2");

        // img of house
        const house_img = document.createElement("img");
        house_img.className = "card-img-top";
        house_img.setAttribute("src", house.img);
        const card_body = createDivElement("card-body");

        // title of house
        const house_name = document.createElement('h5');
        house_name.className = 'card-title';
        house_name.textContent = house.name;

        // Descriptive text of house
        const house_description = document.createElement('p');
        house_description.className = 'card-text';
        house_description.textContent = house.description;

        // Buttons to enter house
        const show_members = document.createElement('button');
        show_members.setAttribute("type","button");
        show_members.className = "btn btn-primary mt-1";
        show_members.innerHTML = "Show Members";
        show_members.addEventListener("click", () => displayCharacterCards(house.name))
        card_body.append(house_name, house_description);
        card.append(house_img, card_body, show_members);
        col.appendChild(card);
        row.appendChild(col);
    });

    adjustCardHeights();
    toggleBackButtonVisibility(false);
}

// Toggle back button visibility
function toggleBackButtonVisibility(show) {
    if (show) {
        backButton.style.display = "block";
    } else {
        backButton.style.display = "none";
    }
}

// Back button
const backButton = document.createElement('button');
backButton.setAttribute("type","button");
backButton.className = "btn btn-secondary mt-3";
backButton.innerHTML = "Back";
backButton.addEventListener("click", renderHouseCards);
container.insertBefore(backButton, row);
toggleBackButtonVisibility(false);

// Display house cards 
renderHouseCards();