________________________________________
🧪 Test Document – Shoe Selling Web Application
1. Introduction
Project name: Shoe Selling Web Application
Purpose: Ensure the system functions correctly (authentication, product management, order processing, and shopping cart) and provides a good user experience.
Scope: Functional testing of backend APIs (Spring Boot) and frontend features (ReactJS).
________________________________________
2. Test Objectives
•	Verify that authentication works correctly (sign up, login, logout).
•	Verify that RESTful APIs handle product and order management properly.
•	Ensure shopping cart functions (add/remove/update items).
•	Validate admin dashboard operations.
•	Confirm frontend UI works with ReactJS & TailwindCSS.
________________________________________
3. Test Approach
•	Testing types: Manual testing + API testing (Postman) + Unit testing (JUnit).
•	Techniques: Functional testing, UI testing, positive & negative testing.
•	Test tools: Postman, JUnit, browser (Chrome).
________________________________________
4. Test Scenarios & Test Cases
4.1 Authentication (Spring Security)
| ID        | Test Case           | Steps                                | Expected Result                            |
|-----------|---------------------|--------------------------------------|--------------------------------------------|
| TC-Auth-01| User Registration   | Enter valid email, fullname,         | Display successful registration message    |
|           |                     | password, confirm password           |                                            |
| TC-Auth-02| User Login          | Enter valid credentials              | Login successful, redirect home            |
| TC-Auth-03| Invalid Login       | Enter wrong password                 | Error message displayed                    |
| TC-Auth-04| Logout              | Click logout                         | Local storage cleared, redirect to homepage|

________________________________________
4.2 Product Management (REST API + JPA)
| ID         | Test Case             | Steps                                | Expected Result        |
|------------|-----------------------|--------------------------------------|------------------------|
| TC-Prod-01 | View Product List     | Access `/products` endpoint          | Return product list    |
| TC-Prod-02 | Search Product        | Enter keyword in search bar          | Display matching products |
| TC-Prod-03 | Add Product (Admin)   | POST `/products` with valid data     | Product created in DB  |
| TC-Prod-04 | Update Product (Admin)| PUT `/products/{id}` with valid data | Product updated        |
| TC-Prod-05 | Delete Product (Admin)| DELETE `/products/{id}`              | Product removed from DB|
________________________________________
4.3 Shopping Cart
| ID         | Test Case        | Steps                          | Expected Result                    |
|------------|------------------|--------------------------------|------------------------------------|
| TC-Cart-01 | Add to Cart      | Click “Add to Cart” on product | Item added to cart                 |
| TC-Cart-02 | View Cart        | Go to cart page                | Display correct items & quantities |
| TC-Cart-03 | Update Quantity  | Change quantity in cart        | Cart updates correctly             |
| TC-Cart-04 | Remove Item      | Click “Remove”                 | Item removed from cart             |
| TC-Cart-05 | Checkout         | Place order with valid cart    | Order created in DB                |
________________________________________
4.4 Order Management
| ID          | Test Case          | Steps                   | Expected Result      |
|-------------|--------------------|-------------------------|----------------------|
| TC-Order-01 | Place Order        | Submit cart checkout    | Order saved in DB    |
| TC-Order-02 | View Order History | Access `/orders` as user| Display past orders  |
| TC-Order-03 | Admin View Orders  | Admin access `/orders`  | Show all orders      |
________________________________________
4.5 Admin Dashboard
| ID           | Test Case                  | Steps                       | Expected Result                |
|--------------|----------------------------|-----------------------------|--------------------------------|
| TC-Admin-01  | Admin Login                | Login as admin              | Access to dashboard            |
| TC-Admin-02  | Manage Products            | Add/update/delete products  | Changes reflected in DB        |
| TC-Admin-03  | View Orders                | Open order management page  | Show list of all orders        |
| TC-Admin-04  | Manage Accounts            | Add/update accounts         | Changes reflected in DB        |
| TC-Admin-05  | Manage Posts and Banners   | Add/update/delete posts and | Changes reflected in DB        |
|              |                            | banners                     |                                |
________________________________________
5. Non-Functional Tests (Optional)
•	Performance: Page loads within 3s.
•	Security: Unauthorized users cannot access /admin endpoints.
________________________________________
6. Exit Criteria
•	All critical test cases (authentication, order checkout) passed.
•	No high severity bugs remain open.
________________________________________
7. Deliverables
•	Test cases (this document).
•	Test execution report.
•	Bug reports (if any).
________________________________________
