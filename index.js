let scale = require("music-scale")
let promptly = require("promptly")
let intersection = require("lodash.intersection")
let chalk = require("chalk")


async function main(){
	let root = await promptly.prompt("Root: ")
	let line = await promptly.prompt("Notes: ")
	let notes = []
	let original = line.split(" ")
	original.forEach(note => {
		notes.push(note)
		if(note.length == 2){
			if(note[1] == '#'){
				notes.push( String.fromCharCode((note.charCodeAt(0) - 65 + 1)%7+65 )+"b" )
			}else{
				notes.push( String.fromCharCode(Math.abs( (note.charCodeAt(0) - 65 - 1)%7+65 ))+"#" )
			}
		}
	})
	for(let name of scale.names()){
		let s = scale(name, root)	
		let found = intersection(s,  notes)
		if(found.length === original.length){
			console.log(chalk.underline(name))
			let result = ""
			for(let note of s){
				if(found.indexOf(note) != -1){
					result += chalk.red(note + " ")
				}else{
					result += note + " "
				}
			}

			console.log(result)
		}
	}
}


main()
