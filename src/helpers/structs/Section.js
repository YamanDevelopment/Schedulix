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
}

module.exports = Section;