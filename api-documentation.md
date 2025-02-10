# API Documentation

---

## Introduction

This document describes the API endpoints available for our backend system. Each endpoint includes details such as the HTTP method, required parameters, request body, and example responses.


## Endpoints

---
### Endpoint 1: Get all Batches
- **URL:** `/batches/`
- **Method:** `GET`
- **Description:** Retrieves a list of all batches.
- **Response Body:**
```json
[
    {
        "id": 13,
        "name": "B.Tech",
        "year": 2016,
        "running_batch": false,
        "discipline": 2,
        "curriculum": 2
    },
    {
        "id": 81,
        "name": "Phd",
        "year": 2017,
        "running_batch": true,
        "discipline": 4,
        "curriculum": 19
    },
    ...
]
```

### Endpoint 2: Get all departments
- **URL:** `/departments/`
- **Method:** `GET`
- **Description:** Retrieves a list of all departments.
- **Response Body:**
```json
[
    {
        "id": 26,
        "name": "Finance and Accounts"
    },
    {
        "id": 27,
        "name": "Establishment"
    },
    {
        "id": 28,
        "name": "Academics"
    },
...
]
```

### Endpoint 3: Get user roles by email
- **URL:** `/get-user-roles-by-email/`
- **Method:** `GET`
- **Description:**  Fetches user details along with their associated roles based on the provided email address.
- **Request Parameters:**

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| `email`   | `string` | Yes      | The email of the user to retrieve roles for. |
- **Response Body:**
  **Success Response (200 OK)**
```json
{
    "user": {
        "id": 1,
        "password": "",
        "last_login": "2023-02-11T17:50:41.791642Z",
        "is_superuser": false,
        "username": "22BCSxxx",
        "first_name": "Jane Doe",
        "last_name": "",
        "email": "22BCSxxx@iiitdmj.ac.in",
        "is_staff": false,
        "is_active": true,
        "date_joined": "2019-11-24T14:23:49.431661Z"
    },
    "roles": [
        {
            "id": 7,
            "name": "student",
            "full_name": "Computer Science and Engineering",
            "type": "academic",
            "basic": true,
            "category": "student"
        }
    ]
}
```

### Endpoint 4: Update User's Roles
- **URL:** `/update-user-roles/`
- **Method:** `PUT`
- **Description:** Updates the roles assigned to a user based on their email. Removes roles not included in the request and adds new ones.
- **Request Paramenter:**

| Parameter   | Type   | Required | Description |
|------------|--------|----------|-------------|
| `email`    | `string` | Yes    | The email of the user whose roles need to be updated. |
| `roles`    | `array`  | Yes    | A list of role names (strings) or objects containing `name`. |

- **Response Body:**
```json
{
  "message": "User roles updated successfully."
}
```

### Endpoint 5: View All Roles
- **URL:** `/view-roles/`
- **Method:** `GET`
- **Description:** Fetches a list of all available designations.
- **Response Body:**
```json
[
    {
        "id": 48,
        "name": "Dean_s",
        "full_name": "Computer Science and Engineering",
        "type": "academic",
        "basic": false,
        "category": null
    },
    {
        "id": 59,
        "name": "sr dealing assitant",
        "full_name": "Computer Science and Engineering",
        "type": "administrative",
        "basic": false,
        "category": null
    },
    ...
]
```

### Endpoint 6: Get Designations by Category

- **URL:** `/view-designations/`
- **Method:** `POST`
- **Description:** Retrieves designations filtered by category and basic status.
- **Request Body:**

| Parameter  | Type    | Required | Default  | Description |
|------------|--------|----------|----------|-------------|
| `category` | `string` | Yes      | `"student"` | The category of designations to filter. |
| `basic`    | `boolean` | Yes       | `true` | Whether to filter by basic designations. |

- **Response Body:**
```json
[
    {
        "id": 7,
        "name": "student",
        "full_name": "Computer Science and Engineering",
        "type": "academic",
        "basic": true,
        "category": "student"
    }
]
```

