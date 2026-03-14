let factionList = ["Caylion Plutocracy\n", "Caylion Collaborative\n", 
    "Eni Et Ascendancy\n", "Eni Et Engineers\n", 
    "Faderan Conclave\n", "Society of Falling Light\n", 
    "Im'dril Nomads\n", "Grand Fleet\n", 
    "Kjasjavikalimm Directorate\n", "Kjasjavikalimm Independent Nations\n", 
    "Kt’Zr’Kt’Rtl Adhocracy\n", "Kt’Zr’Kt’Rtl Technophiles\n", 
    "Unity\n", "Deep Unity\n", 
    "Yengii Society\n", "Yengii Jii\n", 
    "Zeth Anocracy\n", "Charity Syndicate\n"]

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
                let output = "Factions:\n";
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
                for (choice of choices) {
                    output += factionList[choice];
                }
                factions.textContent = output.trim();
            }
        });
    });
});