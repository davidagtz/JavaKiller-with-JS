var shell = require('child_process');
var fs = require('fs');

module.exports.kill = function(str){
	let name = str.replace(/\.java/g,"");
	if(name.match(/.*[/\\*|:?<>""].*/g))
		throw (new Error("Illegal Characters in File Name"));
	else if(process.platform != 'win32')
		throw new Error("OS not supported by Java Killer");
	else{
		shell.exec("\"%JDK_HOME%\\bin\\jps\" > temp.txt",(err, stderr, stdout)=>{
			if(err) throw err;
			fs.readFile("temp.txt",(err2, data)=>{
				if(err2) throw err2;
				let file = data.toString('utf-8');
				let processes = file.trim().split(/[\n\r]+/g);
				for(var i = 0;i<processes.length;i++){
					let t = processes[i].split(" ");
					if(t[1]==str){
						// console.log("Found");
						shell.exec("taskkill /F /PID "+t[0]+"&&del temp.txt",(err3,)=>{
							if(err3) throw err3;
						});
						return;
					}
				}
				// console.log("Not Found");
			})
		} )
	}
}