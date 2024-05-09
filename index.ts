#! /usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';

//TodoItem Interface
interface todoItem{
    text: String;
    done : boolean;
}

//Todo List Array
const todolist : todoItem[] = [];

//Display Todo List Function:

function displayTodoList() {
    console.log(chalk.bold("\n--- Todo List ---"));
    todolist.forEach((item, index) =>{
        const status = item.done ? chalk.red('✘') : chalk.green('✔') ;
        console.log(`${index + 1}. [${status}] ${item.text}`)
    });
    console.log("------------------\n");
}

//Add Todo Function
function addTodo () {
    inquirer.prompt([
        {
            type: 'input',
            name: 'text',
            message: chalk.bold('Enter your todo:')
        }
    ]).then((answers) =>{
        const text = answers.text.trim();
        if (text !== ''){
            todolist.push({text: text, done:false});
            console.log(chalk.green(`"${text}" added to the todo list.`));
        }else{
            console.log(chalk.red("Please enter a valid todo item."));
        }
        displayTodoList();
        askAction();
    })
}


//Edit Todo Function
function editTodo () {
    
    inquirer.prompt([
        {
            type: 'input',
            name: 'index',
            message:chalk.bold('Enter index of todo you want to edit:'),
            validate : (value) =>{
                const parsedIndex = parseInt(value);
                if (isNaN(parsedIndex) || parsedIndex < 1 || parsedIndex > todolist.length){
                    return 'please enter a vlide index'
                }else{
                    return true;
                }
            }
        },
        {
            type: 'input',
            name: 'text',
            message:'Enter new text of you Todo'
        }
    ]).then((answers) =>{
        const index = parseInt(answers.index) -1;
        const text = answers.text.trim();

        if (text !== ''){
            todolist[index].text =text;
            console.log(chalk.yellow(`Todo item ${index + 1} updated.`));
        }else{
            console.log(chalk.red("Please enter a valid todo item."));
           
        }
        displayTodoList();
        askAction();
    });
}


//Delete Todo Function
function deleteTodo () {
    
    inquirer.prompt([
        {
            type: 'input',
            name: 'index',
            message: chalk.bold('Enter index of todo you want to Delete:'),
            validate : (value) =>{
                const parsedIndex = parseInt(value);
                if (isNaN(parsedIndex) || parsedIndex < 1 || parsedIndex > todolist.length){
                    return 'please enter a vlide index'
                }else{
                    return true;
                }
            }
        },
        {
            type: 'input',
            name: 'text',
            message:'Enter new text of you Todo'
        }
    ]).then((answers) =>{
        const index = parseInt(answers.index) -1;
        
        const deletedItem = todolist.splice(index, 1);
        
        console.log(chalk.red(`"${deletedItem[0].text}" deleted from the todo list.`));
        
        displayTodoList();
        askAction();
    });
}


function askAction (){
    inquirer .prompt([
        {
            type: 'list',
            name: 'action',
            message : chalk.bold('What would you like to do?'),
            choices : ['Add Todo', 'Edit Todo', 'Delete Todo', 'Show Todo List', 'Exit']
        }
    ]).then((answers)=>{
        const action = answers.action.toLowerCase()
        if(action === 'add todo'){
            addTodo();
        }else if (action === 'edit todo'){
            editTodo();
        }else if (action === 'delete todo'){
            deleteTodo();
        }else if (action === 'show todo list'){
            displayTodoList();
            askAction()
        }else if (action === 'exit'){
            console.log(chalk.blue("\nThank you for using Todo List CLI!"));
        }
    });
}

function startTodoList(){
    console.log(chalk.blue("Welcome to Todo List CLI!\n"));
    askAction();
}

startTodoList();