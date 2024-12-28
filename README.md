# Twitter-Like Social Media Simulation  

This is a simple simulation of a Twitter-like social media platform. It allows users to log in with their Google accounts, share their ideas, and like posts shared by others.  

## Features  
- **Google Authentication**: Users can log in using their Google account.  
- **Post Sharing**: Users can create and share posts.  
- **Likes**: Users can like posts shared by others.  
- **Responsive Design**: Tailored for various screen sizes using Tailwind CSS.  
- **Smooth Animations**: Powered by Motion (previously known as Framer Motion).  

## Tech Stack  
- **Frontend**: React  
- **Backend**: Firebase (Firestore and Authentication)  
- **CSS Framework**: Tailwind CSS  
- **Animations**: Motion  

---

## Getting Started  

Follow these steps to set up the project on your local machine:  

### Prerequisites  
Ensure you have the following installed:  
- Node.js  
- npm or yarn  
- Firebase account  

---

### Installation  

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/your-username/twitter-simulation.git  
   cd twitter-simulation

2. Install Dependencies

npm install  
# or  
yarn install


3. Set Up Firebase

Go to the Firebase Console.

Create a new project.

Set up Authentication:

Go to the "Authentication" tab and enable the Google Sign-In method.


Set up Firestore:

Go to the "Firestore Database" tab and create a database.


Obtain Firebase credentials:

Go to the "Project Settings" -> "General" tab, and copy your Firebase configuration object.




4. Modify Firebase Configurations

Create a .env file in the project root and add your Firebase credentials:

REACT_APP_API_KEY=your_api_key
REACT_APP_AUTH_DOMAIN=your_auth_domain
REACT_APP_PROJECT_ID=your_project_id
REACT_APP_STORAGE_BUCKET=your_storage_bucket
REACT_APP_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_APP_ID=your_app_id

Update the ./configs/firebase.js file to use these environment variables:

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);

export default app;



5. Run the Development Server

npm start  
# or  
yarn start




---

Dependencies

React: Frontend framework

Firebase: Backend for authentication and database

Tailwind CSS: CSS framework for styling

Motion: For animations



---

License

This project is licensed under the MIT License. See the LICENSE file for details.

Contributions

Contributions are welcome! Feel free to submit a pull request or open an issue to suggest improvements or report bugs.



