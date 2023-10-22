class Section {
    // Params: CRN, meetingTimes (day, startTime, endTime)
    constructor(CRN, meetingTimes) {
        this.CRN = CRN;
        this.meetingTimes = meetingTimes;
        // console.log(this.meetingTimes)
    }

    // This function will return the section's CRN
    getCRN() {
        return this.CRN;
    }

    // This function will return the section's meeting times
    getMeetingTimes() {
        return this.meetingTimes;
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
    conflictsWith(section) {
        // Check if the sections are the same
        if (this.CRN == section.getCRN()) {
            return false;
        }

        for (let i = 0; i < this.meetingTimes.length; i++) {
            for (let j = 0; j < section.getMeetingTimes().length; j++) {
                // Parse both sets of times into integers
                let thisStartTime = parseInt(this.meetingTimes[i].startTime.replace(':', ''));
                let thisEndTime = parseInt(this.meetingTimes[i].endTime.replace(':', ''));
                let otherStartTime = parseInt(section.getMeetingTimes()[j].startTime.replace(':', ''));
                let otherEndTime = parseInt(section.getMeetingTimes()[j].endTime.replace(':', ''));

                // Check if the times overlap
                // Doesn't count if the excluded time ends at the same time the section starts
                // or the excluded time starts at the same time the section ends
                if (thisStartTime >= otherStartTime && thisStartTime < otherEndTime && thisEndTime != otherStartTime) {
                    return true;
                } else if (thisEndTime > otherStartTime && thisEndTime <= otherEndTime && thisStartTime != otherEndTime) {
                    return true;
                } else if (thisStartTime < otherStartTime && thisEndTime > otherEndTime) {
                    return true;
                }
            }
        }
    }
}

module.exports = Section;