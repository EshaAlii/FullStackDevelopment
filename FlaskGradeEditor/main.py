from flask import Flask, request, render_template, jsonify
from flask_cors import CORS

import json
import os

app = Flask(__name__, template_folder='templates', static_folder="static")
CORS(app)

# Define loading our json file and save that as our grades variable
grades = json.load(open('somegrades.json'))

# Function to add_data to our json file
def add_data(grades):
  add_data = open("somegrades.json", "w")
  json.dump(grades, add_data)
  add_data.close()

# Render HTML page
@app.route('/')
def index():
  return render_template('grades.html') 

# Load our Grades
@app.route('/grades', methods = ['GET'])
def get_grades():
    return jsonify(grades)

# Search for a Student
@app.route('/grades/<name>', methods = ['GET'])
def search_student(name):
  if name in grades:
    return {name: grades[name]}
  else:
        return "Student Not Found", 404
    
# Add a Student  
@app.route('/grades', methods = ['POST'])
def add_student():
  data = request.get_json()
  grades[data['name']] = data['grade']
  add_data(grades)
  return grades

# Delete a Student
@app.route('/grades/<name>', methods = ['PUT'])
def edit_grade(name):
    if name in grades:
          data = request.get_json()
          grades[name] = data['grade']
          add_data(grades)
          return grades
    else:
        return "Student Not Found", 404

@app.route('/grades/<name>', methods = ['DELETE'])
def delete_student(name):
      if name in grades:
            del grades[name]
            add_data(grades)
            return grades
      else:
            return "Student Not Found", 404
            
if __name__ == '__main__':
    app.run()



