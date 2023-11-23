# Q5: GRADES PROGRAM

import json

while True:

    # Open the file in read mode
    with open('grades.txt', 'r') as file:

        # Read the dictionary from our grades.txt file
        grades = json.load(file)

    # Ask the user to input a letter for each option
    entered_letter = input("[C]reate student info, [A]sk for grade, [E]dit grade, [D]elete grade, or Cancel [X]: ")
    print("\n")

    # Make that letter lowercase
    lower_entered = entered_letter.lower()

    # If the user enters C...
    if lower_entered == 'c':

        # Tell the user the current students/grades
        print("Here is the current students and grades for reference: ")
        print(grades)
        print("\n")

        # Inform the user of their choice
        print("You chose to create a new student with a new grade!")

        # We will ask them to input a name and grade
        create_name = input("Enter a name: ")
        create_grade = float(input("Enter a grade: "))

        # Add to our dictionary with this format
        grades[create_name] = create_grade

        # Open the file in write mode
        with open('grades.txt', 'w') as file:

            # Write our dictionary to our grades.txt file
            json.dump(grades, file)

            # Print out our updated dictionary
            print("Here is the updated student information: ")
            print(grades)
            print("\n")

    # If the user enters A...
    elif lower_entered == 'a':

        # Inform the user of their choice
        print("You chose to search for a student!")

        # Ask them for a name
        ask_name = input("Enter a student's name to get their grade: ")

        # If the name matches any of those in the dictionary...
        if ask_name in grades:

            # Print out the corresponding grade
            print(f"The grade for {ask_name} is {grades[ask_name]}%")
            print("\n")

        # Otherwise if the name doesn't match those in the dictionary
        else:
            # Inform them that the student does not exist or was deleted
            print("The student either does not exist or was deleted.")
            print("\n")

    # If the user enters E...
    elif lower_entered == 'e':

        # Inform the user of their choice
        print("You chose to edit a student's grade!")

        # Ask them for a name
        edit_name = input("Enter a student's name to edit their grade: ")

        # If the name matches any of those in the dictionary...
        if edit_name in grades:

            # Ask them for the student's new grade
            edit_grade = float(input("Enter the student's new grade: "))

            # Add to our dictionary with this format
            grades[edit_name] = edit_grade

            # Open the file in write mode
            with open('grades.txt', 'w') as file:
                # Write our dictionary to our grades.txt file
                json.dump(grades, file)

                # Print out our updated dictionary
                print("Here is the updated student information: ")
                print(grades)
                print("\n")

        # Otherwise if the name doesn't match those in the dictionary
        else:
            # Inform them that the student does not exist or was deleted
            print("The student either does not exist or was deleted.")
            print("\n")

    # If the user entered D...
    elif lower_entered == 'd':

        # Inform the user of their choice
        print("You chose to delete a student and their grade!")

        # Ask them for the student's name
        delete_name = input("Enter a student's name to delete their grade: ")

        # If the name matches any of those in the dictionary...
        if delete_name in grades:

            # Delete that name and the corresponding grade
            del(grades[delete_name])

            # Open the file in write mode
            with open('grades.txt', 'w') as file:

                # Write our dictionary to our grades.txt file
                json.dump(grades, file)

                # Print out our updated dictionary
                print("Here is the updated student information: ")
                print(grades)
                print("\n")

        # Otherwise if the name doesn't match those in the dictionary
        else:
            # Inform them that the student does not exist or was deleted
            print("The student either does not exist or was deleted.")
            print("\n")

    # If the user enters X...
    elif lower_entered == 'x':

        # We leave them a message and end the program
        print("Thank you for updating our list!")
        print("\n")
        break

    # Otherwise, if the user enters anything else
    else:
        # Ask the user to use the letters in brackets
        print("Please use the letters given in brackets.")
        print("\n")