const Solver = require('./src/solver/solver');

const solver = new Solver('./data/data.json');

// Wait 5 seconds for the data to load
setTimeout(() => {
    // console.log(solver.data.length);
    const solved = solver.solve(
        {
            "courses": [
                "COP2200",
                "COT4501"
            ],
            "excludedTimes": [
                {
                    "day": "Monday",
                    "fullDay": false,
                    "startTime": "9:30",
                    "endTime": "11:20"
                },
                {
                    "day": "Wednesday",
                    "fullDay": true
                }
            ]
        }
    )
    
    console.log(`Solved: ${solved}`);
}, 1000);

