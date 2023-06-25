# according to IBM, ascii goes from 33 to 126

from random import *

password_length = int(input("How long do you want your password to be? "))
# password_length = 14

# chr returns the value in unicode / ascii
# ord returns the value of the character in unicode / ascii

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


def generatePassword(password_length=password_length):
    generatedPassword = []

    for char in range(password_length):
        random_char = str(chr(randint(33, 126)))  # a <= N <= b
        generatedPassword.append(random_char)

    formated_password = (''.join(generatedPassword))
    return formated_password


def isValidPassword(password):
    hasNumber = False
    hasSpecial = False
    hasLower = False
    hasUpper = False

    for char in password:
        if char in numbers:
            # print(char)
            hasNumber = True

        if char in special_characters:
            # print(char)
            hasSpecial = True

        if char in lower_case:
            # print(char)
            hasLower = True

        if char in upper_case:
            # print(char)
            hasUpper = True

    if hasNumber and hasSpecial and hasLower and hasUpper:
        # password is valid
        return password
    else:
        # password is not valid
        # calling the function again to generate a new password
        new_password = generatePassword()
        # using recursion to check if the new password is valid
        return isValidPassword(new_password)


def storePassword(password):  # this function stores the password in a txt file
    print('Storing password...')
    with open('passwords.txt', 'a') as file:
        file.write(password)
        file.write("\n\n")  # it adds a blank line between each password


notCheckedPassword = generatePassword()
password = isValidPassword(notCheckedPassword)

print(f'\nYour pseudo-random password is: {password}\n')
storePassword(password)
