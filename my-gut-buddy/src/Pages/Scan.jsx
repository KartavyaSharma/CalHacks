import React from 'react';
import Webcam from "react-webcam";
import axios from 'axios';

import '../Assets/Styles/onboarding.css';
import PrimaryButton from '../Components/PrimaryButton';
import TextField from '../Components/TextField';

function Scan() {

    // Parse URL and get ?scantype= parameter
    const urlParams = new URLSearchParams(window.location.search);
    const scanType = urlParams.get('scantype');
    
    let foodItem = "";
    
    return (
        <div id='scan'>
            {/* Render two buttons, one for taking a picture, one for typing in the input */}
            <div id='scan-header'>
                <h1>Scan Item</h1>
            </div>

            {/* If no scantype, then render the buttons, otherwise, render the scan picture or scan buttons divs */}

            {
                scanType === null ? (
                    <>
                        <p>Please select an option.</p>
                        <div id='scan-buttons'>
                            <PrimaryButton text="Take Picture" action="?scantype=picture" />
                            <p>or</p>
                            <PrimaryButton text="Type in Item" action="?scantype=item" modifier='light' />
                        </div>

                    </>
                ) : scanType == "picture" ? (
                    <div id='scan-picture'>
                        Picture
                        <Webcam />
                    </div>
                ) : (
                    <div id='scan-item'>
                        <p>Type in item and select from dropdown</p>
                        <TextField name='item' value='' placeholder={"Item"} type="text" autocomplete="true" data_input="titles.json" change={
                            (e) => {
                                foodItem = e;
                                console.log(foodItem)
                            }
                        } />
                        <PrimaryButton text="Submit" action="" f={
                            () => {
                                // Make call to the mongo database to store the foodlog
                                // Get the ingredients for the food item

                                // Get data from ../Data/full_format_recipes.json
                                // Get the ingredients for the food item
                                console.log("searching for " + foodItem.title);
                                let ingredients = [];
                                let data = require('../Data/full_format_recipes.json');
                                // Find the right food item by name (foodItem corresponds to a title)
                                for (let i = 0; i < data.length; i++) {
                                    if (data[i].title == foodItem.title) {
                                        ingredients = data[i].ingredients;
                                        break;
                                    }
                                }

                                // Sanitize the ingredients. lowercase, remove numbers, remove punctuation
                                // Remove cups, cup, tbsp, tsp, tablespoons, teaspoons, etc.
                                // remove adjectives (large, small, freshly, etc.)
                                // remove "to taste", inch, lb, pound, finely, etc.
                                // and ALL adjective words
                                let adjectives = ["Acid",
                                    "Acidic",
                                    "Ample",
                                    "Appealing",
                                    "Appetizing",
                                    "Aromatic",
                                    "Astringent",
                                    "Aromatic",
                                    "Baked",
                                    "Balsamic",
                                    "Beautiful",
                                    "Bite-size",
                                    "Bitter",
                                    "Bland",
                                    "Blazed",
                                    "Blended",
                                    "Blunt",
                                    "Boiled",
                                    "Briny",
                                    "Boiled",
                                    "Briny",
                                    "Brown",
                                    "Burnt",
                                    "Buttered",
                                    "Caked",
                                    "Calorie",
                                    "Candied",
                                    "Caramelized",
                                    "Caustic",
                                    "Center cut",
                                    "Cheesy",
                                    "Chocolate",
                                    "Cholesterol free",
                                    "Chunked",
                                    "Classic",
                                    "Classy",
                                    "Cold",
                                    "Cool",
                                    "Crafted",
                                    "Creamed",
                                    "Creamy",
                                    "Crisp",
                                    "Crunchy",
                                    "Cured",
                                    "Cutting",
                                    "Dazzling",
                                    "Deep-fried",
                                    "Delectable",
                                    "Delicious",
                                    "Delight",
                                    "Distinctive",
                                    "Doughy",
                                    "Dressed",
                                    "Dripping",
                                    "Drizzle",
                                    "Dry",
                                    "Dull",
                                    "Edible",
                                    "Elastic",
                                    "Ethnic",
                                    "Extraordinary",
                                    "Famous",
                                    "Fantastic",
                                    "Fetid",
                                    "Fiery",
                                    "Filet",
                                    "Fizzy",
                                    "Flaky",
                                    "Flat",
                                    "Flavored",
                                    "Flavorful",
                                    "Fleshy",
                                    "Fluffy",
                                    "Fragile",
                                    "Free",
                                    "Fresh",
                                    "Fried",
                                    "Frozen",
                                    "Fruity",
                                    "Furry",
                                    "Famy",
                                    "Garlic",
                                    "Generous",
                                    "Gingery",
                                    "Glazed",
                                    "Golden",
                                    "Gorgeous",
                                    "Gourmet",
                                    "Greasy",
                                    "Grilled",
                                    "Gritty",
                                    "Harsh",
                                    "Heady",
                                    "Honey",
                                    "Hot",
                                    "Icy",
                                    "Infused",
                                    "Insipid",
                                    "Intense",
                                    "Juicy",
                                    "Jumbo",
                                    "Kosher",
                                    "Large",
                                    "Lavish",
                                    "Lean",
                                    "Leathery",
                                    "Lite",
                                    "Lively",
                                    "Low",
                                    "Low-fat",
                                    "Luscious",
                                    "marinated",
                                    "mashed",
                                    "mellow",
                                    "mild",
                                    "minty",
                                    "mixed",
                                    "mixture of",
                                    "moist",
                                    "moist",
                                    "mouth-watering",
                                    "nationally famous",
                                    "natural",
                                    "nectarous",
                                    "non-fat",
                                    "nutmeg",
                                    "nutty",
                                    "oily",
                                    "open face",
                                    "organic",
                                    "overpowering",
                                    "palatable indicates",
                                    "penetrating",
                                    "peppery",
                                    "perfection",
                                    "petite",
                                    "pickled",
                                    "piquant",
                                    "plain",
                                    "pleasant",
                                    "plump",
                                    "poached",
                                    "popular",
                                    "pounded",
                                    "prepared",
                                    "prickly",
                                    "pulpy",
                                    "pungent",
                                    "pureed",
                                    "rancid",
                                    "rank",
                                    "reduced",
                                    "refresh",
                                    "rich",
                                    "ripe",
                                    "roasted",
                                    "robust",
                                    "rotten",
                                    "rubbery",
                                    "saccharine",
                                    "saline",
                                    "salty",
                                    "savory",
                                    "Sapid",
                                    "saporific",
                                    "saporous",
                                    "satin",
                                    "satiny",
                                    "sauteed",
                                    "savorless",
                                    "savory",
                                    "scrumptious",
                                    "sea salt",
                                    "seared",
                                    "seasoned",
                                    "served in",
                                    "served with",
                                    "sharp",
                                    "sharp-tasting",
                                    "silky",
                                    "simmered",
                                    "sizzling",
                                    "skillfully",
                                    "small",
                                    "smelly",
                                    "smoked",
                                    "smoky",
                                    "smooth",
                                    "smothered",
                                    "soothing",
                                    "sour",
                                    "Southern style",
                                    "special",
                                    "spiced",
                                    "spicy",
                                    "spiral-cut",
                                    "spongy",
                                    "sprinkled",
                                    "stale",
                                    "steamed",
                                    "steamy",
                                    "sticky",
                                    "stinging",
                                    "strawberry flavored",
                                    "strong",
                                    "stuffed",
                                    "succulent",
                                    "sugar coated",
                                    "sugar free",
                                    "sugared",
                                    "sugarless",
                                    "sugary",
                                    "superb",
                                    "sweet",
                                    "sweet-and-sour",
                                    "sweetened",
                                    "syrupy",
                                    "tangy",
                                    "tantalizing",
                                    "tart",
                                    "tasteful",
                                    "tasteless",
                                    "tasty",
                                    "tender",
                                    "tepid",
                                    "terrific",
                                    "thick",
                                    "thin",
                                    "toasted",
                                    "toothsome",
                                    "topped",
                                    "tossed",
                                    "tough",
                                    "traditional",
                                    "treacly",
                                    "treat",
                                    "unflavored",
                                    "unsavory",
                                    "unseasoned",
                                    "vanilla",
                                    "vanilla flavored",
                                    "velvety",
                                    "vinegary",
                                    "warm",
                                    "waxy",
                                    "weak",
                                    "whipped",
                                    "whole",
                                    "wonderful",
                                    "yucky",
                                    "yummy",
                                    "zesty",
                                    "zingy"]
                                
                                for (let i = 0; i < ingredients.length; i++) {
                                    ingredients[i] = ingredients[i].toLowerCase();
                                    ingredients[i] = ingredients[i].replace(/[0-9]/g, '');
                                    ingredients[i] = ingredients[i].replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
                                    ingredients[i] = ingredients[i].replace(/cup/g, '');
                                    ingredients[i] = ingredients[i].replace(/cups/g, '');
                                    ingredients[i] = ingredients[i].replace(/tbsp/g, '');
                                    ingredients[i] = ingredients[i].replace(/tsp/g, '');
                                    ingredients[i] = ingredients[i].replace(/tablespoons/g, '');
                                    ingredients[i] = ingredients[i].replace(/teaspoons/g, '');
                                    ingredients[i] = ingredients[i].replace(/tablespoon/g, '');
                                    ingredients[i] = ingredients[i].replace(/teaspoon/g, '');
                                    ingredients[i] = ingredients[i].replace(/large/g, '');
                                    ingredients[i] = ingredients[i].replace(/small/g, '');
                                    ingredients[i] = ingredients[i].replace(/freshly/g, '');
                                    ingredients[i] = ingredients[i].replace(/to taste/g, '');
                                    ingredients[i] = ingredients[i].replace(/lb/g, '');
                                    ingredients[i] = ingredients[i].replace(/lbs/g, '');
                                    ingredients[i] = ingredients[i].replace(/pound/g, '');
                                    ingredients[i] = ingredients[i].replace(/pounds/g, '');
                                    ingredients[i] = ingredients[i].replace(/ounce/g, '');
                                    ingredients[i] = ingredients[i].replace(/ounces/g, '');
                                    ingredients[i] = ingredients[i].replace(/oz/g, '');
                                    ingredients[i] = ingredients[i].replace(/ozs/g, '');
                                    ingredients[i] = ingredients[i].replace(/g/g, '');
                                    ingredients[i] = ingredients[i].replace(/gs/g, '');
                                    ingredients[i] = ingredients[i].replace(/gram/g, '');
                                    
                                    for (let j = 0; j < adjectives.length; j++) {
                                        ingredients[i] = ingredients[i].replace(adjectives[j].toLowerCase(), '');
                                    }
                                }
                                console.log("Storing foodlog for item " + ingredients)
                                // endpoint: /foodlog/create
                                // parse ingredients as json array
                                const response = axios.post(
                                    "http://localhost:3333/foodlog/create",
                                    {
                                        mealtype: ingredients
                                    }
                                );
                    
                            }
                        } />
                    </div>
                )
            }
        </div>
    );
}

export default Scan;