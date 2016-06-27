// Export controllers
module.exports = {
	del:                 require('../controllers/measurements/delete'),
	get:                 require('../controllers/measurements/get'),
	list:                require('../controllers/measurements/list'),
	listSpatial:         require('../controllers/measurements/listSpatial'),
	listTemporal:        require('../controllers/measurements/listTemporal'),
	listSpatialTemporal: require('../controllers/measurements/listSpatialTemporal'),
	post:                require('../controllers/measurements/post')
};