const fs = require('fs');

function parseTime(timeStr) {
    const [time, period] = timeStr.split(/(?=[AP]M)/);
    let [hours, minutes] = time.split(':').map(Number);
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    return new Date(2000, 0, 1, hours, minutes);
}


function processAvailabilityFile(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const lines = fileContent.split('\n');
    const schedule = {};
    let currentRoom = null;
    let currentDay = null;

    lines.forEach(line => {
        line = line.trim();
        if (!line) return;

        if (line.includes('Boca Raton') || line.includes('Jupiter')) {
            console.log(line)
            currentRoom = line.split(' ').pop();
            console.log("Current room being worked on: ", currentRoom)
            console.log(currentRoom)
            schedule[currentRoom] = {};
        } else if (['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday','Saturday','Sunday'].includes(line)) {
            currentDay = line;
            if (!schedule[currentRoom][currentDay]) {
                schedule[currentRoom][currentDay] = [];
            }
        } else if (line.includes(' - ')) {
            const [start, end] = line.split(' - ');
            schedule[currentRoom][currentDay].push({start: start.trim(), end: end.trim()});
        }
    });
    console.log(schedule)
    return schedule;
}

function updateRoomAvailability(jsonFilePath, availabilityFilePath, outputFilePath) {
    // Load JSON data
    const roomData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

    // Process availability file
    const availability = processAvailabilityFile(availabilityFilePath);

    // Update JSON data with availability information
    for (const [room, schedule] of Object.entries(availability)) {
        if (room in roomData) {
            if (!roomData[room].schedule) {
                roomData[room].schedule = availability[room];
            }
            console.log(room);
        }
    }

    // Write updated data to output file
    fs.writeFileSync(outputFilePath, JSON.stringify(roomData, null, 2));
    console.log(`Updated JSON file has been created at ${outputFilePath}`);
}

// Usage
const jsonFilePath = 'C:/Users/pc/Schedulix/room_data.json';
const availabilityFilePath = 'C:/Users/pc/Schedulix/OrganizedFAURoomInfoFall2024.txt';
const outputFilePath = 'C:/Users/pc/Schedulix/updated_room_data.json';

updateRoomAvailability(jsonFilePath, availabilityFilePath, outputFilePath);