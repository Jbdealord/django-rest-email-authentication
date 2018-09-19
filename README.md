# django-rest-email-authentication

# Getting Started

Simple JWT (JSON Web Token) based authentication which would be good starting point for developing login and
registration page with ```Django```  back-end and ```React``` front-end. The registration process has an email authenticaton 
step which based on ``` django-allauth```  and ``` django-rest-auth``` modules.

# Prerequisites
```
- Docker
- Docker Compose
```

# Installation

```
$ git clone https://github.com/istvanhajdu/django-react-authentication.git
$ cd django-rest-email-authentication
$ sudo docker-compose build 
$ sudo docker-compose up
```

# Deployment

- The Django server: http://localhost:8000/
- The React server: http://localhost:3000/login

   **1. For development purpose**

    After the registration, the email message will be shown up in the console and you will be able to verify your email. In       this case you don't have to use real emails.

    **2. For purpose of productation mode:**

     * Change EmailBackend to SMPT mode in the ```settings.py```: 

       ```EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'```

     * Add these lines to the ```settings.py```:

       - *In SSL connection channel case:*
       ```
       EMAIL_USE_SSL = True
       EMAIL_PORT = 465
       ```
       - *In TLS connection channel case:*
       ```
       EMAIL_USE_TLS = True
       EMAIL_HOST = 'mail.test.hu'
       EMAIL_PORT = 587
       EMAIL_HOST_USER = 'test@mail.hu'
       EMAIL_HOST_PASSWORD = 'password'
        ```
      