### Endpoint 7: Add a New Role

- **URL:** `/create-role/`
- **Method:** `POST`
- **Description:** Creates a new role (designation) and assigns default module access permissions.
- **Request Body:**

| Parameter  | Type     | Required | Description |
|------------|---------|----------|-------------|
| `name`     | `string` | Yes      | The short name of the role. |
| `full_name` | `string` | Yes      | The full name of the role. |
| `type`     | `string` | Yes      | The type or department the role belongs to. |
| `basic`    | `boolean` | Yes      | Indicates whether it is a fundamental role. |

- **Response Body:**
```json
{
  "role": {
    "id": 1,
    "name": "prof",
    "full_name": "Professor",
    "type": "academic",
    "basic": true,
    "category": "faculty"
  },
  "modules": {
    "id": 101,
    "designation": "prof",
    "program_and_curriculum": false,
    "course_registration": false,
    "course_management": false,
    "other_academics": false,
    "spacs": false,
    "department": false,
    "examinations": false,
    "hr": false,
    "iwd": false,
    "complaint_management": false,
    "fts": false,
    "purchase_and_store": false,
    "rspc": false,
    "hostel_management": false,
    "mess_management": false,
    "gymkhana": false,
    "placement_cell": false,
    "visitor_hostel": false,
    "phc": false
  }
}
```


### Endpoint 8: Modify a Role

- **URL:** `/modify-role/`
- **Method:** `PUT`, `PATCH`
- **Description:** Updates an existing role by its name.
- **Request Body:**
| Parameter  | Type     | Required | Description |
|------------|---------|----------|-------------|
| `name`     | `string` | Yes      | The name of the role to be updated. |
| `full_name` | `string` | No      | The full name of the role. |
| `type`     | `string` | No       | The type of the role. |
| `basic`    | `boolean` | No      | Whether the role is basic or not. |
| `category` | `string` | No       | The category of the role. |

- **Response Body:**
```json
{
  "name": "prof",
  "full_name": "Professor",
  "type": "Academic",
  "basic": true,
  "category": "faculty"
}
```

### Endpoint 9: Get Module Access for a Specific Role

- **URL:** `/get-module-access/`
- **Method:** `GET`
- **Description:** Retrieves the module access permissions for a given role.
- **Request Parameters**

| Parameter   | Type   | Required | Description |
|-------------|--------|----------|-------------|
| `designation` | `string` | Yes      | The name of the role whose module access details are needed. |
- **Response Body**
```json
{
    "id": 4,
    "designation": "student",
    "program_and_curriculum": true,
    "course_registration": true,
    "course_management": true,
    "other_academics": true,
    "spacs": true,
    "department": true,
    "examinations": false,
    "hr": false,
    "iwd": false,
    "complaint_management": true,
    "fts": false,
    "purchase_and_store": false,
    "rspc": false,
    "hostel_management": true,
    "mess_management": true,
    "gymkhana": true,
    "placement_cell": true,
    "visitor_hostel": true,
    "phc": true
}
```

### Endpoint 10: Modify Role Access

- **URL:** `/modify-roleaccess/`
- **Method:** `PUT`
- **Description:** Updates the module access permissions for a given role (designation).
- **Response Body**
```json
{
    "id": 4,
    "designation": "student",
    "program_and_curriculum": true,
    "course_registration": true,
    "course_management": true,
    "other_academics": true,
    "spacs": true,
    "department": true,
    "examinations": false,
    "hr": false,
    "iwd": false,
    "complaint_management": true,
    "fts": false,
    "purchase_and_store": false,
    "rspc": false,
    "hostel_management": true,
    "mess_management": true,
    "gymkhana": true,
    "placement_cell": true,
    "visitor_hostel": true,
    "phc": true
}
```

### Endpoint 11: Add Individual Student

