const fs = require("fs")
const Tail = require('tail').Tail;
const os = require("os");
var options= {separator: /[\r]{0,1}\n/, fromBeginning: true, fsWatchOptions: {}, follow: true, logger: console, useWatchFile: true}

var dir = `C:/Users/${os.userInfo().username}/Saved Games/Frontier Developments/Elite Dangerous/`

var dirContent = fs.readdirSync(dir)
var files = []

dirContent.forEach(name => {
    if (name.match(/Journal..+.log/g)) {
        files.push([name.replace(/Journal.|\.\d{2}\.|log/gm,""),name])
    }
})
files.sort(function(a,b) {return Number(a[0])>Number(b[0])})

var tail = new Tail(dir+files[files.length-1][1], options)
tail.on('line',data=>{
    if(JSON.parse(data).event.toLowerCase()=='continue'){
        console.log(data.Part)
        tail.unwatch()
        tail = new Tail(dir+data.Part, options)
    }
})

tail.watch()

module.exports = tail
module.exports.file = dir+files[files.length-1][1]

tail.on("error", error => {
    console.log('ERROR: ', error);
});