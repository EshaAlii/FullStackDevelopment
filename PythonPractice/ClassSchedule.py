# Q4: CLASS SCHEDULE FORMATTING PROGRAM

# Create a class called courses
class Courses:

  # Courses Constructor
  def __init__(self, dep, num, name, credits, lecture_days, start, end, avg_grade):

    # Incorporate the following variables through our constructor
    self.dep = dep
    self.num = num
    self.name = name
    self.credits = credits
    self.lecture_days = lecture_days
    self.start = start
    self.end = end
    self.avg_grade = avg_grade

  # Courses Format Function
  def format(self, num):
    
    # Define how we want to format our output
    output = f'COURSE {num}: {self.dep}{self.num}: {self.name}\n'
    
    output = output + f'Number of Credits: {self.credits}\n'

    output = output + f'Days of Lectures: {self.lecture_days} \n'

    output = output + f'Lecture Time: {self.start} - {self.end}\n'

    output = output + f'Stat: on average, students get {self.avg_grade}% in this course'

    # Return our output
    return output
  
    

# Create a filepath to our .txt file
file_path = "classesInput.txt"

# Make our count variable 1
count = 1

# Open the file in read mode
with open(file_path, "r") as file:

  # Read our first line and save the number
  zero = file.readline()

  # Convert the first line to an int to use as our counter
  line_zero = int(zero)

  # Until our first line counter reaches 0
  while line_zero != 0:

    # Convert our count variable (for our print function) zero
    count_str = str(count)

    # Read each line individually and strip each line to save course info accordingly
    dep = file.readline()
    dep = dep.strip()

    num = file.readline()
    num = num.strip()

    name = file.readline()
    name = name.strip()

    credits = file.readline()
    credits = credits.strip()

    lecture_days = file.readline()
    lecture_days = lecture_days.strip()

    start = file.readline()
    start = start.strip()

    end = file.readline()
    end = end.strip()

    avg_grade = file.readline()
    avg_grade = avg_grade.strip()


    # Create our Course Class
    courses = Courses(dep, num, name, credits, lecture_days, start, end, avg_grade)

    # Format our Course information and save it as our output
    output = courses.format(count)

    # Print our output
    print(output)

    # Print spacing
    print("\n")

    # Decrement our line counter
    line_zero = line_zero - 1

    # Increment our print counter
    count = count + 1
    
      