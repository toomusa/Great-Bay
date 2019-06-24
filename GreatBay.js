
var mysql = require("mysql");
var inquirer = require("inquirer");
var keys = require("./keys.js");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: keys.password,
    database: "foodbay_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connection ID is " + connection.threadId);
    connection.end();
});

const postItem = () => {
    inquierer.prompt([
        {
            type: "input",
            name: "food",
            message: "Enter food item: "
        },
        {
            type: "list",
            name: "cuisine",
            message: "Pick a cuisine: ",
            choices: ["American", "Chinese", "Italian", "Mexican", "Thai"]
        },
        {
            type: "boolean",
            name: "serveHot",
            message: "Is it served hot?"
        },
        {
            type: "list",
            name: "spiceLevel",
            message: "How spicy is it?",
            choices: [1,2,3,4,5]
        },
        {
            type: "number",
            name: "price",
            message: "How much does it cost?"
        }
    ])
};

const seeItems = () => {
    connection.query("SELECT * FROM foodbay_db", function (err, food){
        if (err) throw err;
        console.log(food);
        const itemOptions = [];
        for (let key in food) {
            itemOptions.push(`${food.id[key]}: ${food.name[key]} | Current Bid: ${food.price[key]}`);
        }
    })
}

const bidItem = () => {
    seeItems();
    makeSelection();   

}


const makeSelection = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "selection",
            message: "Which item would you like to bid on?",
            choices: [...itemOptions]
        },
        {
            type: "number",
            name: "bidPrice",
            message: "How much are you bidding on it?",
        }
    ]).then(function(err, response){
        if (err) throw err;
        console.log(`Item: ${response.selection}, New Bid: ${response.bidPrice}`);
    })
};