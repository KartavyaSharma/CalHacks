
from fastapi import FastAPI
from data_processing import Processing
from mongoengine import connect
from models import User,Foodlog,Observation
import json

app = FastAPI()
connect(db="name_db",host="local",port = , username=, password=)
#export MONGODB_URL="mongodb+srv://<username>:<password>@<url>/<db>?retryWrites=true&w=majority"


#client = motor.motor_asyncio.AsyncIOMotorClient(os.environ["MONGODB_URL"])
#db = client.college

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
