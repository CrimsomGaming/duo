FROM python:3.8-slim-buster

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

COPY requirements.txt /app
RUN pip install -r requirements.txt

COPY ./application /app

EXPOSE 8000

RUN python manage.py migrate
RUN python manage.py createsuperuser --admin_username=admin --id=1 --password=0000 --noinput
RUN python manage.py seed_users
RUN python manage.py seed_games

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
