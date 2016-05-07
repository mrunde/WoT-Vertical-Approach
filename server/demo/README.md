Here you can find the source code for the demo sensor controller.

## Starting the Demo Sensor Controller

The demo sensor controller is used for demonstration purpose only. It basically only sends REST POST requests with random data as Measurements in intervals to the server.

To specify the demo sensor controller, there are some parameters which can be set. If a parameter is not set but you want to set a later parameter, you will have to set the parameter though. Otherwise this can result in a `TypeError`.

### Parameters

Order | Parameter     | Type   | Default   | Description
------|---------------|--------|-----------|------------
2     | `interval`    | Number | 5000      | Interval in which the measurements shall be posted.
3     | `thingName`   | String | Demo      | Name of the Thing.
4     | `thingLocLat` | Number | 51.964113 | Latitude of the Thing's location.
5     | `thingLocLng` | Number | 7.624862  | Longitude of the Thing's location.

### Example

`node demoSensor.js 1000 Test`

This will start the demo sensor controller which will send new Measurements in an interval of 1 second (= 1000 milliseconds) to a Thing with the name Test. The Thing's location remains the default location.