- **URL:** `/users/add-student/`
- **Method:** `POST`
- **Description:** Adds a new student to the system by creating entries in multiple tables.
- **Request Body:**
| Parameter       | Type      | Required | Description |
|---------------|----------|----------|-------------|
| `roll_no`     | `string`  | Yes      | The unique roll number of the student. |
| `first_name`  | `string`  | Yes      | The first name of the student. |
| `last_name`   | `string`  | Yes      | The last name of the student. |
| `sex`         | `string`  | Yes      | The gender of the student (`M`/`F`). |
| `category`    | `string`  | Yes      | The category of the student (`GEN`/`OBC`/`SC`/`ST`). |
| `father_name` | `string`  | Yes      | The father's name of the student. |
| `mother_name` | `string`  | Yes      | The mother's name of the student. |
| `date_of_birth` | `string` | No | The date of birth (format: `YYYY-MM-DD`). Default: `"2025-01-01"`. |
| `address`     | `string`  | No       | Student's address. Default: `"NA"`. |
| `phone_number` | `integer` | No      | Contact number. Default: `9999999999`. |
| `hall_no`     | `integer` | No       | Hostel hall number. Default: `3`. |

- **Example Request**
```json
{
  "username": "22bcs502",
  "first_name": "John",
  "last_name": "Doe",
  "sex": "M",
  "category": "GEN",
  "father_name": "Father Name",
  "mother_name": "Mother Name",
  "batch": 2022,
  "programme": "B.Tech"
}
```
- **Response Body**
```json
{
    "message": "Student added successfully",
    "auth_user_data": {
        "password": "",
        "username": "22BCS502",
        "first_name": "John",
        "last_name": "Doe",
        "email": "22bcs502@iiitdmj.ac.in",
        "is_staff": false,
        "is_superuser": false,
        "is_active": true,
        "date_joined": "2025-02-10"
    },
    "extra_info_user_data": {
        "id": "22BCS502",
        "title": "Mr.",
        "sex": "M",
        "date_of_birth": "2025-01-01",
        "user_status": "PRESENT",
        "address": "NA",
        "phone_no": 9999999999,
        "about_me": "NA",
        "user_type": "student",
        "profile_picture": null,
        "date_modified": "2025-02-10",
        "department": 51,
        "user": 5440
    },
    "holds_designation_user_data": {
        "designation": 7,
        "user": 5440,
        "working": 5440
    },
    "academic_information_student_data": {
        "id": "22BCS502",
        "programme": "B.Tech",
        "batch": 2022,
        "batch_id": 89,
        "cpi": 0.0,
        "category": "GEN",
        "father_name": "Father Name",
        "mother_name": "Mother Name",
        "hall_no": 3,
        "room_no": 1,
        "specialization": null,
        "curr_semester_no": 6
    }
}
```

### Endpoint 12: Add Individual Staff 
- **URL:** `/users/add-staff/`  
- **Method:** `POST`  
- **Description:** Adds a new staff member to the system.
- **Request Parameters**  

| Parameter       | Type   | Required | Description |
|----------------|--------|----------|-------------|
| `username`     | string | Yes    | Unique username for the staff member. |
| `first_name`   | string | Yes    | First name of the staff member. |
| `last_name`    | string | Yes    | Last name of the staff member. |
| `sex`          | string | Yes     | Gender of the staff member (M/F). |
| `designation`         | string | Yes    | Designation of the staff member. |
- **Response body:**  
```json
{
    "message": "Staff added successfully",
    "auth_user_data": {
        "password": "",
        "username": "testsstaff",
        "first_name": "Test",
        "last_name": "Staff",
        "email": "testsstaff@iiitdmj.ac.in",
        "is_staff": true,
        "is_superuser": false,
        "is_active": true,
        "date_joined": "2025-02-10"
    },
    "extra_info_user_data": {
        "id": "testsstaff",
        "title": "Mr.",
        "sex": "M",
        "date_of_birth": "2025-01-01",
        "user_status": "PRESENT",
        "address": "NA",
        "phone_no": 9999999999,
        "about_me": "NA",
        "user_type": "staff",
        "profile_picture": null,
        "date_modified": "2025-02-10",
        "department": 51,
        "user": 5442
    },
    "holds_designation_user_data": {
        "designation": "46",
        "user": 5442,
        "working": 5442
    },
    "globals_staff_data": {
        "id": "testsstaff"
    }
}
```

