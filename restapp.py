from fastapi import FastAPI
import pyjokes
from pydantic import BaseModel

app = FastAPI()


@app.get("/")
def joke():
    return pyjokes.get_joke()


@app.get("/{friend}")
def joke_from_friend(friend: str):
    return f"{friend} tells his joke: {pyjokes.get_joke()}"


@app.get("/multy/{friend}")
def multy_friend_joke(friend: str, joke_number: int):
    friend_jokes = ""
    for i in range(joke_number):
        friend_jokes += f"{friend} tells his joke #{i + 1}: {pyjokes.get_joke()}"
    return friend_jokes


class Joke(BaseModel):
    friend: str
    joke: str


class JokeInput(BaseModel):
    friend: str


@app.post("/", response_model=Joke)
def create_joke(joke_input: JokeInput):
    '''Создание шутки'''
    return Joke(friend=joke_input.friend, joke=pyjokes.get_joke())
