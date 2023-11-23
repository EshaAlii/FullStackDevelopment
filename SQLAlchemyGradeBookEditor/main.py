from flask import Flask, request, render_template, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

import json
import os

# Create our Flask App
app = Flask(__name__, template_folder='templates', static_folder="static")

# Establish our Flask App context
with app.app_context():
  
  # Configure our database (referencing our database folder)
  app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database"

  # Initialize SQLAlchemy in our Flask App
  sql_info = SQLAlchemy(app)
  
  # Enable CORS (for pesky browser errors)
  CORS(app)
  
  # SQLAlchemy class/model for student information
  class student_info(sql_info.Model):
    id = sql_info.Column(sql_info.Integer, primary_key = True)
    Name = sql_info.Column(sql_info.String, nullable = False, unique = True)
    Grade = sql_info.Column(sql_info.Float, nullable = False, unique = False)
    
    # Constructor for our name + grade of student info class/model
    def __init__ (self, Name, Grade):
      self.Name = Name
      self.Grade = Grade
      
  # Create our database tables based on the class/model
  sql_info.create_all()


# Create our json dictionary
json = {}

# Render HTML page
@app.route('/')
def index():
  return render_template('grades.html')

# Load Grades/Student Info
@app.route('/grades', methods = ['GET'])
def get_grades():
      
  # Go through the data base of all student information
  for student in student_info.query.all():
        
    # Update Json dictionary (if needed)
    json.update({student.Name: student.Grade})
    
  # Return our json dictionary
  return json

# Search for a Student
@app.route('/grades/name>', methods = ['GET'])
def search_student(name):
  
  # Go through the data base of all student information, filtering by the name
  for student in student_info.query.filter_by(Name = name):
        
    # Update Json dictionary (if needed)
    json.update({student.Name: student.Grade})
    
  # Return our json dictionary
  return json
    
# Add Student  
@app.route('/grades', methods = ['POST'])
def add_student():
      
  # Get student data from POST request
  submit = request.get_json()
  Name = submit['name']
  Grade = submit['grade'] 
  
  # Create a new student information
  new_student = student_info(Name, Grade)
  sql_info.session.add(new_student)
  
  # Commit the changes to the database
  sql_info.session.commit()
  
  # Go through the data base of all student information, filtering by the name
  for student in student_info.query.all():
      
    # Update Json dictionary
    json.update({student.Name: student.Grade})
    
  # Return our json dictionary
  return json

# Edit Student Grade
@app.route('/grades/<name>', methods = ['PUT'])
def edit_grade(name):
  
  # Get student data from PUT request
  submit = request.get_json()
  NewGrade = submit['grade']
  
  # Filter the student by their name
  Student = student_info.query.filter_by(Name = name)
  
  # Update their grade
  Student = Student.update(dict(Grade = NewGrade))
  
  # Commit the changes to the database
  sql_info.session.commit()
  
  # Go through the data base of all student information
  for student in student_info.query.all():
        
    # Update Json dictionary
    json.update({student.Name: student.Grade})
    
  # Return our dictionary
  return json

# Delete Student
@app.route('/grades/<name>', methods=['DELETE'])
def delete_student(name):
    
  # Go through the data base of student information, filtering by the name
  delete_student = student_info.query.filter_by(Name=name).first()
  
  # If we want to delete the student
  if delete_student:
        
    # Remove the student from the database
    sql_info.session.delete(delete_student)
    sql_info.session.commit()
    
    # And Remove the student from the JSON dictionary
    json.pop(name, None) 
    
  # Otherwise...
  else:
        
    # Return a "student not found" error message
    return jsonify({"message": "Student not found."}, 404)
  
  # Return our dictionary
  return json

            
if __name__ == '__main__':
    app.run()



