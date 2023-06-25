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

from generatePassword import generatePassword

def isValidPassword(password):
    password_length = len(password)
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
        new_password = generatePassword(password_length)
        # using recursion to check if the new password is valid
        return isValidPassword(new_password)