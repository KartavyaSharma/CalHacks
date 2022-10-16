from mongoengine import Document, StringField, IntField, ListField, FloatField, DateTimeField
from pydantic import BaseModel



class User(BaseModel):
    id = StringField
    firstname = StringField
    phone = IntField
    password = StringField
    height = FloatField
    weight = FloatField
    gender = StringField
    age = IntField

class Foodlog(Document):
    id = StringField
    user = StringField
    timestamp = DateTimeField
    meal_type = StringField


class Observation(Document):
    id = StringField
    user = StringField
    timestamp = DateTimeField
    foodlog = StringField
    intensity = IntField
    symptoms = ListField

