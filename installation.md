* Ensure you have the following installed:​​ 

* Python (≥ 3.x) → Download Python [https://www.python.org/downloads/]

* MySQL → Download MySQL [https://www.mysql.com/downloads/] (MySQL tutorial: [https://www.datacamp.com/tutorial/my-sql-tutorial])

* Git → Download Git [https://git-scm.com/]

1️⃣ Clone the Repository
```
git clone https://github.com/kathy20316/EducationOrder
cd EducationOrder
```

2️⃣ Set Up Backend (Django)

# Create a virtual environment and install dependencies for the project to separate from system-wide Python installations
```
python3 -m venv venv
source venv/bin/activate    # On Windows, use: venv\Scripts\activate, check "which python3" to see if the virtual environment is set up
                            # Now we can use "python -V" instead of "python3 -V" when we activate the virtual environment
pip install django          # check with "pip list", "python -m django --version"
```
OR 
```
pip install djangorestframework mysqlclient
```
```
pip freeze > requirements.txt   # Save Dependencies
deactivate  # when need to deactivate the virtual environment
```
To start Django project:
    django-admin startproject <project_name>

To run development server:
    python manage.py runserver


3️⃣ Set Up Frontend (React)

* Install Node.js (Optional): Check Node.js version, install or update if it is below v16. [https://nodejs.org/en/download]
node -v
npm -v
npm init (or npm init -y)   # Initialize a New package.json File
    create index.js file as main entry of package.json
npm install     # Generate package-lock.json

* Create React App:
In the project directory:
```
npm create vite@latest  # projectName: frontend, framework: React, variant: Javascript + SWC
cd frontend
npm install
npm run dev
```
Using Vite to create a React app
https://dev.to/ag2byte/create-react-app-is-officially-dead-h7o 

4️⃣ Running Tests

Run Django tests:
```
python3 manage.py test
```

Run React tests:
```
npm test
```

5️⃣ Deployment

The project uses GitHub Actions for CI/CD.
Push to main or develop branches to trigger deployment workflows.​​
