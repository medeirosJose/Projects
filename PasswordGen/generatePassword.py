from random import *

def generatePassword(password_length):
    generatedPassword = []

    for char in range(password_length):
        random_char = str(chr(randint(33, 126)))  # a <= N <= b
        generatedPassword.append(random_char)

    formated_password = (''.join(generatedPassword))
    return formated_password