const fs = require('fs');
const path = require('path');

const inputFilePath = path.join(__dirname, 'updated_room_data.json');
const outputFilePath = path.join(__dirname, 'updated_room_data_no_mediasite.json');

// Read the JSON file
const jsonData = JSON.parse(fs.readFileSync(inputFilePath, 'utf8'));

// Remove the Mediasite attribute from each room
Object.keys(jsonData).forEach(room => {
    if (jsonData[room].hasOwnProperty('Mediasite')) {
        delete jsonData[room].Mediasite;
    }
});

// Write the updated JSON data to a different file
fs.writeFileSync(outputFilePath, JSON.stringify(jsonData, null, 2));
console.log('All instances of the Mediasite attribute have been removed and saved to updated_room_data_no_mediasite.json.');