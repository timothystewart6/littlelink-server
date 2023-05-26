# Contribution Guide

This guide will help you set up an local development environment and give you some tips how to contribute new buttons configurations to this project.

## Local Development Environment

### Local Container

1. Make sure to have a running docker installation
2. `docker compose up --build`
3. Access the local container via http://localhost:8080

## Contributing

### Add new button

1. Choose a meaningful name for the service you are adding. Make sure to use the same name everywhere.
2. Add button class in `public/css/brands.css`. Make sure the background/font color matching the logo.
3. Put the logo as SVG into `src/icons` and import it in `src/components/Home/Home.js`.
4. Add component for the button into `src/components/Home/Home.js`.
5. Add environment variable config into `src/config.js`
6. Add the environment with an example value in `docker-compose.yml`

Afterwards, build the container via docker (see above) and check if the button is displayed correctly.