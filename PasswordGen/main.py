
from generatePassword import generatePassword
from isValidPassword import isValidPassword
from storePassword import storePassword

if __name__ == "__main__":
    while True:
        try:
            password_length = 14
            #password_length = int(input("How long do you want your password to be? "))
            break
        except ValueError:
            print("Please enter a valid integer.")

    notCheckedPassword = generatePassword(password_length)
    password = isValidPassword(notCheckedPassword)

    print(f'\nYour pseudo-random password is: {password}\n')
    storePassword(password)