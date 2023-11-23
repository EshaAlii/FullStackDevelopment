# Q3: WORD COUNT PROGRAM

# Prompt the user to enter a word 
entered_word = input("Enter a word: ")

# Make it lowercase for comparison
lower_entered = entered_word.lower()

# Prompt the user the number of times to repeat said sentence
count = 0

# Create a filepath to our .txt file
file_path = "PythonSummary.txt"

# Open the file in read mode
with open(file_path, "r") as file:

  # For each line in the file
  for line in file:
    
    # We will esentially split each line into a series of words
    words = line.split()
    
    # For each word 
    for word in words:

      # We make the word lowercase for comparison
      lower = word.lower()

      # And if the user entered word (lowercase) is equal to the word in the file (lowercase)
      if lower_entered == lower:

        # We increase the count by 1
        count = count + 1

# We then print out how many times the word showed up in the .txt file
print(f"The word {entered_word} occurs {count} times.")

