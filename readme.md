# Chat App

## Description

An app for mobile devices using React Native used for chatting. The app provides users with a chat interface and options to share images and their location.

## Application features

- A page where users can enter their name and choose a color for the user's message bubbles before joining the chat.
- A page displaying the conversation, as well as an input field and submit button.
- Data gets stored online and offline.
- The chat provides users with two additional communication features: sending images and location data.

<img width="480" alt="sample_2" src="https://user-images.githubusercontent.com/39118847/235656430-0df32738-3014-4bef-8e74-1f914ca8d04d.png">


## Tech stack

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Google Firestore Database](https://firebase.google.com/)
- Google Firebase Authentication
- [React Native Gifted Chat](https://github.com/FaridSafi/react-native-gifted-chat)

## Installation

Clone the repository:

```shell
git clone https://github.com/maniksom/chat.git
cd chat
```

In the `App.js` file replace the `firebaseConfig` variable with the configuration info from your own Firestore database:

```js
firebase.initializeApp({
  apiKey: "your-api-key",
  authDomain: "your-authdomain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id",
});
```

## Getting Started

To get started with the application, follow these steps:

- install suitable version of Node. Expo only supports Node 16.xx.xx at max. Run folowing command in your terminal `nvm install 16.19.0`
  `nvm use 19.19.0` (or change for later vercion on your choise) `nvm alias default 16.19.0` (only for Mac users)
- Install Expo CLI as a global npm package: `npm install expo-cli -g`
- Create an account and log in at https://expo.dev/.
- Login with your Expo account using `expo login`
- Install the Expo Go App from [Apple Store](https://apps.apple.com/us/app/expo-go/id982107779) or [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent&gl=DE) to test the project on your mobile device
- For better testing experience install [Android Studio](https://developer.android.com/studio) for Android Emulator or [Xcode](https://apps.apple.com/de/app/xcode/id497799835?mt=12) for ios Simulator to test the app
- Clone this repo and save on your local divise
- Navigate to the project folder in the Terminal/PowerShell, then run `npm install` from within the project folder to install dependencies.
- Start the project: `npx expo start`
- Scan the QR code provided in your terminal with your mobile devices
- In terminal type `a` to run the project on Android Emulator,  type `i` to run the project on iOS.

## Dependencies

See [package.json](https://raw.githubusercontent.com/manikSom/chat/master/package.json)



