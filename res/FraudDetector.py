from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from joblib import load

app = Flask(__name__)
CORS(app)

# Load trained model
model = load("creditcard.model")

# If you trained using StandardScaler, uncomment:
# scaler = load("scaler.pkl")


def predict_fraud(features):
    features = np.array(features, dtype=float).reshape(1, -1)

    # If scaler exists, use this:
    # features = scaler.transform(features)

    prediction = model.predict(features)[0]

    probability = None
    if hasattr(model, "predict_proba"):
        probability = model.predict_proba(features)[0].tolist()

    return prediction, probability


@app.route("/predict", methods=["POST"])
def predict():

    try:
        data = request.get_json()

        if not data or "input" not in data:
            return jsonify({
                "error": "Missing input."
            }), 400

        values = [float(x.strip()) for x in data["input"].split(",")]

        if len(values) != 30:
            return jsonify({
                "error": f"Expected 30 values, received {len(values)}"
            }), 400

        print("\nReceived Input")
        print(values)

        prediction, probability = predict_fraud(values)

        print("Prediction :", prediction)

        if probability:
            print("Probability :", probability)

        return jsonify({
            "prediction": int(prediction),
            "result": "Fraudulent" if prediction == 1 else "Non-Fraudulent",
            "probability": probability
        })

    except ValueError:
        return jsonify({
            "error": "Only numeric values separated by commas are allowed."
        }), 400

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500


if __name__ == "__main__":
    app.run(debug=True)