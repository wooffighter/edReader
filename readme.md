# EdReader


How to use:
```js
const edreader = require("edreader");

journal.on('newLine', line => {
	//Code to process output
});
```

This will fire every time a new event has been added to the game journal, it will read all events in the last journal on startup, from then it will read all the next events in that journal!
