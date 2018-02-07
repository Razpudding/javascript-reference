/* jslint browser:true, devel:true, eqeq:true, plusplus:true, sloppy:true, vars: true, white:true, esversion:6 */
/*
*	This file holds useful code snippits
*/

/*
*	IIFE / OBJECT LITERAL / HOISTING / METHOD
*/
//Iife http://benalman.com/news/2010/11/immediately-invoked-function-expression/
(function(lib){
	console.log("This code is executed once when script is loaded, it's wrapped in its own scope");
	console.log("iife run with parameter: " + lib);
	var objectLiteral = {
		key: "value",
		init: function(){
			console.log("This code is executed when the init() function is called");
		},
		method(){
			//Alternative method notation (shorthand). Don't use arrow notation for methods!
			//https://rainsoft.io/when-not-to-use-arrow-functions-in-javascript/
		}
	};
	objectLiteral.init();
})(jQuery);	//you can pass libs or other things to the iife like this

//Because of variable hoisting, the jQuery var is already declared when the iife is run but hasnt been assigned with "$"
var jQuery = "$";	

///////////////////////////////////////////////////////////////////////////////////////////

/*
*	ES6 stuff
*/
{	//By wrapping your code in a code block in ES6, you're scoping it, thus removing it from the global scope

//const cant be reassigned and must be initialized upon declaration (so no "const;"")
const once = "this variable can be assigned only once";
//once = "twice" => Error: assignment to constant variable
//const once = "thrice" => Error: identifier has already been declared
const stableObject = {};
stableObject.newProperty = "constants are not immutible, thus their properties can be changed";

//lets are block scoped as opposed to vars which are function scoped
let i = 50;	//this is a different instance of i and thus does not break the loop.
for (let i = 0; i < 42; i++){	//here a new let i is created in a different scope
	console.log(i);
}
console.log("let outside for loop" + i);	//i is undefined

//Arrow notation is useful because shorthand AND it keeps the this of the scope intact!

//http://exploringjs.com/es6/ch_arrow-functions.html
const UiComponent = function() {
    const button = document.getElementById('myButton');
    button.addEventListener('click', () => {
        this.handleClick(); // means that handleClicks scope is not the button as it is with normal function notation, but the uicomponent
    });
};

//Promises are objects usually used for operations that may succeed or fail in the future
//Before they resolve or reject (AKA:settled or fulfilled) they are in an initial pending state
var prom = new Promise(function(resolve, reject){
    if(true){
    	setTimeout(function(){
        	resolve("Success!"); //Yay! Everything went well!
    	}, 250);
    }
    else {
    	reject("promise rejected because");
    }
    
  });
//as soon as the promise is resolved (not rejected), its then() is called
prom.then((result) => console.log(result));
//Uses Promise.all(listOfPromises)

//String literal
// for of
// ... notation
}
//console.log(once) => Error: once is not defined

/*
*	MAP / FILTER / REDUCE
*/
//map returns a copy with a certain manipulation applied to each element
var array = [1,3,6,9];
console.log(array.map( function(i) { return i + i; }));
console.log(array);	//hasn't been changed
console.log(array.map((i) => { return i + i; }).join()); //arrow notation example. '.' chaining is also supported in the regular form
console.log(array.map((i) => i + i)); //arrow notation shorthand example

//You can use map to call a function on each element of an array
var multiplyByTwo = function (x) { return x*2; };
console.log([1,3,6].map(multiplyByTwo));

/*
*	STRING MANIPULATION / REGEXP
*/
//String manipulation / regex
console.log("hey how are you".replace(/\s/g, '--')); // replace whatever is between / / with --

/*
*	Tricks
*/

//	<script defer src="script.js">  will load the script async (not blocking DOM loading) and run the script on dom loading
// 	<script async src="script.js"> 	will load the script async and execute it as soon as the scipt is loaded, regardless of dom. The execution of the script will bloack further loading of DOM


/*
*	nice patterns
*/ 

//Constructor
function Person (name){			//this argument is not actually used btw
	var self = this;			//this way we can still access this instance from inner functions
	console.log(arguments);		//is an array of the arguments

	function get (property){	//use this getter to get any property from an instance of Person
		return self[property] || null;	//if param not passed, return null so it's not just undefined
	}

	function set (prop, value){
		if (value === undefined){	//this is better than !value because sometimes you want to set a prop to false
			delete this[prop];		//this way you can use the setter to DELETE a property
			return false;
		}
		self[prop] = value;
		return value;
	}

	this.getname = function(){
		console.log(get('name'));
		return get('name');
	};

	this.setName = function(name){
		return set('name', name);	//it's nice to return the value of the property being set as a result
	};
}

var laurens = new Person('laurens', "pieter");	//in js the #args dont have to match the constructors #args
laurens.setName("dirk");

/*
* Dev Tricks
*/
//Some of these are from Wes Bos: https://javascript30.com/account/access/591a1bbbb0bde716c4f5d4fc/view/49ef1c34a5
//Console stuff
console.log("you can insert stuff like vars %s a string like so", "into");
console.dir("some HTML element"); //Will give you all the methods and properties available on that DOM element
for(let i = 0; i <10; i++){
	console.count("Use this to find out how many times you've printed something");
	console.count(i);
}
console.time('Run timer');// use this to check how much time has elapsed between this and timeEnd
console.timeEnd('Run timer');
console.log("This","way","there'll be","spaces","between","the words!");
var log = console.log;
log("now we can just pass stuff to log and it'll pass it to console.log. So much time saved omgzr");
//DOM stuff
console.info("Right click on any element in the DOM tree and select copy ->selector to get the css selector for exactly that element");
document.querySelectorAll("[src]");	//You can get elements with a certain [attribute] this way!

/*
* SCRIPTS AND COMMANDS
*/

// Use this python command to run a server in a folder; allowing local data loading and other neat stuff
//python -m SimpleHTTPServer 8000

//Use this bash script to download all repositories of the same name owned by different users on github
//currently directed towards a specific set of repos. Should be edited before use.
// while read repo; do
// 	INPUT="$repo"
// 	SUBSTRING=$(echo $INPUT| cut -d'-' -f 2)
// 	SUBSTRING="$(sed "s/ //" <<< "$SUBSTRING")"
// 	echo "https://github.com/$SUBSTRING/fe3-assessment-1"
//    	git clone "https://github.com/$SUBSTRING/fe3-assessment-1" $SUBSTRING
// done < repos.txt

// # https://github.com/meesrutten/fe3-assessment-1/archive/master.zip