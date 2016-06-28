// Export controllers
module.exports = {
	del:        require('../controllers/users/delete'),
	get:        require('../controllers/users/get'),
	list:       require('../controllers/users/list'),
	listThings: require('../controllers/users/listThings'),
	post:       require('../controllers/users/post')
};