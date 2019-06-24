
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

const createData = () => {
  console.log("adding a food");
  connection.query("INSERT INTO foods SET ?", 
  {
    food: response.food,
    cuisine: response.cuisine,
    serveHot: response.serveHot,
    spiceLevel: response.spiceLevel,
    price: response.price
  }, function(err) {
    if (err) throw err;
  });
  seeItems();
};

const updateData = () => {
  console.log("updating a bid");
  connection.query("SELECT * from foods where ?", 
  {id: response.selection}, function(err, res) {
    if (err) throw err;
    if (response.bidPrice > res.price) {
      connection.query("UPDATE foods SET ? where ?", 
      [{ price: response.bidPrice}, {id: response.selection}], function(err, data) {
        if (err) throw err;
        seeItems();
      });
    } else {
      seeItems();
    };
  });
};


// const deleteFood = () => {
//   console.log("Delete data");
//   connection.query("DELETE FROM ? WHERE ?"), 
// }

// * If the user selects "POST AN ITEM" they are prompted for an assortment of information regarding the item and then that information is added to the database so that others can bid on it

// * If the user selects "BID ON AN ITEM" they are shown a list of all available items and then are prompted to select what they would like to bid on. The console then asks them how much they would like to bid, and their bid is compared to the previous highest bid. If their bid is higher, inform the user of their success and replace the previous bid with the new one. If their bid is lower (or equal), inform the user of their failure and boot them back to the selection screen.

// * Once your group has put together the basic application, it's time to test your collective skills on some additional functionality, or "addons". Remember to take into consideration the amount of time you have been given when choosing what addons you would like to tackle.

// * Create a sign up and login system that prompts users for a username and password upon loading up the app. **Do not worry about setting up a truly secure database if you choose to tackle this addon. Just worry about building working sign up and login features.**

// * Create a system on the "POST AN ITEM" which allows users to look at the auctions they have created. On this screen they can add new auctions, modify previous auctions, or close bidding on an auction.

// * Create a system which allows users to view all of the auctions of which they are the leading bidder.

// * Create a third option on the main screen which allows administrators to modify the database as they see fit.

// * Create visually appealing tables. This means making dynamic console code and it is a lot harder than it might seem at first so do not think this one is so simple.

// * Create a search function that allows users to look through the database of available auctions to find those that share the specified keyword or username.

// * Get creative! There are a lot of addons to this app which you could create so feel free to work with your group to come up with something not listed above!
    
