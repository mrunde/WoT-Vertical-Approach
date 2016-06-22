Here you can find the source code for the web server.

## Running the Web Server

* Install all *node* modules with `npm install`
* Install *bower*, *gulp* and *pm2* globally, if you haven't done so before with `npm install -g bower gulp pm2`
* Install all *bower* modules with `bower install`
* Perform the *gulp* tasks with `gulp`
* Then you can start the web server with `pm2 start server\server.js`

*In case the API documentation is not generated at the first time, please run the gulp task again.*

## REST API

Here you can see an overview of the available REST API functions and whether they have been implemented already or are still in development.

### Things

Status | URL | Method | Description
-------|-----|--------|------------
:white_check_mark: | `api/things` | GET, POST | all things
:white_check_mark: | `api/things/:thingId` | DELETE, GET | one thing
:white_check_mark: | `api/things/:thingId/sensors` | GET | all sensors of one thing
:white_check_mark: | `api/things/:thingId/measurements` | GET | all measurements of one thing
:white_check_mark: | `api/things/measurements/latest` | GET | latest measurements of all things
:white_check_mark: | `api/things/:thingId/measurements/latest` | GET | latest measurements of one thing
:white_check_mark: | `api/things/:thingId/nearest` | GET | nearest other thing
:white_check_mark: | `api/things/temporal/:dateFrom/:dateTo` | GET | all things within one time frame
:white_check_mark: | `api/things/spatial/bbox/:bbox` | GET | all things within one bounding box
:white_check_mark: | `api/things/spatial/waterbodies/:waterbodyId` | GET | all things next to one waterbody
:white_check_mark: | `api/things/temporal/:dateFrom/:dateTo/spatial/:bbox` | GET | all things within one time frame and one bounding box

### Sensors

Status | URL | Method | Description
-------|-----|--------|------------
:white_check_mark: | `api/sensors` | GET, POST | all sensors
:white_check_mark: | `api/sensors/:sensorId` | DELETE, GET, PUT | one sensor
:white_check_mark: | `api/sensors/:sensorId/measurements` | GET | all measurements of one sensor
:white_check_mark: | `api/sensors/temporal/:dateFrom/:dateTo` | GET | all sensors within one time frame
:white_check_mark: | `api/sensors/spatial/:bbox` | GET | all sensors within one bounding box
:white_check_mark: | `api/sensors/temporal/:dateFrom/:dateTo/spatial/:bbox` | GET | all sensors within one time frame and one bounding box

### Measurements

Status | URL | Method | Description
-------|-----|--------|------------
:white_check_mark: | `api/measurements` | GET, POST | all measurements
:white_check_mark: | `api/measurements/:measurementId` | DELETE, GET | one measurement
:white_check_mark: | `api/measurements/temporal/:dateFrom/:dateTo` | GET | all measurements within one time frame
:white_check_mark: | `api/measurements/spatial/:bbox` | GET | all measurements within one bounding box
:white_check_mark: | `api/measurements/temporal/:dateFrom/:dateTo/spatial/:bbox` | GET | all measurements within one time frame and one bounding box

### Users

Status | URL | Method | Description
-------|-----|--------|------------
:white_check_mark: | `api/users` | GET, POST | all users
:white_check_mark: | `api/users/:userId` | DELETE, GET | one user
:white_check_mark: | `api/users/:userId/things` | GET | all things of one user

### Features

Status | URL | Method | Description
-------|-----|--------|------------
:white_check_mark: | `api/features` | GET, POST | all features
:white_check_mark: | `api/features/:featureId` | DELETE, GET | one feature

### Waterbodies

Status | URL | Method | Description
-------|-----|--------|------------
:white_check_mark: | `api/waterbodies` | GET | all waterbodies
:white_check_mark: | `api/waterbodies/:waterbodyId` | GET | one waterbody
