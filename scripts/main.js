let factionList = [
    {text: "Caylion Plutocracy\n", color: "#48B24D"},
    {text: "Caylion Collaborative\n", color: "#48B24D"},
    {text: "Eni Et Ascendancy\n", color: "#3A57BD"},
    {text: "Eni Et Engineers\n", color: "#3A57BD"},
    {text: "Faderan Conclave\n", color: "#E8CA2E"},
    {text: "Society of Falling Light\n", color: "#E8CA2E"},
    {text: "Im'dril Nomads\n", color: "#508ADE"},
    {text: "Grand Fleet\n", color: "#508ADE"},
    {text: "Kjasjavikalimm Directorate\n", color: "#C01209"},
    {text: "Kjasjavikalimm Independent Nations\n", color: "#C01209"},
    {text: "Kt’Zr’Kt’Rtl Adhocracy\n", color: "#FB6635"},
    {text: "Kt’Zr’Kt’Rtl Technophiles\n", color: "#FB6635"},
    {text: "Unity\n", color: "#908F8B"},
    {text: "Deep Unity\n", color: "#908F8B"},
    {text: "Yengii Society\n", color: "#6D4D91"},
    {text: "Yengii Jii\n", color: "#6D4D91"},
    {text: "Zeth Anocracy\n", color: "#DA5294"},
    {text: "Charity Syndicate\n", color: "#DA5294"}
];

let factionIndeces = {
    "caylion": 0,
    "ee": 1,
    "faderan": 2,
    "imdril": 3,
    "kjas": 4,
    "kit": 5,
    "unity": 6,
    "yengii": 7,
    "zeth": 8
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("button").forEach(button => {
        button.addEventListener("click", e => {
            e.preventDefault();

            const action = button.value;
            const playerCountTracker = document.getElementById("player-count");
            let count = parseInt(playerCountTracker.textContent);

            // Add to player count
            if (action === "Add") {
                count += 1;
                if (count > 9) {
                    count = 9;
                }
                playerCountTracker.textContent = count;
            }

            // Subtract from player count
            if (action === "Subtract") {
                count -= 1;
                if (count < 4) {
                    count = 4;
                }
                playerCountTracker.textContent = count;
            }

            // Toggle advanced settings menu
            if (action == "Advanced") {
                const settings = document.querySelector(".advanced-settings");
                if (settings.style.display === "none") {
                    settings.style.display = "flex";
                } else {
                    settings.style.display = "none"; 
                }
            }

            // Pick random factions
            if (action === "Randomize") {
                const factions = document.getElementById("factions-list");
                let remaining = [0, 1, 2, 3, 4, 5, 6, 7, 8];
                let limits = {};
                let choices = [];

                factions.innerHTML = "";
                const header = document.createElement("span");
                header.textContent = "Factions:";
                header.style.display = "block";
                header.style.fontWeight = "bold";
                header.style.marginBottom = "-15px";
                factions.appendChild(header);
                factions.appendChild(document.createElement("br"));

                const test = document.getElementById("test");
                test.textContent = "";

                document.querySelectorAll('select').forEach(select => {
                    const name = select.name;
                    const value = select.value;
                    if (name.endsWith("-choice") && value === "exclude") {
                        const secondSelect = document.querySelector(`select[name="${name}2"]`);
                        if (secondSelect.value === "both") {
                            remaining = remaining.filter(item => item != factionIndeces[name.split("-")[0]]);
                        } else if (secondSelect.value === "base") {
                            limits[factionIndeces[name.split("-")[0]]] = 1;
                        } else {
                            limits[factionIndeces[name.split("-")[0]]] = 0;
                        }
                    }
                    if (name.endsWith("-choice") && value === "include") {
                        remaining = remaining.filter(item => item != factionIndeces[name.split("-")[0]]);
                        const secondSelect = document.querySelector(`select[name="${name}2"]`);
                        const choice = factionIndeces[name.split("-")[0]] * 2;
                        const choice2 = secondSelect.value === "random" ? Math.floor(Math.random() * 2) : secondSelect.value === "base" ? 0 : 1;
                        choices.push(choice + choice2);
                        count -= 1;
                    }
                });

                if (count < 0) {
                    const error = document.createElement("span");
                    error.textContent = "Error: too many factions included";
                    factions.appendChild(error);
                    return;
                }

                // alert(remaining)
                if (remaining.length < count - choices.length) {
                    const error = document.createElement("span");
                    error.textContent = "Error: too many factions excluded";
                    factions.appendChild(error);
                    return;
                }

                for (let i = 0; i < count; i++) {
                    // Pick the faction itself
                    const choice = remaining.splice(Math.floor(Math.random() * (remaining.length)), 1);
                    // Pick base or alt
                    const choice2 = choice in limits ? limits[choice] : Math.floor(Math.random() * 2);
                    // Get from faction list
                    choices.push(choice[0] * 2 + choice2);
                }
                // Order factions alphabetically
                choices.sort((a, b) => a - b);

                for (let i = 0; i < choices.length; i++) {
                    const span = document.createElement("span");
                    span.textContent = factionList[choices[i]].text;
                    span.style.color = factionList[choices[i]].color;
                    factions.appendChild(span);

                    if (i !== choices.length - 1) {
                        factions.appendChild(document.createElement("br"));
                    }
                }
            }
        });
    });
    document.querySelectorAll('select').forEach(select => {
        select.addEventListener('change', (event) => {
            const value = event.target.value;
            const name = event.target.name;
            if (name.endsWith("-choice")) {
                const secondSelect = document.querySelector(`select[name="${name}2"]`);
                if (secondSelect) {
                    secondSelect.disabled = !(value !== "random");
                }
                if (secondSelect.disabled == false) {
                    secondSelect.innerHTML = "";
                    if (value === "include") {
                        const random = document.createElement("option");
                        random.value = "random";
                        random.textContent = "Random";
                        secondSelect.appendChild(random);
                        const base = document.createElement("option");
                        base.value = "base";
                        base.textContent = "Base";
                        secondSelect.appendChild(base);
                        const alt = document.createElement("option");
                        alt.value = "alt";
                        alt.textContent = "Alt";
                        secondSelect.appendChild(alt);
                    }
                    if (value === "exclude") {
                        const both = document.createElement("option");
                        both.value = "both";
                        both.textContent = "Both";
                        secondSelect.appendChild(both);
                        const base = document.createElement("option");
                        base.value = "base";
                        base.textContent = "Base";
                        secondSelect.appendChild(base);
                        const alt = document.createElement("option");
                        alt.value = "alt";
                        alt.textContent = "Alt";
                        secondSelect.appendChild(alt);
                    }
                }
            }
        });
    });
});
