const Manager = require("./lib/Manager")
const Engineer = require("./lib/Engineer")
const Intern = require("./lib/Intern")
const {prompt} = require("inquirer")
const path = require("path")
const fs = require("fs")
let input = []
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html")

const render = require("./lib/htmlRenderer");

const createEmployee =  () => {
prompt([
    {
      type: 'input',
      name: 'name',
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
      name: 'id',
      message: 'input employees id'
    },
])
.then(({ name, role, email, id }) =>{
  if(role == 'Engineer') {
    prompt([
      {
        type: 'input',
        name: 'github',
        message: 'what is the engineers github'
      }
    ])
      .then(({ github }) => {
        input.push(new Engineer(name, email, id, github))
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
      input.push(new Intern(name, email, id, school))
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
        input.push(new Manager(name, email, id, officeNumber))
        askToContinue()
      })
  }
 




})

.catch(err => console.log(err))
}
const askToContinue = () => {
  prompt([
    {
      type: 'confirm',
      name: 'cont',
      message: 'do you want to continue',

    }
  ])
    .then(({ cont }) => {
      if (cont)  {
      createEmployee()
    }
    else {
quit()
    }
  })
.catch(err => console.log(err))
}
const quit = () => {
  console.log('Team Page Created')
  
  fs.writeFileSync(path.join(__dirname, 'output', 'team.html' ), render(input))
}
createEmployee()


