# Online Shopping Store

This is a simple online shopping store built using Node.js, Express.js, MongoDB, and EJS (Embedded JavaScript) for the frontend. The application allows users to browse products, add them to the cart, and make purchases.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [File Structure](#file-structure)
- [Contributing](#contributing)
- [License](#license)

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/hzaheer48/online-shopping-store.git
    cd online-shopping-store
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Set up your MongoDB database and update the connection string in `config/db.js`.

4. Start the application:
    ```bash
    node app.js
    ```

## Usage
- Visit [http://localhost:8080](http://localhost:8080) in your browser to access the online shopping store.
- Browse products, add them to the cart, and proceed to checkout.
- Users can create accounts, log in, and view order history.

## Dependencies
- Node.js
- Express.js
- MongoDB
- EJS
- Body-parser
- Express-session
- Connect-flash

## File Structure
- **config/db.js:** MongoDB connection setup.
- **public:** Static files (stylesheets, images, etc.).
- **router:** Route handlers for different sections (index, products, users).
- **views:** EJS templates for rendering pages.
- **app.js:** Main application file containing Express setup.

## Screenshots
![Alt text](/screenshots/screenshot_1.png?raw=true "Optional Title")
![Alt text](/screenshots/screenshot_2.png?raw=true "Optional Title")
![Alt text](/screenshots/screenshot_3.png?raw=true "Optional Title")
![Alt text](/screenshots/screenshot_4.png?raw=true "Optional Title")
![Alt text](/screenshots/screenshot_5.png?raw=true "Optional Title")
![Alt text](/screenshots/screenshot_6.png?raw=true "Optional Title")
![Alt text](/screenshots/screenshot_7.png?raw=true "Optional Title")
![Alt text](/screenshots/screenshot_8.png?raw=true "Optional Title")


## Contributing
Feel free to contribute to the project by opening issues or submitting pull requests. Follow the [Contributing Guidelines](CONTRIBUTING.md) for more details.

