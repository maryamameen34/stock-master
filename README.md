# Inventory Management System

An intuitive and efficient **Inventory Management System** designed to streamline the management of products, stock levels, and orders. Built with a **React** frontend, **Express.js** backend, and **TypeScript** for a more robust and scalable architecture. The application leverages **Redux Toolkit** for state management and **Nodemailer** for email verification and notifications.

---

## Features:

- **User Authentication:** Secure sign-up, login, and email verification system using **Nodemailer**.
- **Product Management:** Create, update, delete, and view product details.
- **Stock Management:** Track product quantities and adjust stock levels.
- **Order Management:** Add, update, and track orders.
- **Responsive UI:** Modern, user-friendly interface built with React.
- **State Management:** Efficient state management with **Redux Toolkit**.

---

## Tech Stack:

### Frontend:
- **React** (with TypeScript)
- **Redux Toolkit** for state management
- **React Router** for navigation
- **Axios** for API calls
- **Tailwind CSS** for styling

### Backend:
- **Express.js** for the server-side framework
- **Node.js** for the backend runtime environment
- **MongoDB** for database
- **Mongoose** for object data modeling (ODM)
- **Nodemailer** for email handling (account verification and notifications)

---

## Getting Started

Follow these steps to get the Inventory Management System up and running locally.

### Prerequisites:
- **Node.js** (v17 or higher)
- **npm** or **yarn** (Node package managers)
- **MongoDB**

### Installation:
1. **Clone the Repository:**
    ```bash
    git clone https://github.com/maryamameen34/stock-master.git
    cd stock-master
    ```
2. **Install Backend Dependencies:**
    ```bash
    cd server
    npm install
    ```
3. **Setup Environment Variables:**
    Go to `server/config/.env` and add your environmental variables like:
    ```bash
    MONGODB_ATLAS="YOUR_MONGODB_URL"
    FRONTEND_URL="YOUR_FRONTEND_URL"
    PORT=YOUR_BACKEND_PORT
    ```
4. **Start Backend:**
    ```bash
    npm start
    ```
5. **Install Frontend Dependencies:**
    ```bash
    cd client
    npm install
    ```
6. **Start Frontend:**
    ```bash
    npm start
    ```

---

## Usage:

### Authentication Flow:
1. **Sign Up:** New customers can create an account by providing basic details. An invitation for other roles (e.g., manager) is sent by the admin.
2. **Email Verification:** After signing up, users will receive an email with a verification link. Clicking the link verifies their account.
3. **Login:** Users can log in after verifying their email.

### Product Management:
1. **Add New Products:** Admin & Manager can add new products to the inventory.
2. **Update Product:** Modify product details including price, stock quantity, and description.
3. **Delete Product:** Only Admins can remove products from the inventory.

### Order Management:
1. **Create Orders:** Create new orders with product details and customer information.
2. **View Orders:** Track existing orders and their status.

---

## Screenshots:

### SignUp Form:
![SignUp Form](https://github.com/maryamameen34/stock-master/blob/main/Screenshot%202024-11-05%20075707.png)

### Inventory Table View:
![Inventory Table View](https://github.com/maryamameen34/stock-master/blob/main/Screenshot%202024-11-05%20090055.png)

### Inventory Grid View:
![Inventory Grid View](https://github.com/maryamameen34/stock-master/blob/main/Screenshot%202024-11-05%20090238.png)

### Single Page View:
![Single Page View](https://github.com/maryamameen34/stock-master/blob/main/Screenshot%202024-11-05%20090159.png)

---

## Contributing:

We welcome contributions to improve the Inventory Management System! To contribute:

1. Fork the repository
2. Create a new branch for your changes
3. Make your changes and commit them
4. Push your changes and create a pull request

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## Contact

If you have any questions or suggestions, feel free to reach out to:

- **Email:** [maryamshehzadi768@gmail.com](mailto:maryamshehzadi768@gmail.com) | [maryamameen3453@gmail.com](mailto:maryamameen3453@gmail.com)
- **LinkedIn:** [LinkedIn Profile](https://www.linkedin.com/in/maryam-ameen/)
