import wikipedia
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


# Поиск названия 1 статьи по path
@app.get("/{topic}")
def get_topic(topic: str):
    return f"По данному запросу найдена статья: {wikipedia.search(topic, 1)}"


# Поиск нескольких названией статей
@app.get("/multy/{topic}")
def get_topics(topic: str, number_of_results: int):
    next_row = '\n'
    return f"По данному запросу найдены статьи ({len(wikipedia.search(topic, number_of_results))}): {', '.join(wikipedia.search(topic, number_of_results))}"


# Класс запроса (название статьи и ожидаемое количество предложений)
class InputTopic(BaseModel):
    search_topic: str
    sentences_num: int


# Класс аннотации статьи
class Summary(BaseModel):
    topic: str
    summary: str


# Запрос аннотации статьи по названию
@app.post("/", response_model=Summary)
def get_summary(topic: InputTopic):
    return Summary(topic=topic.search_topic,
                   summary=wikipedia.summary(topic.search_topic, sentences=topic.sentences_num))
