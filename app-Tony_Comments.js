"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase(); //'Welcome' prompt at start of application
  let searchResults;
  switch(searchType){ //Switch Case 1
    case 'yes':
      searchResults = searchByName(people); //user types 'yes' to search by name.
      break;
    case 'no': //if user enters 'no' at "Do you know the name of the person...) prompt.
     let searchType = promptFor("Do you know the ID of the Person? Enter 'yes' or 'no'", yesNo).toLowerCase(); // If user doesn't know name, this prompt asks for the persons ID from data.
      switch(searchType) // Switch Case 2 : user enters 'yes' or 'no', this switch case narrows the person search further.
      {
        case 'yes': // 'yes' case if user knows the persons ID number. 
        searchResults=searchById1(people);// here the searchById1 function is called which searches through the data array's objects to find an ID match.
        break;
        case 'no': // 'no' case if user does not know the persons ID.
        let searchType = promptFor("Do you know any traits of the person? Enter 'yes' or 'no'", yesNo).toLowerCase(); // if user does not know ID then this prompt asks if user knows any traits of the person.
        switch (searchType)// Switch Case 3 to check for 'yes' or 'no' to traits question.
        {
          case 'yes': // if user inputs yes, they know some traits of the person. 
          searchResults=searchByTraits(people); // here the searchByTraits function is called based on 'yes' user input. 
          break;
          case 'no': //if user inputs no, then we further narrow the search criteria. 
          let searchType = promptFor("If the person has a spouse, do you know the spouses ID number? Enter 'yes' or 'no'", yesNo).toLowerCase();
          switch (searchType)// Switch Case 4 to see if user knows spouse ID of the person they are trying to identify.
          {
          case 'yes': // if user input yes, thats mean he knows the SpoiseID of person 
          searchResults=searchBySpouseId(people); //calls the searchBySpouseId function to search by the persons Spouse ID.
          break;
          case 'no': //if user inputs 'no', then we once again narrow the search. 
          let searchType = promptFor("Do you know Gender of Person? Enter 'yes' or 'no'", yesNo).toLowerCase(); //
          switch(searchType) //Switch Case 5 to check if user knows the persons gender or not. 
          {
            case 'yes':
            searchResults=searchByGender(people);
            break;
            case 'no':
            return; //as we dont have any other search criteria
            break;
            default:
            console.log("hye");
            app(people);// restart
            break;
          }
          break;
          default:
          app(people);
          break;
          }
          break;
          
          default:
          app(people);// restart
          break;
        }
        break;
        default:
        app(people); // restart app
         break;
      }
      // TODO: search by traits
      break;
      default:
    app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
 mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }
  if(person.length>1)
  {
  let displayOption = prompt("Found " + person.length + " records" + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");
  switch(displayOption){ 
    case "info": // if user select info 
    for(var i=0;i<person.length;i++)
    displayPersonInConsole(person[i]); // just call function that print general info about user 
    break;
    // TODO: get person's family
    case "family": // in case user enters family 
    for(var i=0;i<person.length;i++)
    {
    let familyInfo; //this variably will store family information 
    var parents= getParentsInfo(person[i],people); //helper function This function returns the parent information names of both the parents so this function returns an array of a person by searching from people or simply data
    if(parents.length==0) //if function returns nothing that means parenrs(array) will be empty and its length will be 0
    familyInfo = "Parents Info Not Available: " + "\n";  // in case of zero length it means parents info is not available so we will simply store the message
    else if(parents.length==1) //if function find just one parent that means parenrs(array) will contain only one parent name and its length will be 1
    familyInfo = "Parents Info Available: " + parents[0] + "\n"; //that one parent info will be stored in familyInfo variable  
    else if(parents.length==2) //if function find Both of the arents that means parenrs(array) will contain only both parents name and its length will be 2
    familyInfo = "Parents Info Available: " + parents[0] + " And " + parents[1] +"\n"; //both parent info will be stored in familyInfo variable
  // Family info contains both parents and spouse info now find spouse infp
    let spouse= searchById(person[i].currentSpouse,people); // searchById(id of spouse, people data) will be called this function a person on the base of id so we can find spouse of a person by passing spouse id to this function 
    if(spouse) // if function returns a spouse (this if condition is there as some of the person might not have a spouse)
    familyInfo += "Spouse Name: " + spouse.firstName + spouse.lastName + "\n"; // append first Name and lastName of spouse in family info variable 
    else
    familyInfo += "No spouse \n"; //if no spouse info is found simply append No spouse in variable
    console.log(familyInfo); //printing familt info
    }
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
  }
  //asking which info of persion user wants
  else
  {
  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){ 
    case "info": // if user select info 
    displayPerson(person); // just call function that print general info about user 
    break;
    // TODO: get person's family
    case "family": // in case user enters family 
    let familyInfo; //this variably will store family information 
    var parents= getParentsInfo(person,people); //helper function This function returns the parent information names of both the parents so this function returns an array of a person by searching from people or simply data
    if(parents.length==0) //if function returns nothing that means parenrs(array) will be empty and its length will be 0
    familyInfo = "Parents Info Not Available: " + "\n";  // in case of zero length it means parents info is not available so we will simply store the message
    else if(parents.length==1) //if function find just one parent that means parenrs(array) will contain only one parent name and its length will be 1
    familyInfo = "Parents Info Available: " + parents[0] + "\n"; //that one parent info will be stored in familyInfo variable  
    else if(parents.length==2) //if function find Both of the arents that means parenrs(array) will contain only both parents name and its length will be 2
    familyInfo = "Parents Info Available: " + parents[0] + " And " + parents[1] +"\n"; //both parent info will be stored in familyInfo variable
	// Family info contains both parents and spouse info now find spouse infp
    let spouse= searchById(person.currentSpouse,people); // searchById(id of spouse, people data) will be called this function a person on the base of id so we can find spouse of a person by passing spouse id to this function 
     if(spouse) // if function returns a spouse (this if condition is there as some of the person might not have a spouse)
    familyInfo += "Spouse Name: " + spouse.firstName + spouse.lastName + "\n"; // append first Name and lastName of spouse in family info variable 
    else
    familyInfo += "No spouse \n"; //if no spouse info is found simply append No spouse in variable
    alert(familyInfo); //printing familt info
    
    break;
    case "descendants":
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}
}
function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  let foundPerson = people.filter(function(person){
    if(person.firstName === firstName && person.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  console.log(foundPerson);
  // TODO: find the person using the name they entered
  return foundPerson;
}

function searchById1(people){ // returns an object by searching based on id
  let iD = promptFor("What is the persons ID number?", chars); // ask user to enter the id 
  iD=parseInt(iD); // convert the id in integer as promptFor returns a string 
  let foundPerson = people.find((person)=>person.id === iD) // find is an array search method in java script which search from the array and returns the object if it is there, here we are searching the whole data array on the base of id 

  return foundPerson; //return the serch result
}

function searchByTraits(people){ // returns an object by searching based on traits 
  let height = promptFor("What is the height of the person in total inches?", chars); //ask user to enter the height
  height= parseInt(height); // convert the height in integer as promptFor returns a string 
  let weight = promptFor("What is the weight of the person in pounds?", chars);//ask user to enter the weight
  weight =parseInt(weight);// convert the weight in integer as promptFor returns a string 
  let eyeColor = promptFor("What is the eye color of the person?", chars); //ask user to enter the eye color
  let occupation = promptFor("What is the persons occupation?", chars);//ask user to enter the occupation
  
  let foundPerson = people.find((person)=> person.height === height && person.weight === weight && person.eyeColor === eyeColor && person.occupation=== occupation) // find is an array search method in java script which search from the array and returns the object if it is there

  return foundPerson; //return found object
}
function searchBySpouseId(people){ // returns an object by searching based on spouseId
  let spouseiD = promptFor("What is the id of Persons spouseiD?", chars); //ask user for spouse Id
  iD=parseInt(iD); //Convert string to integer
  let foundPerson = people.find((person)=>person.currentSpouse === spouseiD) // find is an array search method in javascript which search from the array and returns the object if it is there
  return foundPerson; //return the result
}
function searchByGender(people){ // returns an object by searching based on spouseId
  let gender = promptFor("What is the gender of person?", chars); //ask user for gender
  var foundPersons = people.filter((person)=>person.gender === gender) // find is an array search method in javascript which search from the array and returns the object if it is there
  return foundPersons; //return the result
}
// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  //calculating age
  var tempStr=person.dob; // getint the date of birth 
  tempStr=tempStr.split("/"); // it will be string we'll convert that strint to array to find the age lets say date of birth is "12/01/1999" split method will convert this in to array of integer as ["12","01","1999"] means we have year of birth at second index
  var age=tempStr[2]; //get year of birth  
  age = parseInt(age); //convert it into integer 
  age = 2020-age; // minus date of birth with 2020 to get the current age
  personInfo += "Age: " + age + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

function displayPersonInConsole(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  //calculating age
  var tempStr=person.dob; // getint the date of birth 
  tempStr=tempStr.split("/"); // it will be string we'll convert that strint to array to find the age lets say date of birth is "12/01/1999" split method will convert this in to array of integer as ["12","01","1999"] means we have year of birth at second index
  var age=tempStr[2]; //get year of birth  
  age = parseInt(age); //convert it into integer 
  age = 2020-age; // minus date of birth with 2020 to get the current age
  personInfo += "Age: " + age + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  // TODO: finish getting the rest of the information to display
  console.log(personInfo);
}
// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}
function searchById(iD ,people)//helper function which returns the person by searching on the base of id from our data
{
  if(iD) 
  {
    let foundPerson = people.find((person)=>person.id === iD) //again there we are using find function to search a person based on od
    return foundPerson;
  }
  else
  {
     return null; //if person is not found just return null 
  }
}
function getParentsInfo(person,people) //this function returns name of parents
{
  var parentInfo=[]; // declare parents array
  if(person.parents.length>0) // we have array of parents in our data(people) as parents:[1123134,322312] against a particular person if that array is not empty that means we have parents id for that record its length will be greater than zero
    {
    if(person.parents.length==1) // if length is 1
    {
     var id1= person.parents[0]; // means we have information of only 1 parent against a record as parents:[1123134]
     var parent1= searchById(id1,people) // we will call our search by id function to return a record against a specific id for example parent id is 629807187 this will return Jack Pafoy object 
     var parent1Name= parent1.firstName + " " + parent1.lastName; // we will store the first + last name of parent 
     parentInfo.push(parent1Name); // we will add the parent name in array  
    }
    else if(person.parents.length==2) // if length is two means we have information of only both parents against a record as parents:[1123134,1213232]
    {//retrieve one parent inf
     var id1= person.parents[0];
     var parent1= searchById(id1,people)
     var parent1Name= parent1.firstName + " " + parent1.lastName;
     parentInfo.push(parent1Name);
     //retrieve second parent info
     var id2= person.parents[1];
     var parent2= searchById(id2,people)

     var parent2Name= parent2.firstName + " " + parent2.lastName;
     parentInfo.push(parent2Name);
    }
  }
  return parentInfo;//return the info
}