### Endpoint 13: Add Individual Faculty

- **URL:** `/users/add-faculty/`
- **Method:** `POST`
- **Description:** Adds a new faculty to the system by creating entries in multiple tables.
- **Request Body:**

| Parameter       | Type   | Required | Description |
|----------------|--------|----------|-------------|
| `username`     | string | Yes    | Unique username for the staff member. |
| `first_name`   | string | Yes    | First name of the staff member. |
| `last_name`    | string | Yes    | Last name of the staff member. |
| `sex`          | string | Yes     | Gender of the staff member (M/F). |
| `role`         | string | Yes    | Designation of the staff member. |

- **Response Body:**
```json
{
    "message": "Faculty added successfully",
    "auth_user_data": {
        "password": "",
        "username": "testfaculty",
        "first_name": "Test",
        "last_name": "Faculty",
        "email": "testfaculty@iiitdmj.ac.in",
        "is_staff": false,
        "is_superuser": false,
        "is_active": true,
        "date_joined": "2025-02-10"
    },
    "extra_info_user_data": {
        "id": "testfaculty",
        "title": "Mr.",
        "sex": "M",
        "date_of_birth": "2025-01-01",
        "user_status": "PRESENT",
        "address": "NA",
        "phone_no": 9999999999,
        "about_me": "NA",
        "user_type": "faculty",
        "profile_picture": null,
        "date_modified": "2025-02-10",
        "department": 51,
        "user": 5443
    },
    "holds_designation_user_data": {
        "designation": "3",
        "user": 5443,
        "working": 5443
    },
    "globals_faculty_data": {
        "id": "testfaculty"
    }
}
```

### Endpoint 14: Add User

- **URL:** `/users/add/`
- **Method:** `POST`
- **Description:** This API is used to add a new user (student, faculty, or staff) to the system.
- **Response Body:**
```json
{
    "created_users": [
        {
            "id": 5444,
            "password": "",
            "last_login": null,
            "is_superuser": false,
            "username": "23BCS501",
            "first_name": "John",
            "last_name": "Doe",
            "email": "23bcs501@iiitdmj.ac.in",
            "is_staff": true,
            "is_active": true,
            "date_joined": "2025-02-10T03:36:35.956860Z"
        }
    ]
}
```


### Endpoint 15: Reset Password
- **URL:** `/users/reset_password/`
- **Method:** `POST`
- **Description:** This API resets the password of a user and sends an email notification with the new password.


### Endpoint 16: Bulk Import Users
- **URL:** `/users/import/`
- **Method:** `POST`
- **Description:** This API allows bulk import of users via a CSV file. The uploaded file is processed, and users are created in the system. If some records fail, they are returned in the response.


### Endpoint 17: Bulk Export Users
- **URL:** `/users/import/`
- **Method:** `GET`
- **Description:** This API exports all registered users as a CSV file.


### Endpoint 18: Mailing credentials to the entire batch
- **URL:** `/users/mail-batch/`
- **Method:** `POST`
- **Description:** This API sends an email to all students in a specified batch.
- **Response Body:**
```json
{
    "message": "Mail sent to whole batch successfully."
}
```

### Endpoint 19: Update globals Database
- **URL:** `/update-globals-db/`
- **Method:** `GET`
- **Description:** This API updates the `globals` database by modifying table structures, sequences, triggers, and data.
- **Response Body:**
```json
{
    "success": true,
    "message": "Database updates completed successfully."
}
```
