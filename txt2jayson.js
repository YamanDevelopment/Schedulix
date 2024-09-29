const fs = require('fs');

function processAvailabilityFile(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const lines = fileContent.split('\n');
    const availability = {};
    let currentRoom = null;
    let currentDay = null;
    let currentCampus = null;

    lines.forEach(line => {
        line = line.trim();
        if (!line) return;

        if (line.includes('Boca Raton') || line.includes('Jupiter')) {
            currentCampus = line.split(' ')[0];
            currentRoom = line.split(' ').pop();
            const floor = parseInt(currentRoom.charAt(2), 10); // Assuming room format is like GS103
            const building = currentRoom.slice(0, 2); // Assuming building prefix is the first two characters
            availability[currentRoom] = { campus: currentCampus, building: building, floor: floor, schedule: {} };
        } else if (['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].includes(line)) {
            currentDay = line;
            if (!availability[currentRoom].schedule[currentDay]) {
                availability[currentRoom].schedule[currentDay] = [];
            }
        } else if (line.includes(' - ')) {
            const [start, end] = line.split(' - ');
            availability[currentRoom].schedule[currentDay].push({ start: start.trim(), end: end.trim() });
        }
    });

    return availability;
}

const filePath = '/home/amarnath/Projects/Schedulix/OrganizedFAURoomInfoFall2024.txt';
const availability = processAvailabilityFile(filePath);
const jsonOutput = JSON.stringify(availability, null, 2);

fs.writeFileSync('output.json', jsonOutput);
console.log('Converted data has been saved to output.json');