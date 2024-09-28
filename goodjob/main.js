const fs = require('fs');

function parseTime(timeStr) {
    const [time, period] = timeStr.split(/(?=[AP]M)/);
    let [hours, minutes] = time.split(':').map(Number);
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    return new Date(2000, 0, 1, hours, minutes);
}

function getAvailableTimes(busyTimes, startTime, endTime, interval) {
    const availableTimes = [];
    let currentTime = new Date(startTime);
    while (currentTime < endTime) {
        const isAvailable = busyTimes.every(bt => {
            const btStart = parseTime(bt[0]);
            const btEnd = parseTime(bt[1]);
            return currentTime < btStart || currentTime >= btEnd;
        });
        if (isAvailable) {
            availableTimes.push(currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));
        }
        currentTime.setMinutes(currentTime.getMinutes() + interval);
    }
    return availableTimes;
}

function getFullDayAvailability() {
    const times = [];
    const startTime = new Date(2000, 0, 1, 8, 0);
    const endTime = new Date(2000, 0, 1, 22, 0);
    while (startTime < endTime) {
        times.push(startTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));
        startTime.setMinutes(startTime.getMinutes() + 30);
    }
    return times;
}

function processAvailabilityFile(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const lines = fileContent.split('\n');
    const availability = {};
    let currentRoom = null;
    let currentDay = null;

    lines.forEach(line => {
        console.log(line)
        line = line.trim();
        if (!line) return;

        if (line.includes('Boca Raton') || line.includes('Jupiter')) {
            currentRoom = line.split(' ').pop();
            console.log(currentRoom)
            availability[currentRoom] = {};
        } else if (['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday','Saturday','Sunday'].includes(line)) {
            currentDay = line;
            if (!availability[currentRoom][currentDay]) {
                availability[currentRoom][currentDay] = [];
            }
        } else if (line.includes(' - ')) {
            const [start, end] = line.split(' - ');
            availability[currentRoom][currentDay].push([start.trim(), end.trim()]);
        }
    });

    return availability;
}

function updateRoomAvailability(jsonFilePath, availabilityFilePath, outputFilePath) {
    // Load JSON data
    const roomData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

    // Process availability file
    const availability = processAvailabilityFile(availabilityFilePath);

    // Update JSON data with availability information
    for (const [room, schedule] of Object.entries(availability)) {
        if (room in roomData) {
            if (!roomData[room].Availability) {
                roomData[room].Availability = {};
            }
            console.log(room);
            ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].forEach(day => {
                if (schedule[day] && schedule[day].length > 0) {
                    const startOfDay = parseTime('8:00AM');
                    const endOfDay = parseTime('10:00PM');
                    roomData[room].Availability[day] = getAvailableTimes(schedule[day], startOfDay, endOfDay, 30);
                } else {
                    // If the day doesn't exist in the schedule or has no busy times, mark it as fully available
                    roomData[room].Availability[day] = getFullDayAvailability();
                }
            });
        }
    }

    // Write updated data to output file
    fs.writeFileSync(outputFilePath, JSON.stringify(roomData, null, 2));
    console.log(`Updated JSON file has been created at ${outputFilePath}`);
}

// Usage
const jsonFilePath = '/home/amarnath/Projects/Schedulix/room_data.json';
const availabilityFilePath = '/home/amarnath/Projects/Schedulix/OrganizedFAURoomInfoFall2024.txt';
const outputFilePath = '/home/amarnath/Projects/Schedulix/updated_room_data.json';

updateRoomAvailability(jsonFilePath, availabilityFilePath, outputFilePath);