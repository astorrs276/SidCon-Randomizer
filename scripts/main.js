let factionList = [{text: "Caylion Plutocracy\n", color: "#48b24d"}, 
    {text: "Caylion Collaborative\n", color: "#48b24d"},
    {text: "Eni Et Ascendancy\n", color: "#3a57bd"},
    {text: "Eni Et Engineers\n", color: "#3a57bd"},
    {text: "Faderan Conclave\n", color: "#e8ca2e"},
    {text: "Society of Falling Light\n", color: "#e8ca2e"},
    {text: "Im'dril Nomads\n", color: "#508ade"},
    {text: "Grand Fleet\n", color: "#508ade"},
    {text: "Kjasjavikalimm Directorate\n", color: "#c01209"},
    {text: "Kjasjavikalimm Independent Nations\n", color: "#c01209"},
    {text: "Kt’Zr’Kt’Rtl Adhocracy\n", color: "#fb6635"},
    {text: "Kt’Zr’Kt’Rtl Technophiles\n", color: "#fb6635"},
    {text: "Unity\n", color: "#908f8b"},
    {text: "Deep Unity\n", color: "#908f8b"},
    {text: "Yengii Society\n", color: "#6d4d91"},
    {text: "Yengii Jii\n", color: "#6d4d91"},
    {text: "Zeth Anocracy\n", color: "#da5294"},
    {text: "Charity Syndicate\n", color: "#da5294"}];

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

            // Pick random factions
            if (action === "Randomize") {
                const factions = document.getElementById("factions-list");
                let remaining = [0, 1, 2, 3, 4, 5, 6, 7, 8];
                choices = [];
                for (let i = 0; i < count; i++) {
                    // Pick the faction itself
                    const choice = remaining.splice(Math.floor(Math.random() * (remaining.length)), 1);
                    // Pick base or alt
                    const choice2 = Math.floor(Math.random() * 2);
                    // Get from faction list
                    choices.push(choice[0] * 2 + choice2);
                }
                // Order factions alphabetically
                choices.sort((a, b) => a - b);
                factions.innerHTML = "";

                const header = document.createElement("span");
                header.textContent = "Factions:";
                header.style.display = "block";
                header.style.fontWeight = "bold";
                header.style.marginBottom = "-15px";
                factions.appendChild(header);
                factions.appendChild(document.createElement("br"));

                for (let i = 0; i < choices.length; i++) {
                    const span = document.createElement("span");
                    span.textContent = factionList[choices[i]].text;
                    span.style.color = factionList[choices[i]].color;
                    factions.appendChild(span);

                    if (i != choices.length - 1) {
                        factions.appendChild(document.createElement("br"));
                    }
                }
            }
        });
    });
});
