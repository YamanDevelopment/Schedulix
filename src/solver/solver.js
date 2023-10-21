// Importing the necessary modules
const fs = require('fs');
const path = require('path');

// Importing the necessary classes
const Course = require('../helpers/structs/Course.js');
// const Section = require('../helpers/structs/Section.js');

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
            const data = JSON.parse(data);

            // Have courses as an array of Course objects
            this.data = [];

            // Add the courses to the courses array
            for (let i = 0; i < data.courses.length; i++) {
                this.data.push(new Course(data.courses[i]));
            }
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
        // Look for courses that match the user's preferences
        let allCourses = [];
        for (let i = 0; i < userPreferences.courses.length; i++) {
            for (let j = 0; j < this.data.courses.length; j++) {
                // Check if the course matches the user's preferences
                if (userPreferences.courses[i] == this.data.courses[j].courseID) {
                    // Add the course to the courses array
                    allCourses.push(this.data.courses[j]);
                }
            }
        }

        // Match the student's desired courses with the available courses
        // Currently only possible to exclude times
        let possibleCourses = [];
        for (let i = 0; i < allCourses.length; i++) {
            
        }

    }


}

// Exporting the class
module.exports = Solver;