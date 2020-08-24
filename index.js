///////////////
//    UTIL
///////////////

//Capitalizes given string
function capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Gets the child of a parent
// If the child doesnt exist in the parent node, returns false
function getElementInsideContainer(containerID, childID) {
    var elm = document.getElementById(childID);
    var parent = elm ? elm.parentNode : {};
    return (parent.id && parent.id === containerID) ? elm : false;
}

////////////////////
//     WARNING
////////////////////

function updateWarning(){
    // Fetch colony list element and number of selected colonies
    var colony_list = document.getElementById("colony-list")
    var current_colonies = colony_list.querySelectorAll(".colony-container").length;

    // Update the style of the container depending if any of the colonies is selected
    colony_list.style.display = current_colonies == 0 ? "none" : "block";

    // Get the number of players playing
    var players = parseInt(document.getElementById("player-number").value);

    // Set the expected players value
    // Add the exception for company with additional colny
    var expected_colonies = 5;
    if(players != 2){
        expected_colonies = players + 2;
    }

    // Set warning if necessary
    var warning = document.getElementById("colony-warning")

    if (expected_colonies != current_colonies){
        
        warning.innerHTML = 
        `WARNING! Wrong number of colonies, ${expected_colonies} expected!`
        warning.style.display = 'block'
    }
    else{
        warning.style.display = 'none'
    }
}

//////////////////////
//    CHECKBOXES
//////////////////////


//Updates the list of colonies when a checkbox is clicked
function checkboxFunction(elem){

    //Gets colony
    var colony = getElementInsideContainer("colony-list", elem.value + '-icon');
    var div_list = document.getElementById("colony-list");

    if (elem.checked && colony == false){
        //Get colony name
        var colony_name = elem.value;
        // Add colony to the colony list
        div_list.innerHTML += 
        `
        <div class="colony-container" id="${colony_name}-icon" onclick="increaseColonyNumber(this)">
            <img src="resources/icons/colonies/${colony_name}.png" class="colony-icon">
            <input type="hidden" id="variable-number" value="0">
            <div class="colony-text">
                ${capitalize(colony_name)}<br>(0)
            </div>
        </div>
        `;
    } else if(!elem.checked && colony != false){
        // If enement is unchecked and colony exists remove it
        colony.remove();
    }

    // Updates warning
    updateWarning();
}

// Hides the given checkbox container
function hideCheckboxContainer(elem, checkbox_container){
    //Fetches the checkbox container
    var x = document.getElementById(checkbox_container);

    // Updates the style and button text
    if (x.style.display === "none") {
        x.style.display = "block";
        elem.value = "Hide";
    } else {
        x.style.display = "none";
        elem.value = "Show";
    }
} 


///////////////
//    DATE
///////////////

//Sets the default date
function setDefaultDate(){
    var today = new Date();
    const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: '2-digit', day: '2-digit' });
    const [{ value: month },,{ value: day },,{ value: year }] = dateTimeFormat .formatToParts(today);
    document.getElementById("datepicker").value = `${year}-${month}-${day}`;
}

setDefaultDate()

/////////////////////
//     PLAYERS
/////////////////////

//Generates player input fields
function generatePlayerInputs(){
    // Fetch number of players
    var number_of_players_input = document.getElementById("player-number");
    // Check and update the range
    if (number_of_players_input.value > 5)
        number_of_players_input.value = 5;
    else if (number_of_players_input.value < 1)
             number_of_players_input.value = 1;

    // Fetch number of players and player input list
    var players = number_of_players_input.value;
    var players_list = document.getElementById("player-list");
    
    // Create input fields
    players_list.innerHTML = 
    `
    <div class="player-input-div">
        <input list="datalist-players" class="player-input" id="player">
        <select class="player-input" id="player-colony-select" name="player-colony">
            <option value="Aridor/">Aridor</option>
            <option value="Arklight">Arklight</option>
            <option value="Beginner">Beginner</option>
            <option value="Cheung Shing Mars">Cheung Shing Mars</option>
            <option value="Credicor">Credicor</option>
            <option value="Ecoline">Ecoline</option>
            <option value="Helion">Helion</option>
            <option value="Interplaneraty Cinematics">Interplaneraty Cinematics</option>
            <option value="Inventrix">Inventrix</option>
            <option value="Mining Guild">Mining Guild</option>
            <option value="Phobolog">Phobolog</option>
            <option value="Point Luna">Point Luna</option>
            <option value="Polyphemos">Polyphemos</option>
            <option value="Poseidon">Poseidon</option>
            <option value="Robinson Industries">Robinson Industries</option>
            <option value="Saturn Systems">Saturn Systems</option>
            <option value="Stormcraft Incorporated">Stormcraft Incorporated</option>
            <option value="Teractor">Teractor</option>
            <option value="Tharsis Republic">Tharsis Republic</option>
            <option value="Thorgate">Thorgate</option>
            <option value="UNMI">UNMI</option>
            <option value="Valley Trust">Valley Trust</option>
            <option value="Vitor">Vitor<option>
        </select>
    </div>
    `.repeat(players);
    
    // Update warning
    updateWarning();

    // Set players input list to visible
    players_list.style.display = "block"
    document.getElementById("base-option-generate").style.display = "block";
}

