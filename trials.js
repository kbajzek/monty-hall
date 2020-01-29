let goat = 'goat';
let empty = 'empty';

// randomly chose number between 0 and 2 inclusive
function randomThree(){
    return Math.floor(Math.random() * 3);
}

// randomly chose number between 0 and 1 inclusive
function randomTwo(){
    return Math.floor(Math.random() * 2);
}

// populate one door randomly with goat
function placeGoatBehindDoor(doors){
    let chosenDoor = randomThree();
    doors[chosenDoor] = goat;
}

// check if the chosen door has a goat behind it
function checkChosenDoor(chosenDoor, doors){
    if(doors[chosenDoor] === goat){
        return true;
    }else{
        return false;
    }
}

// choose a door out of 3 available doors
function chooseDoor(){
    return randomThree();
}

// after choosing a door, returns an unchosen door that does not have a goat
// if both unchosen doors do not have a goat, returns one at random
function revealEmptyDoor(chosenDoor, doors){
    let unchosenDoors = [...doors];
    let doorNames = [0,1,2];

    // remove chosen door from pool of unchosen doors
    unchosenDoors.splice(chosenDoor,1);
    doorNames.splice(chosenDoor,1);

    // if both unchosen doors are empty, returns one at random
    if(!unchosenDoors.some(door => door === goat)){
        let doorToRevealEmpty = doorNames[randomTwo()];
        return doorToRevealEmpty;
    }
    // else, find the unchosen door that is empty and return it
    else{
        let doorNameIndex = unchosenDoors.findIndex(door => door === empty);
        let doorToRevealEmpty = doorNames[doorNameIndex];
        return doorToRevealEmpty;
    }
}

// returns the final door choice after switching doors when one of the unchosen doors are revealed as empty
function switchDoorChoice(firstChoice, revealedEmptyDoor){
    let doorNames = [0,1,2];
    let finalChoice = doorNames.filter(door => door !== firstChoice && door !== revealedEmptyDoor);
    return finalChoice[0];
}

// simulate choosing a door and not switching
function simulateNoChoiceSwitch(){

    // create 3 doors
    let threeDoors = [empty, empty, empty];

    // place a goat behind a door
    placeGoatBehindDoor(threeDoors);
    
    // choose a door out of the 3
    let firstChoice = chooseDoor();

    // reveal one of the unchosen doors to be empty
    let emptyDoor = revealEmptyDoor(firstChoice, threeDoors);

    // do not switch choice
    
    // check if choice is correct
    let correctlyGuessedGoat = checkChosenDoor(firstChoice, threeDoors);

    return correctlyGuessedGoat;
}

// simulate choosing a door and switching
function simulateChoiceSwitch(){

    // create 3 doors
    let threeDoors = [empty, empty, empty];

    // place a goat behind a door
    placeGoatBehindDoor(threeDoors);

    // choose a door out of the 3
    let firstChoice = chooseDoor();

    // reveal one of the unchosen doors to be empty
    let emptyDoor = revealEmptyDoor(firstChoice, threeDoors);
    
    // switch choice
    let finalChoice = switchDoorChoice(firstChoice, emptyDoor);

    // check if choice is correct
    let correctlyGuessedGoat = checkChosenDoor(finalChoice, threeDoors);

    return correctlyGuessedGoat;
}

function runSimulation() {
    let successfulSwitchRuns = 0;
    let successfulNoSwitchRuns = 0;

    console.log('Running 10,000 simulations of switching door choice...\n')

    for(let i = 0; i<10000; i++){
        if(simulateChoiceSwitch()){
            successfulSwitchRuns++;
        }
    }

    console.log(`Result: correctly guessed ${Math.round(successfulSwitchRuns/10000*100)}% of simulations (${successfulSwitchRuns}/10,000).\n\n`)

    console.log('Running 10,000 simulations of not switching door choice...\n')

    for(let i = 0; i<10000; i++){
        if(simulateNoChoiceSwitch()){
            successfulNoSwitchRuns++;
        }
    }

    console.log(`Result: correctly guessed ${Math.round(successfulNoSwitchRuns/10000*100)}% of simulations (${successfulNoSwitchRuns}/10,000).\n\n`)

}

runSimulation()

