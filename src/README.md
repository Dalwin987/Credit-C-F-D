# Credit Card Fraud Detector

A React web application that predicts if a credit card transaction is fraudulent using a Python machine learning model. Flask is used for communication between the Python backend and the React app.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [How It Works](#how-it-works)
- [Backend Details](#backend-details)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Introduction

Credit Card Fraud Detector is a web application built with React for the frontend and a Python machine learning model for the backend. It predicts if a credit card transaction is fraudulent based on the input transaction data.

## Features

- **User-friendly Interface:** Simple interface to input transaction data and predict fraud.
- **Real-time Predictions:** Quickly processes input to provide fraud detection.
- **Machine Learning:** Utilizes a trained machine learning model for accurate predictions.

## Installation

### Prerequisites

- Node.js
- Python 3.x
- pip (Python package installer)

### Frontend Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/LavKalsi/CreditCardFraudDetector.git
    cd CreditCardFraudDetector
    ```

2. Navigate to the `frontend` directory and install dependencies:
    ```sh
    cd frontend
    npm install
    ```

3. Start the React application:
    ```sh
    npm start
    ```

### Backend Setup

1. Create and activate a virtual environment (optional but recommended):
    ```sh
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    ```

2. Install the required Python packages:
    ```sh
    pip install -r res/requirements.txt
    ```

3. Run the backend server:
    ```sh
    python res/FraudDetector.py
    ```

## Usage

1. Ensure both the frontend and backend servers are running.
2. Open your browser and navigate to `http://localhost:3000`.
3. Enter the transaction data.
4. Click the "Check" button to receive the fraud prediction.

## How It Works

The Credit Card Fraud Detector web app allows users to predict if a transaction is fraudulent. Here's how you can use it:

1. **Input Data:** Users can input transaction details into the provided fields on the web app.
2. **Submit for Prediction:** After entering the details, users click the "Check" button to submit the information for analysis.
3. **Backend Processing:** The frontend sends the transaction data to the backend Python server, where the machine learning model processes them.
4. **Receive Results:** The backend returns the prediction result (fraudulent or not) to the frontend, which is then displayed to the user.

## Backend Details

The backend is a Python Flask application that serves a machine learning model trained to predict fraudulent transactions. The backend files, including the model and Flask app, are located in the `res` folder.

### Files in `res` Folder

- `FraudDetector.py`: The Flask application that handles HTTP requests from the frontend.
- `creditcard.model`: The trained machine learning model.
- `requirements.txt`: The dependencies required for the Python backend.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have any improvements or suggestions.

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

LavKalsi - [GitHub](https://github.com/LavKalsi)

Feel free to contact me if you have any questions or suggestions!
