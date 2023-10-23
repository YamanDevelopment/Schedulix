const Solver = require('./src/backend/solver');

const solver = new Solver('./data/data.json');

// User input module
const readline = require('readline');

// Color printing module
const colors = require('colors');
// import chalk from 'chalk';

// Wait 5 seconds for the data to load
setTimeout(() => {
    // let rl = readline.createInterface({
    //     input: process.stdin,
    //     output: process.stdout
    // });

    // let courseCount = 0;
    // rl.question('How many courses do you want to take? ', (numCourses) => {
    //     courseCount = parseInt(numCourses);
    //     rl.close();
    // });

    // let courses = [];
    // rl.question('Enter the courses you want to take (Example: "COP2200 CEN4010"): ', (courseString) => {
    //     courses = courseString.split(' ');
    //     rl.close();
    // });

    // let excludedTimes = [];
    // rl.question("Do you want to exclude any times? (y/n) ", (answer) => {
    //     if (answer === 'y') {
    //         let moreTimes = true;
    //         while (moreTimes) {
    //             rl.question('Enter a time you want to exclude (Example: "Monday 1:30-3:20"): ', (excludedTimesString) => {
    //                 excludedTimes = excludedTimesString.split(' ');
    //                 rl.close();
    //             });
    //         }
    //     }
    // });



    // console.log(solver.data.length);
    const solved = solver.solve(
        {
            "courses": [
                "COP3330",
                "COT3100",
                "COP2200"
            ],
            "excludedTimes": [
                {
                    "day": "Tuesday",
                    "fullDay": false,
                    "startTime": "1:30",
                    "endTime": "3:20"
                },
                {
                    "day": "Thursday",
                    "fullDay": false,
                    "startTime": "2:30",
                    "endTime": "4:20"
                }
            ]
        }
    );
    
    
    console.log(`${colors.bold(`Solved for ${colors.blue(solved.length)} schedules`)}`);
    // console.log(solved);

    // Pretty print the JSON
    // console.log(JSON.stringify(solved, null, 4));
    for (let i = 0; i < solved.length; i++) {
        console.log(colors.red("========================================="))
        console.log(colors.bold(`Schedule ${i + 1}:`));
        for (let j = 0; j < solved[i].length; j++) {
            console.log(colors.yellow(`\t${solved[i][j].courseID} - ${solved[i][j].CRN}`));
            for (let k = 0; k < solved[i][j].meetingTimes.length; k++) {
                console.log(colors.green(`\t\t${solved[i][j].meetingTimes[k].day} ${solved[i][j].meetingTimes[k].startTime} - ${solved[i][j].meetingTimes[k].endTime}`));
            }
        }
    }
}, 1000);

