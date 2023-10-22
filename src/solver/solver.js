// Importing the necessary modules
const fs = require('fs');
const path = require('path');

// Importing the necessary classes
const Course = require('../helpers/structs/Course.js');
const Schedule = require("../helpers/structs/Schedule.js");
// const Section = require('../helpers/structs/Section.js');

// This class is the main solver class. It will
// solve any university semester course schedule
// based on the data file with all the course
// information and the user's preferences

class Solver {
    // Constructor Params: dataJSON (String)
    // Check src/solver/README.md for more information on the data file
    // constructor(dataJSON) {
    //     // Have courses as an array of Course objects
    //     this.data = [];

    //     // Loading the data file's JSON into the class
    //     fs.readFile(path.join(__dirname, dataJSON), (err, data) => {
    //         if (err) throw err;
    //         const jsonData = JSON.parse(data);

    //         // Add the courses to the courses array
    //         for (let i = 0; i < jsonData.courses.length; i++) {
    //             // console.log(jsonData.courses[i])
    //             this.data.push(new Course(jsonData.courses[i]));
    //         }

    //         // Code that depends on this.data should be placed here
    //         console.log(this.data.length);
    //     });
    // }
    constructor(dataJSON) {
        // Have courses as an array of Course objects
        this.data = [];

        // Loading the data file's JSON into the class
        const promise = new Promise((resolve, reject) => {
            fs.readFile(path.join(__dirname, dataJSON), (err, data) => {
                if (err) reject(err);
                const jsonData = JSON.parse(data);

                // Add the courses to the courses array
                for (let i = 0; i < jsonData.courses.length; i++) {
                    this.data.push(new Course(jsonData.courses[i]));
                }

                // Resolve the promise with the loaded data
                resolve(this.data);
            });
        });

        // Code that depends on this.data should be placed here
        promise.then((data) => {
            console.log(data.length);
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
        // =========> Steps 1-3

        // Look for courses that match the user's preferences
        // and make sure that the sections don't conflict with
        // the user's excluded times
        let allCourses = [];
        for (let i = 0; i < userPreferences.courses.length; i++) {
            for (let j = 0; j < this.data.length; j++) {
                // Check if the course matches the user's preferences
                if (userPreferences.courses[i] == this.data[j].getCourseID()) {
                    // Add the course to the courses array
                    allCourses.push(this.data[j]);
                }
            }
        }

        // Concatenate all sections from all courses into a single array
        let allSections = [];
        for (let i = 0; i < allCourses.length; i++) {
            // console.log(`DEBUG: looping through courses (${i})`)
            allSections = allSections.concat(allCourses[i].sections);
        }
        console.log(allSections)

        // Exclude sections that conflict with the user's excluded times
        let possibleSections = [];
        for (let i = 0; i < allSections.length; i++) {
            let conflicting = false;
            for (let j = 0; j < userPreferences.excludedTimes.length; j++) {
                // Check if the section has a meeting time on the day
                if (allSections[i].hasMeetingTimeOnDay(userPreferences.excludedTimes[j].day)) {
                    // If fullday is true, then set the start time to 0:00 and the end time to 23:59
                    let startTime = "00:00";
                    let endTime = "00:00";

                    if (userPreferences.excludedTimes[j].fullDay) {
                        startTime = "00:00";
                        endTime = "23:59";
                    } else {
                        startTime = userPreferences.excludedTimes[j].startTime;
                        endTime = userPreferences.excludedTimes[j].endTime;
                    }

                    // Parse the times into integers
                    startTime = parseInt(startTime.replace(':', ''));
                    endTime = parseInt(endTime.replace(':', ''));

                }
            }

            // If the section is not conflicting, then add it to the possible sections array
            if (!conflicting) possibleSections.push(allSections[i]);
        }

        // =========> Step 4: Generate all possible schedules
        let validSchedules = [];
        let possibleSchedules = [];

        // Define a recursive function that takes in a list of possible sections and a list of selected sections
        function backtrack(posSecs, selSecs) {
            // If the list of possible sections is empty, add the list of selected sections to the list of possible schedules and return
            if (posSecs.length === 0) {
                possibleSchedules.push(selSecs);
                return;
            }

            

            // For each section in the possible sections array
            for (let i = 0; i < posSecs.length; i++) {
                let section = posSecs[i];
                let newPossibleSections = posSecs.slice();
                newPossibleSections.splice(i, 1);
                let newSelectedSections = selSecs.slice();
                newSelectedSections.push(section);
                backtrack(newPossibleSections, newSelectedSections);
            }
        }

        // Call the recursive function with the list of possible sections and an empty list of selected sections
        backtrack(possibleSections, []);

        // Remove duplicate schedules from the possibleSchedules array
        let uniqueSchedules = [];
        for (let i = 0; i < possibleSchedules.length; i++) {
            let isDuplicate = false;
            for (let j = i + 1; j < possibleSchedules.length; j++) {
                if (possibleSchedules[i].length === possibleSchedules[j].length && possibleSchedules[i].every((section, index) => section === possibleSchedules[j][index])) {
                    isDuplicate = true;
                    break;
                }
            }
            if (!isDuplicate) {
                uniqueSchedules.push(possibleSchedules[i]);
            }
        }

        // Add the unique schedules to the validSchedules array
        for (let i = 0; i < uniqueSchedules.length; i++) {
            const completedSchedule = new Schedule();
            for (let j = 0; j < uniqueSchedules[i].length; j++) {
                completedSchedule.addSection(uniqueSchedules[i][j]);
            }
            validSchedules.push(completedSchedule);
        }

        // ==========> Step 6: Return the list of valid schedules
        console.log(validSchedules[1])
        return false;
    }
}

// Exporting the class
module.exports = Solver;