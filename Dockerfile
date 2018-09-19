# Pull base image
FROM python:3.6-slim

# Set environment varibles
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /code

# Install dependencies
RUN pip install --upgrade pip
RUN pip install pipenv
COPY ./Pipfile /code/Pipfile
COPY ./entrypoint.sh /code/entrypoint.sh
RUN pipenv install --deploy --system --skip-lock --dev
ENTRYPOINT ["./entrypoint.sh"]
# Copy project
COPY . /code/
