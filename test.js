var journal = require("./JournalWatcher.js")

journal.on('line', obj => {
	console.log(obj)
})