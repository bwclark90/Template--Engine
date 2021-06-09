const Manager = require("./lib/Manager")
const Engineer = require("./lib/Engineer")
const Intern = require("./lib/Intern")
const {prompt} = require("inquirer")
const path = require("path")
const fs = require("fs")
const input = []
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html")

const render = require("./lib/htmlRenderer");

const createEmployee =  () => {
prompt([
    {
      type: 'input',
      name: 'name ',
      message: 'what is the name of the employee'
    },
    {
      type: 'list',
      name: 'role',
      message: 'what is the role of the employee',
      choices: ['Engineer', 'Manager', 'Intern']
    },
    {
      type: 'input',
      name: 'email',
      message: 'input employees email'
    },
    {
      type: 'input',
      name: 'id ',
      message: 'input employees id'
    },
])
.then(({ name, id, email, role }) =>{
  if(role == 'Engineer') {
    prompt([
      {
        type: 'input',
        name: 'github',
        message: 'what is the engineers github'
      }
    ])
      .then(({ github }) => {
        input.push(new Engineer(name, id, email, github))
        askToContinue()
      })
    }
  else if (role == 'Intern') { 
    prompt([
      {
        type: 'input',
        name: 'school',
        message: 'what school does the intern attend'
      }
    ])
    .then(({school}) =>{
      input.push(new Intern(name, id, email, school))
      askToContinue()
    })


  }
  else if(role == 'Manager') {
    prompt([
      {
        type: 'input',
        name: 'officeNumber',
        message: 'what is the managers office number'
      }
    ])
      .then(({ officeNumber }) => {
        input.push(new Manager(name, id, email, officeNumber))
        askToContinue()
      })
  }
 




})

.catch(err => console.log(err))
}
const askToContinue = () => {
  prompt([
    {
      type: 'list',
      name: 'message',
      message: 'do you want to continue',
      choices: ['yes', 'no']

    }
  ])
  .then(answers =>{
    if(answers.message == yes) {
      createEmployee()
    }
    else {
quit()
    }
  })
  
}
const quit = () => {
  console.log('goodbye')
  // render() 
}
createEmployee()

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)




// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
