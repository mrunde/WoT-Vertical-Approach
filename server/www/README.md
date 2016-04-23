Here you can find the source code for the web server.

## Running the Web Server

* Install all *node* modules with `npm install`
* Install *bower*, *gulp*, *apidoc* and *pm2* globally, if you haven't done so before with `npm install -g bower gulp pm2`
* Install all *bower* modules with `bower install`
* Perform the *gulp* tasks with `gulp`
* Render the API documentation with `apidoc -i server\docs -o app\dist\docs`
* Then you can start the web server with `pm2 start server\server.js`
