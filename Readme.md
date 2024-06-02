# Patient Gateway API

This project provides an API for managing patient data. It allows you to fetch patient information from a MongoDB database based on optional parameters such as patient name and next appointment date.

## Features

- Fetch patient data by name
- Fetch patient data by next appointment date
- Fetch all patient data if no parameters are provided
- CORS enabled for all routes

## Prerequisites

- Python 3.x
- MongoDB instance (local or remote)
- Required Python packages (listed in `requirements.txt`)

## Setup

1. **Clone the repository:**

   ```sh
   git clone https://github.com/29deepanshutyagi/Patient.git
   cd Patient
Create a virtual environment and activate it:


python3 -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
Install the required packages:


pip install -r requirements.txt
Set up your MongoDB connection:

Update the MongoDB connection string in app.py if necessary. The current connection string is:

python
Copy code
client = MongoClient("mongodb+srv://assesment_user:uYdY!7f9C-HnX%40Y@cluster0.vcxxyf3.mongodb.net/Formulo_assesment")
Running the Application
To run the Flask application, execute:

sh
Copy code
python app.py
The application will start on http://localhost:5000.

API Endpoints
Get Patients
URL: /patients

Method: GET

Query Parameters:

name (optional): The name of the patient to search for (supports partial and case-insensitive matching).
next_appointment (optional): The date and time of the next appointment to search for.
Response:

json
Copy code
{
    "code": 200,
    "status": "Success",
    "data": [
        {
            "_id": "1234567890abcdef",
            "patient_name": "John Doe",
            "next_appointment": "Wed, 29 May 2024 17:22:01 GMT",
            "chatHistory": []
        },
        ...
    ]
}
Examples:

Fetch all patients:

sh
Copy code
curl http://localhost:5000/patients
Fetch patients by name:

sh
Copy code
curl http://localhost:5000/patients?name=John
Fetch patients by next appointment:

sh
Copy code
curl "http://localhost:5000/patients?next_appointment=Wed, 29 May 2024 17:22:01 GMT"
Project Structure
bash
Copy code
Patient/
│
├── app.py              # Main Flask application
├── requirements.txt    # List of required Python packages
└── README.md           # Project documentation
Dependencies
Flask
Flask-CORS
pymongo
Install all dependencies using:
pip install -r requirements.txt

#Contributing
Contributions are welcome! Please submit a pull request or open an issue to discuss any changes.

License
This project is licensed under the MIT License. See the LICENSE file for details.


### Notes
- Replace any placeholders or example values with the actual details of your project.
- Ensure the MongoDB connection string and any other sensitive information are securely managed, not exposed directly in the code or documentation.

This `README.md` provides a comprehensive overview of your project, setup instructio