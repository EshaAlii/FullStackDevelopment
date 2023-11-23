# Q1: ADDING PROGRAM

# Create a list
mylist = []

# Ask the user to input numbers
item_input = input("Enter two or more numbers separated by spaces: ")

# Use the split function so we can do separated spaces
item = item_input.split()

# Make our sum variable 0
sum = 0

# For item string that is inputted
for item_str in item:
  try:
    # Turn that item into a float
    it = float(item_str)

    # Increase the sum
    sum = sum + it

    # Append the item into the list
    mylist.append(it)

  # If the Value cannot be converted from a string to a float
  except ValueError:
    
    # We print out an error
    print("Error: You entered a letter")

    # And break our loop
    break
    
# While we traverse our list
for i in range(len(mylist)):
  
  # If the length of our list is 1
  if len(mylist) == 1:
    
    # We print out an error
    print("Error: You entered only one number")

    # And break our loop
    break

  # Otherwise if the items of our list are floats
  elif mylist[i] == float(mylist[i]):
    
    # We will print the sum fo the numbers appended to the list
    print("Sum of numbers appended to the list:", sum)

    # And break our loop
    break