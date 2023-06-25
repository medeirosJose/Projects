#according to IBM, ascii goes from 33 to 126

from random import *

#password_length = int(input("How long do you want your password to be? "))
password_length = 14
#chr returns the value in unicode / ascii
#ord returns the value of the character in unicode / ascii
def generatePassword(password_length = password_length):
    #print('entering generator')
    generatedPassword = []

    for char in range(password_length):
        random_char = str(chr(randint(33,126)))
        generatedPassword.append(random_char)
    
    formated_password =(''.join(generatedPassword))
    return formated_password

#print(generatedPassword)

#print(chr(24))

numbers = [chr(i) for i in range(48, 58)]
numbers = (''.join(numbers))

special_characters = [chr(i) for i in range(33, 48)]
special_characters.extend([chr(i) for i in range(58, 65)])
special_characters.extend([chr(i) for i in range(91, 97)])
special_characters.extend([chr(i) for i in range(123, 127)])
special_characters = (''.join(special_characters))

lower_case = [chr(i) for i in range(97, 123)]
lower_case = (''.join(lower_case))


upper_case = [chr(i) for i in range(65, 91)]
upper_case = (''.join(upper_case))

'''print('\nNumbers',numbers)
print('\nSpecial Characters',special_characters)
print('\nLower Case',lower_case)
print('\nUpper Case',upper_case)
print()'''

def storePassword(password): #this function stores the password in a txt file
    with open('passwords.txt', 'a') as file:
        file.write(password)
        file.write("\n\n") #it adds a blank line between each password

def isValidPassword(password):
    hasNumber = False
    hasSpecial = False
    hasLower = False
    hasUpper = False
    numberCount = 0
    specialCount = 0
    lowerCount = 0
    upperCount = 0

    for char in password:
        if char in numbers:
            if numberCount < 1:
                hasNumber = True
                #print(char)
                numberCount += 1

        if char in special_characters:
            if specialCount < 1:
                #print(char)
                hasSpecial = True
                specialCount += 1

        if char in lower_case:
            if lowerCount < 1:
                #print(char)
                hasLower = True
                lowerCount += 1

        if char in upper_case:
            if upperCount < 1:
                #print(char)
                hasUpper = True
                upperCount += 1

    if hasNumber and hasSpecial and hasLower and hasUpper:
        #print('Password is valid')
        return password
    else:
        #print('\n\n\nPassword is not valid')
        new_password = generatePassword() #calling the function again to generate a new password
        return isValidPassword(new_password) #using recursion to check if the new password is valid

notCheckedPassword = generatePassword()
password = isValidPassword(notCheckedPassword)

print(password)
storePassword(password)
