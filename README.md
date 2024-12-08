# **Run Tracker Application**

## **Overview**
The Run Tracker Application is a full-stack project built using **React** for the frontend and **Spring Boot** for the backend. The backend is connected to a **cloud database on Supabase** using **PostgreSQL**, while the frontend is hosted on **Netlify** and connected to the backend APIs hosted on **Render**. This application is designed to showcase **role-based access control** with **JWT authentication** and includes email verification functionality for user authentication.

You can access the project via this link:  
**[Run Tracker Deployment](https://gleeful-bonbon-f81703.netlify.app/)**

---

## **Features**

### **Authentication**
- JWT-based authentication and role-based access control.
- Three default roles: **Admin**, **User**, and **Guest**.
- Login credentials for testing:
  - Admin:  
    **Email**: `admin@gmail.com`  
    **Password**: `a`
  - User:  
    **Email**: `user@gmail.com`  
    **Password**: `u`
  - Guest:  
    **Email**: `guest@gmail.com`  
    **Password**: `g`

### **Role-Based APIs**
- **Admin**:
  - Access to admin-specific APIs such as user management.
- **User**:
  - Access to user-specific APIs such as managing runs.
- **Guest**:
  - Limited access to guest APIs.

### **Backend**
- Developed using **Spring Boot**.
- Database connection using **PostgreSQL** hosted on **Supabase**.
- Deployed on **Render** for public API access.
- Supports email verification via **SMTP** for secure registration.

### **Frontend**
- Built with **React**.
- Deployed on **Netlify**.
- Communicates with the backend through APIs to fetch and display data.

---

## **Technical Stack**

### **Frontend**
- **React.js**: User interface development.
- **Axios**: API communication.
- **Netlify**: Deployment of the frontend.

### **Backend**
- **Spring Boot**: Backend REST API development.
- **PostgreSQL**: Database for storing user data and runs.
- **Supabase**: Cloud-hosted database service.
- **Render**: Hosting platform for the backend API.
- **JWT**: Secure token-based authentication.
- **SMTP (Gmail)**: Email verification.

---

## **How the Project Works**

### **1. Backend**
- **Database**: The backend connects to a **PostgreSQL database** hosted on Supabase.
- **Deployment**: The backend is deployed to Render, where it exposes REST APIs for the frontend to consume.
- **Authentication**:
  - Role-based access control is implemented using JWT.
  - Email verification is performed using the **Gmail SMTP server**.

### **2. Frontend**
- **Deployment**: The frontend is deployed on Netlify and interacts with the backend APIs to handle authentication, CRUD operations, and display data.
- **Dynamic Role Management**: Based on the user's role, certain APIs and features are enabled/disabled on the frontend.

---

## **How to Use**

### **1. Access the Application**
- Navigate to the deployed application:  
  **[Run Tracker Deployment](https://gleeful-bonbon-f81703.netlify.app/)**

### **2. Login**
- Use the default credentials provided above to log in as an Admin, User, or Guest.

### **3. Explore Features**
- **Admin**: Manage all users and their data.
- **User**: Manage your own runs and profile.
- **Guest**: Limited access to view-only features.

---

## **Project Highlights**
- **Full-Stack Architecture**: Combines React and Spring Boot.
- **Cloud Database**: PostgreSQL hosted on Supabase ensures scalable and reliable data storage.
- **Authentication**: Role-based access using JWT ensures security.
- **Deployment**: Utilizes modern platforms like Netlify and Render for reliable hosting.
