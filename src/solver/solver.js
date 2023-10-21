// Importing the necessary modules
const fs = require('fs');
const path = require('path');

// This class is the main solver class. It will
// solve any university semester course schedule
// based on the data file with all the course
// information and the user's preferences

class Solver {
    // Constructor Params: dataJSON (String)
    // Check src/solver/README.md for more information on the data file
    constructor(dataJSON) {
        // Loading the data file's JSON into the class
        fs.readFile(path.join(__dirname, dataJSON), (err, data) => {
            if (err) throw err;
            this.data = JSON.parse(data);
        });


    }

    // This function will solve for all the possible schedules
    // based on the user's preferences and the data file.
    // It'll also rank the schedules based on the user's preferences
    // with the highest ranked schedule being the first element
    // in the array and the lowest ranked schedule being the last.

    // Params: userPreferences (JSON)
    // Returns: Array of schedules (JSON)
    solve(userPreferences) {
        
    }

}

// Exporting the class
module.exports = Solver;