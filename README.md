# MEVN-Ecommerce-WebApp
A comprehensive ecommerce web application developed using Vue.js for the frontend and Django for the backend, with a PostgreSQL database.

## Tech Stack
- Frontend: Vue.js
- Backend: Django, Django REST Framework
- Database: PostgreSQL
- Other Key Libraries: Vuex, axios

<img width="1427" alt="Screenshot 2023-08-08 at 5 35 59 PM" src="https://github.com/mylesgamez/Vue-Django-Ecommerce-WebApp/assets/94767708/67d16e31-b75b-41f5-81fe-16e44d458964">
<img width="1433" alt="Screenshot 2023-08-08 at 5 36 22 PM" src="https://github.com/mylesgamez/Vue-Django-Ecommerce-WebApp/assets/94767708/7a6be310-ef99-4833-9e66-d9737d148c3e">
<img width="1436" alt="Screenshot 2023-08-08 at 5 35 45 PM" src="https://github.com/mylesgamez/Vue-Django-Ecommerce-WebApp/assets/94767708/0bbea87d-5840-4678-b992-ad71ca64dd69">

## Getting Started
Here are the steps to setup this project locally:

1. Clone the repo 
```
git clone https://github.com/your-github-username/Vue-Django-Ecommerce-WebApp.git
cd Vue-Django-Ecommerce-WebApp
```

2. Setup the Python Virtual Environment and install dependencies
```
cd ecommerce
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

3. Setup the Vue.js frontend
```
cd ../frontend
npm install
```

4. Setup the PostgreSQL Database
You need to install PostgreSQL, create a new database, and add the credentials to the .env file in the Django settings.

Here is a template of what the .env file should contain:
```
DB_NAME=your_db_name
DB_USER=your_postgres_username
DB_PASSWORD=your_postgres_user_password
DB_HOST=localhost
DB_PORT=5432
```

5. Run Django server
Make sure you're in the ecommerce directory (where manage.py is located), then run:
```
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```
This will start the Django server on http://localhost:8000.

6. Run Vue.js server
```
npm run serve
```
This will start the Vue.js server on http://localhost:8080.

Now, you should be able to access the web app on http://localhost:8080.

## Key Features
- User Authentication: Users can register, login, and logout. User sessions are managed using JWT tokens.
- Product List: All products are displayed with key details on the home page.
- Product Detail: Users can view more details about a product by clicking on it from the product list.
- Shopping Cart: Users can add products to their shopping cart and view the cart.
- Checkout Process: Users can enter their shipping and billing information and place their order.

## License
MIT
