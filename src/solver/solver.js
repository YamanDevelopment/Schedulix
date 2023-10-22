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
        // =========> Steps 1-2

        // Look for courses that match the user's preferences
        let allCourses = [];
        for (let i = 0; i < userPreferences.courses.length; i++) {
            for (let j = 0; j < this.data.courses.length; j++) {
                // Check if the course matches the user's preferences
                if (userPreferences.courses[i] == this.data.courses[j].getCourseID()) {
                    // Add the course to the courses array
                    allCourses.push(this.data.courses[j]);
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
        function backtrack(possibleSections, selectedSections) {
            // If the list of possible sections is empty, add the schedule to the valid schedules array
            if (possibleSections.length === 0) {
                const completedSchedule = new Schedule();
                for (let i = 0; i < selectedSections.length; i++) {
                    completedSchedule.addSection(selectedSections[i]);
                }
            }

            // For each section in the possible sections array
            for (let i = 0; i < possibleSections.length; i++) {
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
                    selectedSections.push(section);
                    backtrack(possibleSections, selectedSections);
                    // selectedSections.pop();
                }
            }
        }
    }
}

// Exporting the class
module.exports = Solver;