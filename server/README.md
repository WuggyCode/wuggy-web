# Wuggy Server

This is a FastAPI project, serving as the Wuggy Web server.

When this proof of concept was developed, Wuggy was not published on PyPi. You have to manually install Wuggy on your machine.
If you have Wuggy locally, install it using `pip install -e {FULL_PATH_TO_WUGGY_FOLDER}`

# Development environment

## Installing dependencies

Run `pip install -r requirements.txt`.

## Starting the Server

Run `uvicorn main:app --reload`.