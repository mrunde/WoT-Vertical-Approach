// Export controllers
module.exports = {
	del:                 require('../controllers/sensors/delete'),
	get:                 require('../controllers/sensors/get'),
	list:                require('../controllers/sensors/list'),
	listMeasurements:    require('../controllers/sensors/listMeasurements'),
	listSpatial:         require('../controllers/sensors/listSpatial'),
	listTemporal:        require('../controllers/sensors/listTemporal'),
	listSpatialTemporal: require('../controllers/sensors/listSpatialTemporal'),
	post:                require('../controllers/sensors/post'),
	put:                 require('../controllers/sensors/put')
};