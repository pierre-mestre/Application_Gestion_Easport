# Using the app

## Installing project dependencies

```bash
npm install
```

## Running tests

```bash
yarn run test
```

## Running the app

```
npm start
```

# Using the code

## Adding a new page

To do this, you need to create a new folder in the **pages** folder with the name of the page.
If nothing is defined in the Get.js (See **__Adding GET/POST function__**), it will automatically fetch the **page_name.html** and render it.
This work with sub-pages. Just create your folder inside another folder.

### Caution !

Everything said above is not mandatory, the framework is not restrictive,s it's just the best method I thought of to find your way around.

## Adding GET/POST functions

I will list how to do it with the GET method. It's the same for the POST, just rename every GET into POST.

1. Create a file near the **page_name.html** and name it **page_nameGet.js**.
2. Write this : 
``` javascript
module.exports = {
	page_name: function(req, res){
		//What to do
	}
}
```
3. Each function you add will be a GET URL added to the server.

### P.S.

You can add the Get.js file even if you don't want any specific render to happen, just don't create a function with the same name as your page.

### POST

The post will mostly be used for Forms or any calls related to client-server without reloading a page.