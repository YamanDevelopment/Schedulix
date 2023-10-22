# Algorithm

### 1. **Input:**

- **Desired Courses:** Courses the student wants to take.
- **Unavailable Times:** Days and hours when the student does not want to have classes.

### 2. **Data Preparation:**

- Organize the course data in a way that includes information about course timings and durations.
- Convert the user input (desired courses and unavailable times) into a format suitable for comparison with the course data.

### 3. **Constraint Modeling:**

- **Temporal Constraints:**
  - Ensure that the class timings don't overlap with the times the student is unavailable.
- **Course Constraints:**
  - Match the student's desired courses with the available courses.

### 4. **Backtracking Algorithm:**

Implement a backtracking algorithm to explore all possible combinations of schedules based on the constraints:

- **Variables:** Each variable represents a course the student can take.
- **Domain:** For each variable, the domain represents all possible time slots the course can be scheduled in.
- **Constraints:** Apply the temporal constraints and course constraints during the search process.

### 5. **Backtracking Steps:**

- **Base Case:**
  - If all courses are scheduled and constraints are met, return the current schedule as a solution.
- **Recursive Step:**
  - Pick an unscheduled course variable.
  - Iterate through its possible time slots (domain values).
  - For each time slot, check if it satisfies temporal constraints.
  - If a valid slot is found, move to the next course variable recursively.
- **Backtrack:**
  - If no valid slot is found for a course variable, backtrack to the previous variable and try a different time slot.

### 6. **Output:**

Once all possible schedules have been explored, present the valid schedules to the user.

### Notes:

- Ensure the algorithm considers both course constraints and the unavailable times specified by the user.
- It's essential to handle cases where no valid schedule can be generated due to conflicting constraints.
- Validate the algorithm with various input scenarios to ensure correctness and efficiency.

This algorithm works similarly to the one described earlier, but with a focus on incorporating the user's specific course preferences and unavailable times. By following these steps, you can create a schedule solver that generates personalized schedules for students based on their desired courses and availability constraints.

# Expected Format of dataJSON

The `dataJSON` variable is expected to have the following format:

```
{
    "courses": [
        {
            "courseTitle": "Programming I",
            "subject": "COP",
            "subjectDescription": "Computer Science",
            "courseNumber": "2200",
            "courseID": "COP2200",
            "creditHours": 3,
            "courseSections": [
                {
                    "CRN": "123098",
                    "meetingTimes": [
                        {
                            "day": "Monday",
                            "startTime": "9:30",
                            "endTime": "10:20"
                        },
                        {
                            "day": "Wednesday",
                            "startTime": "9:30",
                            "endTime": "10:20"
                        }
                    ]
                },
                {
                    "CRN": "234891",
                    "meetingTimes": [
                        {
                            "day": "Monday",
                            "startTime": "10:30",
                            "endTime": "11:20"
                        },
                        {
                            "day": "Wednesday",
                            "startTime": "10:30",
                            "endTime": "11:20"
                        }
                    ]
                }
            ]
        },
        ...
    ]
}
```

The `dataJSON` variable is a JSON object that contains information about courses offered at an educational institution. The object has a `courses` property, which is an array of course objects. Each course object represents a course and contains the following properties:

- `courseTitle`: A string representing the title of the course.
- `subject`: A string representing the subject code of the course.
- `subjectDescription`: A string representing the description of the subject.
- `courseNumber`: A string representing the course number.
- `courseID`: A string representing the course ID, which is a combination of the subject code and course number.
- `creditHours`: An integer representing the number of credit hours for the course.
- `courseSections`: An array of section objects, each representing a section of the course.

Each section object contains the following properties:

- `CRN`: A string representing the Course Reference Number for the section.
- `meetingTimes`: An array of day objects, each representing a day of the week when the course meets.

Each day object contains the following properties:

- `day`: A string representing the day of the week when the course meets.
- `startTime`: A string representing the start time of the course on that day.
- `endTime`: A string representing the end time of the course on that day.

This format allows for easy organization and retrieval of course information, and can be used to build course schedules and other tools for students and faculty.


# Expected Format of userPreferences
```json
{
    courses: [
        "COP2200",
        "MAC2312",
        "ENC1102",
    ],
    excludedTimes: [
        {
            "day": "Monday",
            fullDay: false,
            "startTime": "9:30",
            "endTime": "10:20"
        },
        {
            "day": "Wednesday",
            "fullDay": true
        }
    ]
}
```

The `userPreferences` variable is a JSON object that contains information about a user's course preferences and excluded times. The object has two properties:

- `courses`: An array of strings representing the course codes for the user's preferred courses.
- `excludedTimes`: An array of day objects, each representing a day of the week when the user is unavailable.

Each day object contains the following properties:

- `day`: A string representing the day of the week when the user is unavailable.
- `fullDay`: A boolean indicating whether the user is unavailable for the entire day.
- `startTime`: A string representing the start time of the user's unavailable period on that day.
- `endTime`: A string representing the end time of the user's unavailable period on that day.

This format allows for easy organization and retrieval of user preferences and excluded times, and can be used to build scheduling tools that take into account the user's availability and course preferences.