from mongoengine import Document, StringField, IntField, ListField, FloatField, DateTimeField

class User(Document):
    id = IntField
    firstname = StringField
    phone = IntField
    password = StringField
    height = FloatField
    weight = FloatField
    gender = StringField
    age = IntField

class Foodlog(Document):
    id = IntField
    user = StringField
    timestamp = DateTimeField
    meal_type = StringField


class Observation(Document):
    id = IntField
    user = StringField
    timestamp = DateTimeField
    foodlog = ListField
    intensity = IntField
    symptoms = ListField

