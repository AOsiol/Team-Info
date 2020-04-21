// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("../lib/Employee");

//class Engineer is using Employee as a base to create a new constructor
class Engineer extends Employee {
  //you must first declare the constructor, and what attributes of the previos class you're using in this class.
  //if you are referencing attributes that were in the original calss that you are extending, you must declare super with those attributes before proceeding
  constructor(name, id, email, github) {
    //you are saying by using super that you are going to be using the name, id, email attributes that existed in the previous constructor
    super(name, id, email);
    //the below adds new attributes that were not in the previous constructor
    this.github = github;
  }
  //new functions get added after constructor, but still within the class declaration
  getGithub() {
    return this.github;
  }

  getRole() {
    return "Engineer";
  }
}

module.exports = Engineer;
