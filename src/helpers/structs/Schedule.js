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

	// This function will check if the schedule is the same as another schedule
	// Params: schedule (Schedule)
	// Returns: boolean
	isSame(schedule) {
		// Check if the schedules have the same number of sections
		if (this.sections.length !== schedule.sections.length) {
			return false;
		}

		// Check if the schedules have the same sections
		// console.log(section)
		const sectionCRNs1 = this.sections.map(section => section.CRN);
		const sectionCRNs2 = schedule.sections.map(section => section.CRN);
		sectionCRNs1.sort();
		sectionCRNs2.sort();
		for (let i = 0; i < sectionCRNs1.length; i++) {
			if (sectionCRNs1[i] !== sectionCRNs2[i]) {
				return false;
			}
		}

		// The schedules are the same
		return true;
	}

	// This function will turn the schedule into a JSON
	// Returns: JSON
	toJSON() {
		return this.sections.map(section => section.toJSON());
	}
}

module.exports = Schedule;