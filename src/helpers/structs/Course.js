const Section = require('./Section');

class Course {
	// This class will represent a course
	// Params: courseJSON (JSON)
	constructor(courseJSON) {
		// Loading the JSON into the class
		this.title = courseJSON.title;
		this.subject = courseJSON.subject;
		this.courseNumber = courseJSON.courseNumber;
		this.courseID = courseJSON.courseID;
		this.credits = courseJSON.credits;

		// Have sections as an array of Section objects
		this.sections = [];

		// Add the sections to the sections array
		for (let i = 0; i < courseJSON.courseSections.length; i++) {
			this.sections.push(new Section(courseJSON.courseID, courseJSON.courseSections[i].CRN, courseJSON.courseSections[i].meetingTimes));
		}
	}

	// This function will return the course's title
	getTitle() {
		return this.title;
	}

	// This function will return the course's subject
	getSubject() {
		return this.subject;
	}

	// This function will return the course's course number
	getCourseNumber() {
		return this.courseNumber;
	}

	// This function will return the course's course ID
	getCourseID() {
		return this.courseID;
	}

	// This function will return the course's credits
	getCredits() {
		return this.credits;
	}

	// This function will return the course's sections
	getSections() {
		return this.sections;
	}

	// This function will return the course's sections as a JSON
	getSectionsJSON() {
		const sectionsJSON = [];
		for (let i = 0; i < this.sections.length; i++) {
			sectionsJSON.push(this.sections[i].getJSON());
		}
		return sectionsJSON;
	}

	// This function will return the course's JSON
	getJSON() {
		return {
			title: this.title,
			subject: this.subject,
			courseNumber: this.courseNumber,
			courseID: this.courseID,
			credits: this.credits,
			sections: this.getSectionsJSON(),
		};
	}

	// This function will set the course's title
	setTitle(title) {
		this.title = title;
	}

	// This function will set the course's subject
	setSubject(subject) {
		this.subject = subject;
	}

	// This function will set the course's course number
	setCourseNumber(courseNumber) {
		this.courseNumber = courseNumber;
	}

	// This function will set the course's course ID
	setCourseID(courseID) {
		this.courseID = courseID;
	}

	// This function will set the course's credits
	setCredits(credits) {
		this.credits = credits;
	}

	// This function will set the course's sections
	setSections(sections) {
		this.sections = sections;
	}

	// This function will add a section to the course
	addSection(section) {
		this.sections.push(section);
	}
}

module.exports = Course;