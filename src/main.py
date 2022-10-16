
from fastapi import FastAPI
from data_processing import Processing
app = FastAPI()
#export MONGODB_URL="mongodb+srv://<username>:<password>@<url>/<db>?retryWrites=true&w=majority"


#client = motor.motor_asyncio.AsyncIOMotorClient(os.environ["MONGODB_URL"])
#db = client.college



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
