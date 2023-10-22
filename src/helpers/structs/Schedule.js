class Schedule {
    constructor() {
        this.sections = [];
    }

    addSection(section) {
        this.sections.push(section);
    }

    getSections() {
        return this.sections;
    }
}

module.exports = Schedule;