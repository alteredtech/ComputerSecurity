Task 3 [Marks: 30]
Create a user interface for online account creation (i.e., sign up) with your organization, that
asks users to provide personal information noted in Task 2. After providing this information, the
user is moved to the next page for password creation.
Once password is created, your program checks if it matches with any common password
included in your ECLP 1.0 or ECLP 2.0. If a match is found, the interface alerts users about the
vulnerability of their password to dictionary attack or targeted guessing attack with
easy-to-understand explanation of why their password is vulnerable to such an attack [Example:
“Your password is vulnerable to dictionary attack since you used the dictionary word: ‘cat’, or a
variation of this word in your password”; OR “Your password is vulnerable to targeted guessing
attack since you used your mailing address or a part of it in your password”]. Then, the interface
prompts the user to create a new, stronger password.
The user-created password that is included neither in ECLP 1.0 nor in ECLP 2.0 would be
accepted by the system, which would lead to the completion of account creation process at
user’s end.
B. Secure Storage [Marks: 30]
After the user creates a password that is not vulnerable to dictionary or targeted guessing
attack, perform the following operations:
- Generate a ‘salt’.
- Concatenate the ‘salt’ to user’s password.
- Compute the hash digest of ‘password.salt’ [here, ‘.’ represents a Concatenate operation]. You
can use your hashing algorithm from Assignment 3, or any other standard Cryptography hash
function of your choice.
- Store the hash digest in a password storage file.
- Store the ‘salt’ in a separate file.
C. Secure Login [Marks: 35]
Create a login interface where a user would enter his/her username (email ID) and password.
Identify if a user’s password entered during login matches with his/her password created during
sign up. In other words, a successful login would require a match between Hash
(login-password.salt) and Hash (sign-up password.salt).
If a user enters a wrong password during login, he/she could try again. After a certain number of
consecutive failed login attempts (3 consecutive failed login attempts for this assignment), the
user would be locked out for a certain period of time (2i [i = 0, 1, 2,..] minutes for this
assignment) before he/she could attempt to log in again. See the login sequence below for a
clearer understanding of lockout rules for this assignment:
1. Failed attempt
2. Failed attempt
3. Failed attempt
Locked out for 20 = 1 minute
4. Failed attempt
5. Failed attempt
6. Failed attempt
Locked out for 21 = 2 minutes
7. Failed attempt
8. Failed attempt
9. Failed attempt
Locked out for 22 = 4 minutes
10. Failed attempt
11. Successful attempt
12. Failed attempt
13. Failed attempt
14. Failed attempt
Locked out for 20 = 1 minute