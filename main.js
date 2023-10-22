const Solver = require('./src/solver/solver');

const solver = new Solver('./data/data.json');

// Wait 5 seconds for the data to load
setTimeout(() => {
    // console.log(solver.data.length);
    const solved = solver.solve(
    {
        "courses": [
            "COP4610",
            "COT4501"
        ],
        "excludedTimes": []
    }
    )
    
    console.log(`Solved: ${solved}`);
}, 1000);

