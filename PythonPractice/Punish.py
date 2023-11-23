# Q2: PUNISHMENT AUTOMATION PROGRAM

# Prompt the user to enter a sentence
punish = input("Enter a sentence: ")

# Prompt the user the number of times to repeat said sentence
nums = input("Enter the number of times to repeat the sentence: ")

# Convert the number from a str into an int
number = int(nums)

# Create a filepath to our .txt file
file_path = "CompletedPunishment.txt"

# Open the file in write mode
with open(file_path, "w") as file:

  # Until the number is 0
  while number != 0:
    # We will write the user entered string into the file
    file.write(punish)

    # Add a newline
    file.write("\n")

    # And decrement our number variable
    number = number - 1