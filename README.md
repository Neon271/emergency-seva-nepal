# Emergency Sewa - Nepal Emergency Services App

Emergency Sewa is a mobile-first web application designed to provide quick and easy access to emergency service numbers and information across Nepal. Built with Next.js and Capacitor, it's designed to be a reliable guide in times of need.

## ✨ Features

*   **Emergency Contacts:** Find numbers for police, hospitals, ambulances, fire brigades, and more.
*   **Location-Based Filtering:** Automatically shows contacts for your selected province and district.
*   **Offline Access:** Works without an internet connection after the initial load (PWA).
*   **Custom Contacts:** Save your own personal emergency contacts for quick access.
*   **Favorite Contacts:** Mark important numbers as favorites.
*   **Emergency Guide:** Simple, actionable guides for common emergencies like earthquakes, floods, and snake bites.
*   **Emergency SMS:** A one-tap button to quickly send an SMS with your location to an emergency contact.
*   **Dark Mode:** Switch between light and dark themes for comfortable viewing.

## 🚀 Getting Started (for Local Development)

To run this project for development on your local machine:

1.  **Clone the repository or download the source code.**

2.  **Navigate to the project directory:**
    ```bash
    cd [your-project-folder]
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## 📜 Available Scripts

*   `npm run dev`: Runs the app in development mode.
*   `npm run build`: Creates a production-ready build of the web app.
*   `npm run cap:add:android`: Adds the Android platform for Capacitor.
*   `npm run cap:sync`: Syncs the web build with the native Android project.

## 📱 Building the Android APK from Source

To package the web app as an Android APK on your local machine, follow these steps precisely.

1.  **Get the Code:**
    Download the project `.zip` file from Firebase Studio and unzip it. Or, clone the repository.

2.  **Open a Terminal:**
    Navigate your terminal (like Command Prompt, PowerShell, or Git Bash) into the project folder.
    ```bash
    cd [your-project-folder]
    ```

3.  **Install Dependencies:**
    This command reads `package.json` and downloads the necessary libraries into a `node_modules` folder. This step is essential.
    ```bash
    npm install
    ```

4.  **Build the Web App:**
    This creates a production-ready build of the Next.js app in the `out` directory.
    ```bash
    npm run build
    ```

5.  **Sync the Web Build:**
    This command copies your web app build into the native Android project.
    ```bash
    npm run cap:sync
    ```
    *(Note: If you haven't added the android platform before, you may need to run `npm run cap:add:android` first.)*

6.  **Open in Android Studio:**
    This command opens the native project in Android Studio automatically.
    ```bash
    npx cap open android
    ```

7.  **Generate Signed APK:**
    *   In Android Studio, go to **Build > Generate Signed Bundle / APK...**.
    *   Select **APK** and click **Next**.
    *   Create or use an existing **keystore** to sign your app.
    *   Select the **release** build variant.
    *   Click **Create**.

The final APK will be located in `android/app/release/app-release.apk`.
