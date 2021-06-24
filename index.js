// GIVEN a command-line application that accepts user input
// WHEN I am prompted for information about my application repository
// THEN a high-quality, professional README.md is generated with the title of my project and sections entitled Description, Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions
// WHEN I enter my project title
// THEN this is displayed as the title of the README
// WHEN I enter a description, installation instructions, usage information, contribution guidelines, and test instructions
// THEN this information is added to the sections of the README entitled Description, Installation, Usage, Contributing, and Tests
// WHEN I choose a license for my application from a list of options
// THEN a badge for that license is added near the top of the README and a notice is added to the section of the README entitled License that explains which license the application is covered under
// WHEN I enter my GitHub username
// THEN this is added to the section of the README entitled Questions, with a link to my GitHub profile
// WHEN I enter my email address
// THEN this is added to the section of the README entitled Questions, with instructions on how to reach me with additional questions
// WHEN I click on the links in the Table of Contents
// THEN I am taken to the corresponding section of the README

const fs = require('fs'); //file storage package
const inquirer = require('inquirer'); //inquirer package for prompts
//store question in array, this will be passed into prompt

let markDown;
const questions = [
    {
        name: 'Title',
        type: 'input',
        message: 'what is the name of your project'
    },
    {
        name: 'Description',
        type: 'input',
        message: 'Provide a description of your project'
    },
    {
        name: 'Installation',
        type: 'input',
        message: 'What are the steps required to install your project?'
    },
    {
        name: 'Usage',
        type: 'input',
        message: 'Provide instructions to use your application.'
    },
    {
        name: 'Test',
        type: 'input',
        message: 'Go the extra mile and write tests for your application. Then provide examples on how to run them here.'
    },
    {
        name: 'Contributing',
        type: 'input',
        message: 'Who contributed to this project?'
    },
    {
        name: 'Github',
        type: 'input',
        message: 'what is your github?'
    },
    {
        name: 'Email',
        type: 'input',
        message: 'What is your Email?'
    },
    {
        name: 'License',
        type: 'checkbox',
        message: 'License?',
        choices: ['MIT', 'Mozilla', 'Perl']
    },
];

inquirer.prompt(questions).then((answer) => {
    let licenseUrl;
    if (answer.License == 'Mozilla') {
        licenseUrl = '![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)';
    } else if (answer.License == 'Apache 2.0') {
        licenseUrl = '![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)';
    }
    else if (answer.License == 'MIT') {
        licenseUrl = '![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)';
    }
    else if (answer.License == 'Perl') {
        licenseUrl = '![License: Artistic-2.0](https://img.shields.io/badge/License-Perl-0298c3.svg)';
    } else {
        licenseUrl = '';
    }
    markDown = `
${licenseUrl}
## Title
${answer.Title}
## Table of Contents
[Title](#title)\n
[Description](#description)\n
[Installation](#installation)\n
[Usage](#usage)\n
[Test](#test)\n
[License](#license)\n
## Description
${answer.Description}
## Installation
${answer.Installation}
# Usage
${answer.Usage}
## Test
${answer.Test}
## Questions
if you have any additional questions, please contact me using the following links below:
Github: [https://github.com/${answer.Github}](https://github.com/${answer.Github})\n 
Email Adress: ${answer.Email} 
## License 
${answer.License}
`;
    fs.writeFile('./readMeStorage/README.md', markDown, (err) => {
        err ? console.error(err) : console.log('README file generated! Enjoy :)');
    })

})