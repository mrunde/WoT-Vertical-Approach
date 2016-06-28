// Export controllers
module.exports = {
	get:       require('../controllers/waterbodies/get'),
	getName:   require('../controllers/waterbodies/getName'),
	list:      require('../controllers/waterbodies/list'),
	listNames: require('../controllers/waterbodies/listNames'),
	post:      require('../controllers/waterbodies/post')
};