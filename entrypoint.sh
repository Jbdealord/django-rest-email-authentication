#!/bin/bash

if [ "$1" = 'run_dev_server' ]; then
    ./wait-for-it.sh db:5432
    python /code/manage.py makemigrations
    python /code/manage.py migrate
    python /code/manage.py runserver 0.0.0.0:8000
fi