generatePlayerInputs();

// Set the listener to listen to enter key presses
var number_of_players_input = document.getElementById("player-number");
number_of_players_input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("generate-player-inputs").click();
  }
}); 


// Adds default players to the datalist
// To be replaced with addPlayers()
function addDefaultPlayers(){
    document.getElementById("datalist-players").innerHTML = 
    `
        <option value="Dolores Frančišković">
        <option value="Vito Papa">
        <option value="Adi Čaušević">
        <option value="Mia Čaušević">
        <option value="Matteo Samsa">
        <option value="Jan Mastrović">
    `;
}

addDefaultPlayers();


// Loads players from database and adds them to the datalist
function addPlayers(){

}

//////////////////////
//     COLONIES
//////////////////////

// Activates colonies expansion
function activateColonies(elem){
    // Fetches the colonies option field
    var colony_options = document.getElementById("colonies-options");
    colony_options.style.display = elem.checked ? "block" : "none";
}

// Increases the colony counter text by one in modulo 4 arithmetic
function increaseColonyNumber(elem){
    // Gets the name of the colony
    var colony = elem.id.substring(0, elem.id.length - 5);

    // Gets the current number of colonies on a moon
    var current_colonies = elem.querySelector("#variable-number");
    current_colonies.value = (parseInt(current_colonies.value) + 1) % 4;

    // Gets the text div element of elem
    var text = elem.querySelector("div");
    text.innerHTML = `${capitalize(colony)}<br>(${current_colonies.value})`
}


//////////////////
//     TABLE
//////////////////

// Generates the point table for the scores
function generatePointTable(){
    // Gets the points div, points table and player list nodes
    var points_div = document.getElementById("points");
    var table = document.getElementById("points-table");
    var player_list = document.getElementById("player-list");

    // Fetches the names of the players
    player_names = Array.from(player_list.children).map(
        function(element) { return element.children[0].value; }
    );

    // Creates the name row for the table
    var name_row = 
    `<tr id="player-names">
        <td class="table-cell">Name</td>
        ${player_names.map(element => `<td class="table-cell">${element}</td>`).join("\n")}
    </tr>`;

    // Constant value for the score categories
    const categories = [
        ["TR", "tr-points"], 
        ["Awards", "award-points"], 
        ["Milestones", "milestone-points"], 
        ["Greenery", "greenery-points"], 
        ["Cities", "city-points"], 
        ["Cards", "card-points"]]

    // Creates the inputs for the scores
    var inputs = `<td class="table-cell"><input class="table-input" type="number"></td>`.repeat(player_names.length)
    var points = categories.map( option =>
    `<tr id="${option[1]}">
        <td class="table-cell">${option[0]}</td>
        ${inputs}
    </tr>
    `)

    // Creates the table and sets the style to visible
    table.innerHTML = name_row + points.join('\n');
    points_div.style.display = 'block'
}


//Commit

async function test(){

    const octokit = new Octokit({auth: 'd801d6512a1bda97bb7db0d15412549ee662d5eb'});

    const response = await octokit.request("PUT https://api.github.com/repos/tm-database/tm-database.github.io/contents/text1.txt", 
    {
      owner: "tm-database",
      repo: "tm-database.github.io",
      path: "text1.txt",
      message: "Ejla",
      content: "bXkgbmV3IGZpbGUgY29udGVudHM=",
    });
    return response;
}



console.log(test())