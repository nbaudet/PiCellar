// Requires
var sensorLib = require('node-dht-sensor');

var blessed = require('blessed'),
	contrib = require('blessed-contrib'),
	screen = blessed.screen();

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
	return process.exit(0);
});

// Create layout and widgets
var grid1 = new contrib.grid({rows: 2, cols: 1, screen: screen})

var gauge = grid1.set(1, 0, 1, 1, contrib.gauge, {label: 'Humidité'})

var box = grid1.set(0, 0, 1, 1, blessed.box, {label: 'Température', style: {fg: 'white', bg: 'blue'}})

var temp, humid;

var sensor = {
    initialize: function () {
        return sensorLib.initialize(22, 10);
    },
    read: function () {
        var readout = sensorLib.read();
        //console.log('Temperature: ' + readout.temperature.toFixed(2) + 'C, ' + 'humidity: ' + readout.humidity.toFixed(2) + '%');

	temp = readout.temperature.toFixed(2);
	humid = readout.humidity.toFixed(2);

	box.setContent(temp);

	gauge.setPercent(humid);


	screen.render();

        setTimeout(function () {
            sensor.read();
        }, 2000);
    }
};
 
if (sensor.initialize()) {
    sensor.read();
} else {
    console.warn('Failed to initialize sensor');
}
