from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

client = MongoClient("mongodb+srv://assesment_user:uYdY!7f9C-HnX%40Y@cluster0.vcxxyf3.mongodb.net/Formulo_assesment")
db = client.Formulo_assesment
collection = db['patient-gateway']

@app.route('/patients', methods=['GET'])
def get_patients():
    patient_name = request.args.get('name', None)
    next_appointment = request.args.get('next_appointment', None)
    
    query = {}
    if patient_name:
        query['patient_name'] = {'$regex': patient_name, '$options': 'i'}  # Case-insensitive search
    if next_appointment:
        try:
            # Convert the string date to a datetime object
            next_appointment_date = datetime.strptime(next_appointment.strip('"'), '%a, %d %b %Y %H:%M:%S %Z')
            # Convert it back to a string with the desired format
            next_appointment_str = next_appointment_date.strftime('%a, %d %b %Y')
            query['next_appointment'] = {'$regex': next_appointment_str}
        except ValueError:
            return jsonify({'code': 400, 'status': 'Error', 'message': 'Invalid date format. Use "Wed, 29 May 2024 17:22:01 GMT".'})

    patients = list(collection.find(query))
    for patient in patients:
        patient['_id'] = str(patient['_id'])  # Convert ObjectId to string
        patient['chatHistory'] = patient.get('chatHistory', [])  # Ensure chatHistory is always an array

    return jsonify({'code': 200, 'status': 'Success', 'data': patients})

if __name__ == '__main__':
    app.run(debug=True)
