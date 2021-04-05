# EdReader

What does this module do:
EdReader fires an event every time the game updates the corresponding files, Under here you can see the event names with what they show:


| Event       | Triggered when:												      |
|-------------|-------------------------------------------------------------------|
| Status      | Triggers when data inside event changes                           |
| Cargo       | Triggers every time your cargo has changed                        |
| Shipyard    | Triggers when opening shipyard screen                             |
| ModulesInfo | Triggers when opening module screen on left display               |
| NavRoute    | Triggers when setting route in galaxy map                         |
| Market      | Triggers when opening Market                                      |
| Outfitting  | Triggers when opening outfitting                                  |
| Journal     | Triggers every time a new event happens (Except the events above) |
| allData     | Triggers every time any event above triggers (Only if started with startRead) |



How to use:
```js
const edreader = require("edreader");

//Tell EdReader to start watching for updates, This will also send the full log if Journal
edreader.startRead("Journal")

//Fired every time EdReader sees an update
//This will send the event as the game sends it in the game journal
edreader.on('Journal', data => {
	//Code to process output
});

edreader.on("error", err => {
	if (err) throw err;
})

//Tell EdReader to stop watching for updates
edreader.stopRead("Journal")
```