# Read in the full_format_recipies.json file and extract every "title" from each recipe
import json
import pandas as pd
import numpy as np

with open('./full_format_recipes.json') as f:
    data = json.load(f)
    
    # Loop through each recipe in the data (structured as array of dicts)
    titles = []
    for recipe in data:
        try:
            if len(recipe['title']) < 30:
                titles.append(recipe['title'])
        except:
            pass

    # Save the titles to a json file in the format
    # { "titles": [ "title1", "title2", ... ] }
    with open('./titles.json', 'w') as f:
        json.dump({"titles": titles}, f)
    print(len(titles))