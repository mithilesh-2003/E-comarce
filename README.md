---

# Eko-Cart: E-Commerce Web App

[![Visit My Website](https://img.shields.io/badge/Visit-My%20Website-blue?style=for-the-badge&logo=internet-explorer)](https://eko-mart.netlify.app/)

An advanced e-commerce web application built with the **MERN stack** (MongoDB, Express.js, React, Node.js), providing a platform for users to explore, manage, and purchase products. This project was developed to showcase full-stack development with the MERN stack and integrates various key features, including user authentication, product filtering, and a cart system.

## Features

- **User Authentication**: Users can sign up, log in, and make purchases once authenticated.
- **Product Page**: Displays all available products, with category filtering options.
- **Cart System**: Users can add products to their cart, update quantities, and proceed to checkout.
- **Admin Control**: Admin users can add, update, and manage products, categories, and orders.
- **Payment Gateway Integration**: Integrated payment system for processing user orders.

## Technologies Used

- **Frontend**: React.js,
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Image Storage**: Cloudinary
- **Deployment**: Render (Backend), Netlify (Frontend)

## Project Structure

- **Frontend**: Built with React and Redux, providing a dynamic user interface.
- **Backend**: Built with Node.js and Express.js, handling API requests, user authentication, and product management.
- **Database**: MongoDB for secure and efficient data storage.
- **Image Storage**: Cloudinary for product image management.

## How It Works

1. **Home Page**: Users can explore products and filter them by categories.
2. **Sign Up / Log In**: Users can register or log in to their account.
3. **Product Page**: Logged-in users can view detailed product information and add items to their cart.
4. **Admin Controls**: Admins can manage product data, including adding new products, updating details, and deleting items.
5. **Cart & Checkout**: Users can manage their cart and proceed to the payment gateway for checkout.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/eko-cart.git
   cd eko-cart
   ```
2. Install dependencies:
   - For the backend:
     ```bash
     cd backend
     npm install
     ```
   - For the frontend:
     ```bash
     cd frontend
     npm install
     ```
3. Set up environment variables in the backend:
   ```bash
   MONGO_URI=<your-mongodb-uri>
   CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
   CLOUDINARY_API_KEY=<your-cloudinary-api-key>
   CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
   JWT_SECRET=<your-jwt-secret>
   ```
4. Run the backend server:
   ```bash
   cd backend
   npm start
   ```
5. Run the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

## API Endpoints

### Base URL
**URL**: `https://eko-mart.onrender.com` 

### User APIs

- **Signup**:  
  **URL**: `/api/signup`  
  **Method**: POST  
  **Request Body**:
  ```json
  {
    "username": "Your Name",
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```

- **Login**:  
  **URL**: `/api/login`  
  **Method**: POST  
  **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```

### Product APIs

- **Get Products**:  
  **URL**: `/api/allproducts`  
  **Method**: GET

- **Get Product by ID**:  
  **URL**: `/api/singleproduct/:id`  
  **Method**: GET

- **Create Product** (Admin):  
  **URL**: `/api/addproduct`  
  **Method**: POST  
  **Request Body**:
  ```json
  {
    "title": "Product Name",
    "images": [
      {
      "url": "https://example.com/image1.jpg",
      "public_id": "image1_public_id"
    }
    ],
    "originalprice": 1000,
    "discount": 10,
    "sellingprice": 900,
    "description": "Product Description",
    "category": "Category ID",
    "brandname": "brand name",
    "weight": "500g",
    "countInStock": 50,
    "type": "productWithDiscount"
  }

  
  ```

### Cart APIs

- **Get User Cart**:  
  **URL**: `/api/showcart`  
  **Method**: POST
  **Request Body**:
  ```json
  {
    "userId" : "6705d00fa0e074cc01260e00"
  }
  ```

- **Add to Cart**:  
  **URL**: `/api/addtocart`  
  **Method**: POST  
  **Request Body**:
  ```json
  {
    "productId" : "6704afaf9a087da19fe29945",
    "userId" : "6705d00fa0e074cc01260e00",
    "quantity" : 3
  }
  ```

### Order APIs

- **Create Order**:  
  **URL**: `....`  
  **Method**: POST  
  **Request Body**:
  ```json
  {
    "products": [{"productId": "Product ID", "quantity": 2}],
    "totalPrice": 39.98,
    "shippingAddress": "123 Street",
    "paymentMethod": "Credit Card"
  }
  ```

  ## Data Models

### User

| Field      | Type        | Description                           |
|------------|-------------|---------------------------------------|
| `_id`      | ObjectId    | Unique identifier for the user        |
| `username` | String      | User's name                           |
| `email`    | String      | User's email address                  |
| `password` | String      | Hashed password (using bcrypt)        |
| `cart`     | Array       | List of items in the user's cart      |
| `wishlist` | Array       | List of items in the user's wishlist  |
| `order`    | Array       | List of user’s past orders            |
| `createdAt`| Date        | Timestamp when the user was created   |
| `updatedAt`| Date        | Timestamp when the user was updated   |
| `address`  | Object      | User’s address information            |
| `firstname`| String      | User's first name                     |
| `lastname` | String      | User's last name                      |

### Product

| Field          | Type        | Description                          |
|----------------|-------------|--------------------------------------|
| `_id`          | ObjectId    | Unique identifier for the product    |
| `title`        | String      | Name or title of the product         |
| `images`       | Array       | Array of product images (3)          |
| `description`  | String      | Short description of the product     |
| `originalprice`| Number      | Original price of the product        |
| `sellingprice` | Number      | Discounted selling price             |
| `discount`     | Number      | Discount percentage                  |
| `category`     | String      | Category to which the product belongs|
| `brandname`    | String      | Brand name of the product            |
| `weight`       | String      | Weight or size information           |
| `type`         | String      | Type of product (e.g., discount type)|
| `createdAt`    | Date        | Timestamp when the product was created |
| `updatedAt`    | Date        | Timestamp when the product was updated |

### Category

| Field         | Type      | Description                              |
|---------------|-----------|------------------------------------------|
| `_id`         | ObjectId  | Unique identifier for the category        |
| `catname`     | String    | Name of the category (e.g., Fruits)       |
| `image`       | String    | Image filename associated with the category |
| `stocks`      | Number    | Number of items in stock for the category |
| `description` | String    | Description of the category               |

### Cart

| Field      | Type      | Description                                  |
|------------|-----------|----------------------------------------------|
| `_id`      | ObjectId  | Unique identifier for the order              |
| `products` | Array     | Array of products in the order (2 products)  |
| `user`     | ObjectId  | ID of the user who placed the order          |

### Order

| Field       | Type    | Description               |
|-------------|---------|---------------------------|
| userId      | ObjectId| Reference to the user      |
| products    | Array   | Products in the order      |
| totalPrice  | Number  | Total order price          |
| paymentMethod | String | Payment method chosen by the user |
| shippingAddress | String | User's shipping address  |
| payment_status       | Boolean | Payment status            |
| paidAt      | Date    | Date and time of payment   |
| isDelivered | Boolean | Delivery status           |
| deliveredAt | Date    | Date and time of delivery  |

## Deployment

The frontend is deployed on **Netlify**, and the backend is deployed on **Render**. **MongoDB Atlas** is used for database management, and **Cloudinary** is used for image storage.

## License

This project is licensed under the MIT License. See the [LICENSE] file for details.

---
