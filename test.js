var journal = require("./JournalWatcher.js")
const os = require("os")

var dir = `C:/Users/${os.userInfo().username}/Saved Games/Frontier Developments/Elite Dangerous/`

journal.startRead("Journal")
console.log(`Started checking for journal updates at ${dir}`)

journal.on('allData', data => {
	console.log(`[${data.timestamp}] Event: ${data.event}`)
})

setTimeout(() => {
	journal.stopRead("Journal")
	console.log("Stopped checking for journal updates")
}, 30*1000);