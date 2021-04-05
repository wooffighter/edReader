const fs = require("fs")
const Tail = require('tail').Tail;
const os = require("os");
const events = require("events");

var EventEmitter = new events.EventEmitter();

var options= {separator: /[\r]{0,1}\n/, fromBeginning: true, fsWatchOptions: {}, follow: true, logger: console, useWatchFile: true}

const journalDir = `C:/Users/${os.userInfo().username}/Saved Games/Frontier Developments/Elite Dangerous/`

var dirContent = fs.readdirSync(journalDir)
var files = []

dirContent.forEach(name => {
    if (name.match(/Journal..+.log/g)) {
        files.push([name.replace(/Journal.|\.\d{2}\.|log/gm,""),name])
    }
});

files.sort(function(a,b) {return Number(a[0])>Number(b[0])})

//Read file and check for updates
function startRead(event, dir) {
    dir = dir || `C:/Users/${os.userInfo().username}/Saved Games/Frontier Developments/Elite Dangerous/`
    if(event==="Journal") {
        JournalTail.watch()
        return `Started watching ${event}`
    }
    fs.readFile(dir+event+".json", (err,data) => {
        EventEmitter.emit(event, JSON.parse(Buffer.from(data, "utf-8").toString()))
        EventEmitter.emit("allData", JSON.parse(Buffer.from(data, "utf-8").toString()))
        return `Started watching ${event}`
    })   
    fs.watchFile(dir+event+".json",(curr,prev) => {
        fs.readFile(dir+event+".json", (err,data) => {
            EventEmitter.emit(event, JSON.parse(Buffer.from(data, "utf-8").toString()))
            EventEmitter.emit("allData", JSON.parse(Buffer.from(data, "utf-8").toString()))
        })
    });
}

function stopRead(event, dir) {
    dir = dir || `C:/Users/${os.userInfo().username}/Saved Games/Frontier Developments/Elite Dangerous/`
    if(event==="Journal") {
        JournalTail.unwatch()
        return `Stopped watching ${event}`
    } else {
        fs.unwatchFile(dir+event+".json")
        return `Stopped watching ${dir+event}.json` 
    }
}

function startAll() {
    startRead("Cargo")
    startRead("Market")
    startRead("ModulesInfo")
    startRead("NavRoute")
    startRead("Outfitting")
    startRead("Shipyard")
    startRead("Status")
}


// Journal events
var JournalTail = new Tail(journalDir+files[files.length-1][1], options)
JournalTail.on("error", error => console.error(error));
JournalTail.on('line',data=>{
    data = JSON.parse(data);
    EventEmitter.emit("Journal", data);
    EventEmitter.emit("allData", data)
    EventEmitter
});
JournalTail.unwatch()

module.exports.file = journalDir+files[files.length-1][1]
module.exports = EventEmitter

module.exports.startRead = startRead
module.exports.stopRead = stopRead
module.exports.startAll = startAll