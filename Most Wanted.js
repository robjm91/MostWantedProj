"use strict";

// Most Wanted User Stories
// 100 points
// Goal: You have been contracted to build a prototype for a person search for a top-secret government
// project. You have been given access to an array of objects representing individuals. The prototype
// should just use window.prompt and window.alert for the User Interface (UI). All results should be
// printed through the window.alert and window.prompt. Although this isn’t typical in production, you
// may use only two files for this project, an HTML file and a JS file for the application.
// Technologies: JavaScript
// User stories:
// (5 points): As a developer, I want to make consistent commits with good, descriptive messages.
// (5 points): As a developer, I want to run validation on any user input, ensuring that a user is reprompted when they provide invalid input. **DO THIS LAST**
// (10 points): As a user, I want to be able to search for someone based on a single criterion. (You should
// be able to find and return a list of people who match the search)            **search thing and returns people who match that***
// (20 points): As a user, I want to be able to search for someone based on 2-5 criteria. (I.e if you search
// for Gender: male and Eye Color: blue, you should get back a list of people who match the search)   ***don't ask every time***
// (15 points): As a user, I want to be able to look up someone’s information after I find them with the
// program (display values for the various traits of the found person).   
// (25 points): As a user, I want to be able look up someone’s descendants after I find them with the
// program (display the names of the descendants), using recursion.
// (20 points): As a user, I want to be able look up someone’s immediate family members after I find them
// with the program (display the names of the family members and their relation to the found person.
// (Parents, spouse, and siblings).       ***Make sure to show relation of that person: Mother, Brother***
//***************************************************** 
// search data base of people and display info about them
//Functionality first

