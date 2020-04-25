const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs").promises;

const render = require("./lib/htmlRenderer");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

let employees = [];

const internQuestions = [
  {
    type: "input",
    name: "employeeName",
    message: "What is your name?",
  },
  {
    type: "input",
    name: "employeeId",
    message: "What is your id?",
  },
  {
    type: "input",
    name: "employeeEmail",
    message: "What is your email?",
  },
  {
    type: "input",
    name: "school",
    message: "What school are you attending?",
  },
];

const managerQuestions = [
  {
    type: "input",
    name: "employeeName",
    message: "What is your name?",
  },
  {
    type: "input",
    name: "employeeId",
    message: "What is your id?",
  },
  {
    type: "input",
    name: "employeeEmail",
    message: "What is your email?",
  },
  {
    type: "input",
    name: "officeNumber",
    message: "What is your office number?",
  },
];

const engineerQuestions = [
  {
    type: "input",
    name: "employeeName",
    message: "What is your name?",
  },
  {
    type: "input",
    name: "employeeId",
    message: "What is your id?",
  },
  {
    type: "input",
    name: "employeeEmail",
    message: "What is your email?",
  },
  {
    type: "input",
    name: "github",
    message: "What is your GitHub username?",
  },
];

const introQuestion = [
  {
    type: "checkbox",
    name: "intro",
    message: "what type of employee are you adding?",
    choices: ["Intern", "Manager", "Engineer"],
  },
];

const finalQuestion = [
  {
    type: "confirm",
    name: "addMore",
    message: "do you wish to add another employee?",
  },
];
console.log("you made it 1");
/*the series that you want is as follows:
FIRST ask the introQuestion
SECOND ask the question type relative to that employee type (this is where the if statement comes)
THIRD push those answers to a master array
FOURTH ask 
*/
function askQuestions() {
  inquirer.prompt(introQuestion).then((answers) => {
    switch (answers) {
      case answers.intro === "engineer":
        inquirer.prompt(engineerQuestions).then(function (answers) {
          const engineer = new Engineer(answers);
          employees.push(engineer);
          askFinal();
        });

        break;

      case answers.choices === "manager":
        inquirer.prompt(managerQuestions).then(function (answers) {
          const manager = new Manager(answers);
          employees.push(manager);
          askFinal();
        });

        break;

      case answers.choices === "intern":
        inquirer.prompt(internQuestions).then(function (answers) {
          const intern = new Intern(answers);
          employees.push(intern);
          askFinal();
        });
        break;

      default:
        console.log("you must select an answer");
    }
  });
}

function askFinal() {
  inquirer.prompt(finalQuestion).then(function (answers) {
    if (answers.addMore) {
      askQuestions();
    } else {
      console.log(
        "thank you so much for your input! the output is in the 'output' folder!"
      );
      render(employees);
      return;
    }
  });
}

// function createEngineer() {
//   inquirer
//     .prompt(employeeQuestions, engineerQuestions)
//     .then(function (engineerAnswers) {
//       console.log(engineerAnswers);
//       employees.push(engineerAnswers);
//       console.log(employees);
//     });
// }

askQuestions();
render(employees);
//function createManager() {}
//
//

// module.exports = response;
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
