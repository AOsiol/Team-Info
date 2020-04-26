const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const render = require("./lib/htmlRenderer");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const employees = [];

const introQuestion = [
  {
    type: "list",
    name: "intro",
    message: "What type of employee are you adding?",
    choices: ["Intern", "Manager", "Engineer"],
  },
];

const internQuestions = [
  {
    type: "input",
    name: "name",
    message: "What is your name?",
  },
  {
    type: "input",
    name: "id",
    message: "What is your id?",
  },
  {
    type: "input",
    name: "email",
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
    name: "name",
    message: "What is your name?",
  },
  {
    type: "input",
    name: "id",
    message: "What is your id?",
  },
  {
    type: "input",
    name: "email",
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
    name: "name",
    message: "What is your name?",
  },
  {
    type: "input",
    name: "id",
    message: "What is your id?",
  },
  {
    type: "input",
    name: "email",
    message: "What is your email?",
  },
  {
    type: "input",
    name: "github",
    message: "What is your GitHub username?",
  },
];

const finalQuestion = [
  {
    type: "confirm",
    name: "addMore",
    message: "Do you wish to add another employee?",
  },
];

function askQuestions() {
  inquirer.prompt(introQuestion).then((answers) => {
    console.log(answers);
    switch (answers.intro) {
      case "Engineer":
        inquirer.prompt(engineerQuestions).then(function (answers) {
          const engineer = new Engineer(
            answers.name,
            answers.id,
            answers.email,
            answers.github
          );
          employees.push(engineer);
          askFinal();
        });
        break;

      case "Manager":
        inquirer.prompt(managerQuestions).then(function (answers) {
          const manager = new Manager(
            answers.name,
            answers.id,
            answers.email,
            answers.officeNumber
          );
          employees.push(manager);
          askFinal();
        });
        break;

      case "Intern":
        inquirer.prompt(internQuestions).then(function (answers) {
          const intern = new Intern(
            answers.name,
            answers.id,
            answers.email,
            answers.school
          );
          employees.push(intern);
          askFinal();
        });
        break;

      default:
        console.log("You must select an answer");
    }
  });
}

function askFinal() {
  inquirer.prompt(finalQuestion).then(function (answers) {
    if (answers.addMore) {
      askQuestions();
    } else {
      buildTeam();
      console.log(
        "Thank you so much for your input! The output is in the 'output' folder!"
      );

      render(employees);
      return;
    }
  });
}

askQuestions();

function buildTeam() {
  fs.writeFile(outputPath, render(employees), (err) => {
    if (err) throw err;
    console.log("File Saved");
  });
}
