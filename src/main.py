import os
from fastapi import FastAPI, Body, HTTPException, status
from fastapi.responses import Response, JSONResponse
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel, Field, EmailStr
from bson import ObjectId
from typing import Optional, List
import motor.motor_asyncio

app = FastAPI()
client = motor.motor_asyncio.AsyncIOMotorClient(os.environ["MONGODB_URL"])
db = client.college

#connect(db="name_db",host="local",port = , username=, password=)
#export MONGODB_URL="mongodb+srv://<username>:<password>@<url>/<db>?retryWrites=true&w=majority"


#client = motor.motor_asyncio.AsyncIOMotorClient(os.environ["MONGODB_URL"])
#db = client.college

class UserModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    firstname: str = Field(...)
    phone: PhoneStr = Field(...)
    email: EmailStr = Field(...)
    course: str = Field(...)
    gpa: float = Field(..., le=4.0)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "name": "Jane Doe",
                "email": "jdoe@example.com",
                "course": "Experiments, Science, and Fashion in Nanophotonics",
                "gpa": "3.0",
            }
        }


@app.get("/get_user")
def get_user():
    data = json.loads(User.objects.to_json())
    return {"User": data}

@app.get("/get_foodlog")
def get_user():
    data = json.loads(Foodlog.objects.to_json())
    return {"Foodlog": data}

@app.get("/get_Observation")
def get_observation():
    data = json.loads(Observation.objects.to_json())
    return {"Observation": Observation}


algostart = Processing()
algostart.cleanup(data=)
@app.get("/")
def read_root():
    return{"Message": "test"}

@app.get("/items/{item_id}")
def read_item(item_id: int):
    return {"item_id": item_id}

@app.get("/{cat}")
async def read_item(cat):
    return algostart.cleanup(data=)
