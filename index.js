var shell = require('child_process');
var fs = require('fs');

module.exports.kill = function(str){
	let name = str.replace(/\.java/g,"");
	if(name.match(/.*[/\\*|:?<>""].*/g))
		throw (new Error("Illegal Characters in File Name"));
	else if(process.platform != 'win32')
		throw new Error("OS not supported by Java Killer");
	else{
		shell.exec("jps > temp.txt",(err, stdout, stderr)=>{
			if(err) throw err;
			if(stderr) throw stderr;
			fs.readFile("temp.txt",(err2, data)=>{
				if(err2) throw err2;
				let file = data.toString('utf-8');
				let processes = file.trim().split(/[\n\r]+/g);
				for(var i = 0;i<processes.length;i++){
					let t = processes[i].split(" ");
					if(t[1]==str){
						// console.log("Found");
						shell.exec("taskkill /F /PID "+t[0]+"&&del temp.txt",(err3, out,  stderr1)=>{
							if(err3) throw err3;
							if(stderr1) throw stderr1;
						});
						return;
					}
				}
				// console.log("Not Found");
			})
		} )
	}
}

module.exports.java = async (str, options, cb)=>{
	if(str.match(/.+\.class/g)){
		str = str.replace(/\.class/g, "");
	}
	if(options == undefined){
		options = "";
		cb = ()=>{};
	}
	if(typeof(options)=='function'){
		cb = options;
		options = "";
	}
	return shell.exec("java "+str+" "+options, {maxBuffer:1024*1024*1024}, cb);
}

module.exports.javac = async (str, options, cb)=>{
	if(!str.match(/.+\.java/g)){
		str+=".java";
	}
	if(options == undefined){
		options = "";
		cb = ()=>{};
	}
	if(typeof(options)=='function'){
		cb = options;
		options = "";
	}
	return shell.exec("javac "+str+" "+options, cb);
}