// Export controllers
module.exports = {
	del:                       require('../controllers/things/delete'),
	get:                       require('../controllers/things/get'),
	getNearest:                require('../controllers/things/getNearest'),
	list:                      require('../controllers/things/list'),
	listSensors:               require('../controllers/things/listSensors'),
	listMeasurements:          require('../controllers/things/listMeasurements'),
	listMeasurementsLatest:    require('../controllers/things/listMeasurementsLatest'),
	listMeasurementsLatestAll: require('../controllers/things/listMeasurementsLatestAll'),
	listSpatial:               require('../controllers/things/listSpatial'),
	listSpatialWaterbody:      require('../controllers/things/listSpatialWaterbody'),
	listTemporal:              require('../controllers/things/listTemporal'),
	listSpatialTemporal:       require('../controllers/things/listSpatialTemporal'),
	post:                      require('../controllers/things/post')
};