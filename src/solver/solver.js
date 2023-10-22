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
        // =========> Steps 1-2

        // Look for courses that match the user's preferences
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

        // =========> Steps 3

        // Match the student's desired courses with the possible sections
        // Currently only possible to exclude times
        let possibleSections = [];
        for (let i = 0; i < allCourses.length; i++) {
            for (let j = 0; j < allCourses[i].getSections().length; j++) {
                // Check if the section doesn't have any excluded times (including overlapping times)
                let hasExcludedTimes = false;
                if (userPreferences.excludedTimes.length > 0) {
                    for (let k = 0; k < userPreferences.excludedTimes.length; k++) {
                        // Parse both sets of times into integers
                        let sectionStartTime = parseInt(allCourses[i].getSections()[j].getMeetingTimes().startTime.replace(':', ''));
                        let sectionEndTime = parseInt(allCourses[i].getSections()[j].getMeetingTimes().endTime.replace(':', ''));
                        let excludedStartTime = parseInt(userPreferences.excludedTimes[k].startTime.replace(':', ''));
                        let excludedEndTime = parseInt(userPreferences.excludedTimes[k].endTime.replace(':', ''));

                        // Check if the times overlap
                        // Doesn't count if the excluded time ends at the same time the section starts
                        // or the excluded time starts at the same time the section ends
                        if (sectionStartTime >= excludedStartTime && sectionStartTime < excludedEndTime && sectionEndTime != excludedStartTime) {
                            hasExcludedTimes = true;
                        } else if (sectionEndTime > excludedStartTime && sectionEndTime <= excludedEndTime && sectionStartTime != excludedEndTime) {
                            hasExcludedTimes = true;
                        } else if (sectionStartTime < excludedStartTime && sectionEndTime > excludedEndTime) {
                            hasExcludedTimes = true;
                        }
                    }
                }

                // Add the section to the possible sections array
                if (!hasExcludedTimes) {
                    possibleSections.push(allCourses[i].getSections()[j]);
                }
            }
        }

        // =========> Step 4-5
        let validSchedules = [];
        let possibleSchedules = [];
        function backtrack(possibleSections, selectedSections) {
            console.log("DEBUG: validSchedules: " + validSchedules)
            console.log("DEBUG: backtrack called")
            // If the list of possible sections is empty, add the schedule to the valid schedules array
            if (possibleSections.length === 0) {
                console.log("DEBUG: possibleSections is empty")
                const completedSchedule = new Schedule();
                for (let i = 0; i < selectedSections.length; i++) {
                    completedSchedule.addSection(selectedSections[i]);
                }
            }

            // For each section in the possible sections array
            for (let i = 0; i < possibleSections.length; i++) {
                console.log(`DEBUG: looping through possibleSections (${i}`)
                let section = possibleSections[i];
                let hasExcludedTimes = false;

                // Check if the section conflicts with any of the selected sections
                for (let j = 0; j < selectedSections.length; j++) {
                    let selectedSection = selectedSections[j];

                    if (section.conflictsWith(selectedSection)) {
                        hasExcludedTimes = true;
                        break;
                    }
                }

                // Check if the section conflicts with any of the excluded times (including overlapping times)
                if (!hasExcludedTimes) {
                    for (let j = 0; j < userPreferences.excludedTimes.length; j++) {
                        // Parse both sets of times into integers
                        let sectionStartTime = parseInt(section.getMeetingTimes().startTime.replace(':', ''));
                        let sectionEndTime = parseInt(section.getMeetingTimes().endTime.replace(':', ''));
                        let excludedStartTime = parseInt(userPreferences.excludedTimes[j].startTime.replace(':', ''));
                        let excludedEndTime = parseInt(userPreferences.excludedTimes[j].endTime.replace(':', ''));

                        // Check if the times overlap
                        // Doesn't count if the excluded time ends at the same time the section starts
                        // or the excluded time starts at the same time the section ends
                        if (sectionStartTime >= excludedStartTime && sectionStartTime < excludedEndTime && sectionEndTime != excludedStartTime) {
                            hasExcludedTimes = true;
                        } else if (sectionEndTime > excludedStartTime && sectionEndTime <= excludedEndTime && sectionStartTime != excludedEndTime) {
                            hasExcludedTimes = true;
                        } else if (sectionStartTime < excludedStartTime && sectionEndTime > excludedEndTime) {
                            hasExcludedTimes = true;
                        }
                    }
                }

                // Add the section to the selected sections array if it has no conflicts
                if (!hasExcludedTimes) {
                    let newPossibleSections = possibleSections.slice();
                    newPossibleSections.splice(i, 1);
                    let newSelectedSections = selectedSections.slice();
                    newSelectedSections.push(section);
                    possibleSchedules.push(newSelectedSections);
                    backtrack(newPossibleSections, newSelectedSections);
                }
            }
        }

        // Define the courses array and populate it with Course objects
        let courses = [];
        console.log(this.data.length)
        for (let i = 0; i < this.data.length; i++) {
            console.log(`DEBUG: looping through data (${i})`)
            courses.push(this.data[i]);
        }

        // Concatenate all sections from all courses into a single array
        let allSections = [];
        for (let i = 0; i < courses.length; i++) {
            console.log(`DEBUG: looping through courses (${i})`)
            allSections = allSections.concat(courses[i].sections);
        }

        // Step 5: Call the recursive function with the list of possible sections and an empty list of selected sections
        backtrack(allSections, []);

        // Step 6: Return the list of valid schedules
        return validSchedules;
    }
}

// Exporting the class
module.exports = Solver;