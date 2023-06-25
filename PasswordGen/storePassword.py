
def storePassword(password):  # this function stores the password in a txt file
    print('Storing password...')
    with open('passwords.txt', 'a') as file:
        file.write(password)
        file.write("\n\n")  # it adds a blank line between each password