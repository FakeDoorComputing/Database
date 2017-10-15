// set variable 'db' as database
var db = window.openDatabase("food", 1.0, "food database", 1024 * 1024);
// create database table, if error, on success
db.transaction(createTable, error, success);

// create table
function createTable(tx) {
 	tx.executeSql("CREATE TABLE IF NOT EXISTS nutri(id INTEGER, title TEXT, weight TEXT, kcal TEXT, fat TEXT, carbs TEXT, sugar TEXT, salt TEXT)");
}

// if successful
function success() {
	db.transaction(addFood, error);
}

// populate fields
function addFood(tx) {
	tx.executeSql("INSERT INTO nutri(id, title, weight, kcal, fat, carbs, sugar, salt) VALUES (1, 'Mars Bar', '51g', '228', '8.5g', '35.3g', '30.5g', '0.21g')");
	tx.executeSql("INSERT INTO nutri(id, title, weight, kcal, fat, carbs, sugar, salt) VALUES (2, 'Galaxy Honeycomb', '22.8g', '125', '7.3g', '13.2g', '13.0g', '0.06g')");
	tx.executeSql("INSERT INTO nutri(id, title, weight, kcal, fat, carbs, sugar, salt) VALUES (3, 'Maltesers', '37g', '186', '9.1g', '22.8g', '19.1g', '0.17g')");
  tx.executeSql("INSERT INTO nutri(id, title, weight, kcal, fat, carbs, sugar, salt) VALUES (4, 'Fudge Minis', '100g', '455', '17g', '73g', '64g', '0.33g')");
  tx.executeSql("INSERT INTO nutri(id, title, weight, kcal, fat, carbs, sugar, salt) VALUES (5, 'Dairy Milk', '100g', '534', '30g', '57g', '56g', '0.24g')");
}

// if there is an error
function error(err) {
	alert("oops something went wrong " + err.message);
}

// read from tables
function choose(){
  db.transaction(readTable, error);
  function readTable(tx) {
    var choc=$("#choice").find(":selected").val();
    tx.executeSql("SELECT * FROM nutri WHERE id=?",[choc],function(tx, results){
        $("#data").text("Contains "+results.rows.item(0).kcal+" calories, "+results.rows.item(0).fat+" of fat, "+results.rows.item(0).carbs+" of carbohydrate (of which "+results.rows.item(0).sugar+" sugars), and "+results.rows.item(0).salt+" of salt, and weighs "+results.rows.item(0).weight);
    });
  };
};
