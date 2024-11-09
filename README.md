# Fusion_System_Administrator


## Password Generation Guide

### Env file

```
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=''
EMAIL_HOST_PASSWORD=''
EMAIL_TEST_USER='{An email to which the test emails will be sent}'
EMAIL_TEST_MODE=1 # 0 for production, 1 for testing
EMAIL_TEST_COUNT=1 # Number of test emails to be sent
```

- The Api `users/mail-batch/` is used for updating / adding the passwords and mailing the passwords to the users. Put batch year in the request body
- To send the emails, in the client -> user management -> create user -> { Mail Batch Button }
- The email will be sent to the email address of the user with the password and the password hash in the database is updated
- The failed emails will be added to `Backend/backend/failed_emails/failed_emails.txt` file

