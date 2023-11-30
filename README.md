# mymoria_api
Coding challenge mymoria backend

### what i did (everthing with screenshot explained in this readmefile)
* Created all 3 endpoints
  
### what i didn't did
* I haven't done any bonus
  
### Postman
* i used postman for making request so i saved all my request with examples and added here in this project as mymoria. It is post man collection json file.

## I used Node.js, TypeScript, Express, RoutingControllers, ClassValidators 

### Setup
* clone the repo
```sh
$ npm i
```
```sh
$ npm start
```
 npm start will start the server on port 3000 which is .env file. You can change portnumber according to your wish.



 ### Folder Structure

 ```ts
mymoria-api/
|-- build/
|-- src/
|   |-- data/ //data you provided for doing this task and also i am saving my wishlistids here by creating new (whishlistIds.json) file
|   |-- controllers/
|   |   |-- productController.ts // for reading products (endpoints)
|   |   |-- wishlistController.ts // for adding, reading products to wishlist (endpoints)
|   |-- dto/ //types
|   |   |-- productDTO.ts // type of user
|   |-- middelware/|   |   |-- validationErrors.ts //if we make error request then structured understandable error response is sent

|   |-- services/ //for accessing database (in our case the data you provided)
|   |   |-- productService.ts  // for CRUD on product database (users.json)
|   |   |-- wishlistService.ts  // for CRUD on wihslist database (users.json)

|   |-- index.ts/ // main file

|-- .env/ // basic project settings

|-- package.json
|-- README.md
|-- tsconfig.json
```

### 3 Endpoints request screenshots
#### Get products by category
  ![get products by category](./sc/get_products_by_category.png)

* postman request for creating new user
  ![postman request creating user (users.json)](./images/postman_create_user_req.png)

* logger i used morgan lib for this
  ![logger while creating user (users.json)](./images/logger_post_req_create_user.png)

* after creating new user(users.json)
  ![after creating user (users.json)](./images/after_post_req_create_user_users_file.png)

### User Vechile preferences - only authenticated user can insert the vechile preferences
#### create vechile preference
* Add new vechile preference
  ![add vechile preference (vechilepreference.json)](./images/add_vechile_preference.png)
  ![add vechile preference (vechilepreference.json)](./images/add_vechile_prerence_json.png.png)

#### update vechile preference
  ![update vechile preference (vechilepreference.json)](./images/update_vechile_preference.png)
  ![update vechile preference (vechilepreference.json)](./images/update_vechile_preference_json.png)
#### delete vechile preference
  ![delete vechile preference (vechilepreference.json)](./images/delete_vechile_preference.png)
  




