import numpy as np
import json
from js import fetch, JSON

weights = None

def load_weights(w1_data, w2_data, b1_data, b2_data):
    global weights
    weights = {
        'w1': np.array(w1_data),
        'w2': np.array(w2_data),
        'b1': np.array(b1_data),
        'b2': np.array(b2_data)
    }

def relu(x):
    return np.maximum(0, x)

def softmax(x):
    exp_x = np.exp(x - np.max(x))
    return exp_x / np.sum(exp_x)

def predict(input_array):
    input_array = np.array(input_array)
    
    z1 = weights['w1'] @ input_array + weights['b1'].flatten()
    a1 = relu(z1)
    z2 = weights['w2'] @ a1 + weights['b2'].flatten()
    ypred = softmax(z2)
    
    digit = int(np.argmax(ypred))
    confidence = float(ypred[digit])
    probabilities = ypred.tolist()
    
    return {
        'digit': digit,
        'confidence': confidence,
        'probabilities': probabilities
    }
