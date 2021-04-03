var journal = require("./JournalWatcher.js")

journal.on('newLine', obj => {
	console.log(obj)
})