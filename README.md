# Twitter-Like Social Media Simulation

This project is a simulation of a Twitter-like social media platform. Users can log in using their Google accounts, share ideas, and like posts. The application is built using React, with Firebase as the backend, Tailwind CSS for styling, and Motion for animations.

## Features

- **Google Authentication**: Users can log in with their Google accounts.
- **Post Sharing**: Users can create and share their ideas.
- **Post Liking**: Users can like posts shared by others.
- **Responsive Design**: Styled using Tailwind CSS for a modern and responsive interface.
- **Smooth Animations**: Powered by Motion (previously known as Framer Motion).

---

## Prerequisites

To run this project locally, ensure you have the following installed:

- Node.js (v14 or later)
- npm or yarn

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/twitter-like-social-media.git
   cd twitter-like-social-media
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up Firebase:
   - Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
   - Enable **Authentication** and choose **Google Sign-In** as a provider.
   - Enable **Firestore** for database functionality.
   - Copy your Firebase project credentials.

4. Update the `./configs/firebase.js` file:
   Replace placeholders with your Firebase project credentials. Example:
   ```javascript
   const firebaseConfig = {
     apiKey: process.env.REACT_APP_API_KEY,
     authDomain: process.env.REACT_APP_AUTH_DOMAIN,
     projectId: process.env.REACT_APP_PROJECT_ID,
     storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
     messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
     appId: process.env.REACT_APP_APP_ID
   };

   export default firebaseConfig;
   ```

5. Create a `.env` file in the project root:
   ```env
   REACT_APP_API_KEY=your-api-key
   REACT_APP_AUTH_DOMAIN=your-auth-domain
   REACT_APP_PROJECT_ID=your-project-id
   REACT_APP_STORAGE_BUCKET=your-storage-bucket
   REACT_APP_MESSAGING_SENDER_ID=your-messaging-sender-id
   REACT_APP_APP_ID=your-app-id
   ```

---

## Running the Application

1. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

2. Open your browser and navigate to `http://localhost:3000` to view the application.

---

## Dependencies

- **Firebase**: Backend services and authentication.
- **Tailwind CSS**: Modern utility-first CSS framework.
- **Motion**: For seamless animations.

---

## Contribution

Contributions are welcome! If you find any issues or have ideas for improvements, feel free to open an issue or submit a pull request.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

