class Section {
    // Params: CRN, meetingTimes (day, startTime, endTime)
    constructor(CRN, meetingTimes) {
        this.CRN = CRN;
        this.meetingTimes = meetingTimes;
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

        // Check if the sections have any overlapping times
        // Parse both sets of times into integers
        let sectionStartTime = parseInt(this.meetingTimes.startTime.replace(':', ''));
        let sectionEndTime = parseInt(this.meetingTimes.endTime.replace(':', ''));
        let otherSectionStartTime = parseInt(section.getMeetingTimes().startTime.replace(':', ''));
        let otherSectionEndTime = parseInt(section.getMeetingTimes().endTime.replace(':', ''));

        // Check if the times overlap
        // Doesn't count if the excluded time ends at the same time the section starts
        // or the excluded time starts at the same time the section ends
        if (sectionStartTime >= otherSectionStartTime && sectionStartTime < otherSectionEndTime && sectionEndTime != otherSectionStartTime) {
            return true;
        } else if (sectionEndTime > otherSectionStartTime && sectionEndTime <= otherSectionEndTime && sectionStartTime != otherSectionEndTime) {
            return true;
        } else if (sectionStartTime < otherSectionStartTime && sectionEndTime > otherSectionEndTime) {
            return true;
        }

        // Return false if the sections don't conflict
        return false;
    }
}

module.exports = Section;