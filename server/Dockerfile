ARG PYTHON_VERSION=3.8-slim-buster

FROM python:${PYTHON_VERSION}

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN mkdir -p /app

WORKDIR /app

RUN apt update
RUN apt install -y python3-dev default-libmysqlclient-dev build-essential
COPY requirements.txt /tmp/requirements.txt
RUN set -ex && \
    pip install --upgrade pip && \
    pip install -r /tmp/requirements.txt && \
    rm -rf /root/.cache/
COPY ./application /app

EXPOSE 8000

RUN python manage.py migrate 
CMD ["gunicorn", "--bind", ":8000", "--workers", "2", "application.wsgi"]
