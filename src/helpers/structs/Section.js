class Section {
    // Params: courseID, CRN, meetingTimes (day, startTime, endTime)
    constructor(courseID, CRN, meetingTimes) {
        this.courseID = courseID;
        this.CRN = CRN;
        this.meetingTimes = meetingTimes;
        // console.log(this.meetingTimes)
    }

    // This function will return the section's course ID
    getCourseID() {
        return this.courseID;
    }

    // This function will return the section's CRN
    getCRN() {
        return this.CRN;
    }

    // This function will return the section's meeting times
    getMeetingTimes() {
        return this.meetingTimes;
    }

    // This function will set the section's course ID
    setCourseID(courseID) {
        this.courseID = courseID;
    }

    // This function will set the section's CRN
    setCRN(CRN) {
        this.CRN = CRN;
    }

    // This function will set the section's meeting times
    setMeetingTimes(meetingTimes) {
        this.meetingTimes = meetingTimes;
    }

    // This function will check if this section conflicts with another section
    // Params: section (Section)
    // Returns: boolean
    conflictsWithSection(section) {
        // Check if the sections are the same
        if (this.CRN == section.getCRN()) {
            console.log(`DEBUG: ${this.CRN} == ${section.getCRN()}`);
            return false;
        }

        // Check for time conflicts using military time
        // Make to to match the day of the week
        // Use the hasMeetingTimeOnDay function to check if the section has a meeting time on a specific day
        for (let i = 0; i < this.meetingTimes.length; i++) {
            for (let j = 0; j < section.getMeetingTimes().length; j++) {
                // Check if the days match
                if (this.meetingTimes[i].day == section.getMeetingTimes()[j].day) {
                    // If fullday is true, then set the start time to 0:00 and the end time to 23:59
                    let thisStartTime = "00:00";
                    let thisEndTime = "00:00";
                    let sectionStartTime = section.getMeetingTimes()[j].startTime;
                    let sectionEndTime = section.getMeetingTimes()[j].endTime;

                    if (this.meetingTimes[i].fullDay) {
                        thisStartTime = "00:00";
                        thisEndTime = "23:59";
                    } else {
                        thisStartTime = this.meetingTimes[i].startTime;
                        thisEndTime = this.meetingTimes[i].endTime;
                    }
                    
                    // Parse both sets of times into integers
                    thisStartTime = parseInt(thisStartTime.replace(':', ''));
                    thisEndTime = parseInt(thisEndTime.replace(':', ''));
                    sectionStartTime = parseInt(sectionStartTime.replace(':', ''));
                    sectionEndTime = parseInt(sectionEndTime.replace(':', ''));

                    // Check if the times overlap
                    // Doesn't count if the excluded time ends at the same time the section starts
                    // or the excluded time starts at the same time the section ends
                    if (thisStartTime >= sectionStartTime && thisStartTime < sectionEndTime && thisEndTime != sectionStartTime) {
                        return true;
                    } else if (thisEndTime > sectionStartTime && thisEndTime <= sectionEndTime && thisStartTime != sectionEndTime) {
                        return true;
                    } else if (thisStartTime < sectionStartTime && thisEndTime > sectionEndTime) {
                        return true;
                    }

                    // console.log(`DEBUG: Section ${this.CRN} does not conflict with section ${section.getCRN()}`);
                }
            }
        }
        
    }

    // This function will check if this section conflicts with a given time frame
    // Params: day, startTime, endTime
    // Returns: boolean
    conflictsWithTime(day, startTime, endTime) {
        // Check for time conflicts using military time
        // Make to to match the day of the week
        // Use the hasMeetingTimeOnDay function to check if the section has a meeting time on a specific day
        for (let i = 0; i < this.meetingTimes.length; i++) {
            // Check if the days match
            if (this.meetingTimes[i].day == day) {
                // If fullday is true, then set the start time to 0:00 and the end time to 23:59
                let thisStartTime = "00:00";
                let thisEndTime = "00:00";

                if (this.meetingTimes[i].fullDay) {
                    thisStartTime = "00:00";
                    thisEndTime = "23:59";
                } else {
                    thisStartTime = this.meetingTimes[i].startTime;
                    thisEndTime = this.meetingTimes[i].endTime;
                }
                
                // Parse both sets of times into integers
                thisStartTime = parseInt(thisStartTime.replace(':', ''));
                thisEndTime = parseInt(thisEndTime.replace(':', ''));
                startTime = parseInt(startTime.replace(':', ''));
                endTime = parseInt(endTime.replace(':', ''));

                // Check if the times overlap
                // Doesn't count if the excluded time ends at the same time the section starts
                // or the excluded time starts at the same time the section ends
                if (thisStartTime >= startTime && thisStartTime < endTime && thisEndTime != startTime) {
                    return true;
                } else if (thisEndTime > startTime && thisEndTime <= endTime && thisStartTime != endTime) {
                    return true;
                } else if (thisStartTime < startTime && thisEndTime > endTime) {
                    return true;
                }
            }
        }
    }


    // This function will check if this section has a meeting time on a specific day
    // Params: day (string)
    // Returns: boolean
    hasMeetingTimeOnDay(day) {
        for (let i = 0; i < this.meetingTimes.length; i++) {
            if (this.meetingTimes[i].day == day) {
                return true;
            }
        }

        return false;
    }

    // This function will return the section's JSON
    toJSON() {
        return {
            courseID: this.courseID,
            CRN: this.CRN,
            meetingTimes: this.meetingTimes
        }
    }

}

module.exports = Section;