# **Social Media Simulation (Twitter-like App)**

A simple Twitter-like social media app built with **React**, **Firebase** as the backend, **Tailwind CSS** for styling, and **Motion** (previously known as Framer Motion) for animations. The app allows users to log in with their Google account, share ideas, and like others' posts.

## **Features**
- **Google Authentication**: Users can log in using their Google account.
- **Share Ideas**: Users can post and share their ideas with others.
- **Like Posts**: Users can like posts from other users.
- **Responsive UI**: Built with **Tailwind CSS** for a clean, mobile-first design.
- **Smooth Animations**: Uses **Motion** for fluid animations and transitions.

## **Installation**

### 1. Clone the repository:
```bash
git clone https://github.com/your-username/social-media-simulation.git
cd social-media-simulation
```

### 2. Install dependencies:
```bash
npm install
```

### 3. Set up your Firebase project:
- Go to the [Firebase Console](https://console.firebase.google.com/).
- Create a new project (or use an existing one).
- Enable Google authentication under **Authentication → Sign-in method**.
- Create a Firebase web app to get your Firebase credentials.

### 4. Add your Firebase credentials:
- Create a `.env` file in the root directory (if it doesn’t exist already).
- Add the following environment variables:
  ```env
  REACT_APP_FIREBASE_API_KEY=your_api_key
  REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
  REACT_APP_FIREBASE_PROJECT_ID=your_project_id
  REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
  REACT_APP_FIREBASE_APP_ID=your_app_id
  ```
  Make sure you replace the placeholders (`your_api_key`, etc.) with your actual Firebase project credentials.

### 5. Start the development server:
```bash
npm start
```
The app will run on [http://localhost:3000](http://localhost:3000).

## **Important Notes**
- **firebase.js is not included in the repository**: The `firebase.js` file, which contains the actual Firebase configuration, is **excluded** from the repository to protect sensitive information (API keys). Make sure to create a `firebase.js` file locally with the configuration details from your Firebase project.
  
- **Example Firebase Configuration**: You can use the `firebase.example.js` file as a template for your `firebase.js` setup. Simply rename `firebase.example.js` to `firebase.js` and replace the placeholders with your Firebase project credentials.

## **Technologies Used**
- **React**: JavaScript library for building user interfaces.
- **Firebase**: Backend-as-a-Service for authentication and data storage.
- **Tailwind CSS**: Utility-first CSS framework for building modern UIs.
- **Motion (formerly Framer Motion)**: Library for creating animations in React.

## **Contributing**
Feel free to fork the repository, make improvements, and submit pull requests. If you encounter any issues, please open an issue on GitHub.
```

---

### **Summary:**
This README provides setup instructions for your social media simulation app, outlining the steps to clone the repository, install dependencies, and configure Firebase. It highlights that the `firebase.js` file is excluded for security reasons and provides guidance on how to set up the necessary credentials in the `.env` file. It also mentions the key technologies used in the app: **React**, **Firebase**, **Tailwind CSS**, and **Motion**.
