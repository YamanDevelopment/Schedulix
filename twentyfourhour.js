const fs = require('fs');
const path = require('path');

const inputFilePath = path.join(__dirname, 'updated_room_data.json');
const outputFilePath = path.join(__dirname, 'updated_room_data_24hr.json');

// Function to convert 12-hour time to 24-hour time
function convertTo24Hour(time) {
    const [timePart, modifier] = time.split(/(AM|PM)/i);
    let [hours, minutes] = timePart.split(':').map(Number);

    if (modifier) {
        if (modifier.toUpperCase() === 'PM' && hours !== 12) {
            hours += 12;
        } else if (modifier.toUpperCase() === 'AM' && hours === 12) {
            hours = 0;
        }
    }

    // Ensure hours and minutes are defined
    if (isNaN(hours) || isNaN(minutes)) {
        throw new Error(`Invalid time format: ${time}`);
    }

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

// Function to check if a string is a valid 12-hour time format
function isValidTimeFormat(time) {
    return /^(0?[1-9]|1[0-2]):[0-5][0-9](AM|PM)$/i.test(time);
}

// Read the JSON file
const jsonData = JSON.parse(fs.readFileSync(inputFilePath, 'utf8'));

// Convert the time in the schedule to 24-hour format
Object.keys(jsonData).forEach(room => {
    if (jsonData[room].schedule) {
        Object.keys(jsonData[room].schedule).forEach(day => {
            jsonData[room].schedule[day].forEach(slot => {
                if (isValidTimeFormat(slot.start)) {
                    slot.start = convertTo24Hour(slot.start);
                } else {
                    console.warn(`Invalid start time format: ${slot.start}`);
                }
                if (isValidTimeFormat(slot.end)) {
                    slot.end = convertTo24Hour(slot.end);
                } else {
                    console.warn(`Invalid end time format: ${slot.end}`);
                }
            });
        });
    }
});

// Write the updated JSON data to a different file
fs.writeFileSync(outputFilePath, JSON.stringify(jsonData, null, 2));
console.log('Time has been converted to 24-hour format and saved to updated_room_data_24hr.json.');