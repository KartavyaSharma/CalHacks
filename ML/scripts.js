// JS arrays
var caloriesList = []
var foodList = []
var sugarList = []



const getInfo = async (input) => {

    //"Caption" is basically what I'm using as a label rn
    const caption = document.getElementById("caption");
   
    try {
   
        //my Authentication Key
        let key = 'amOmJ7DIV5epVBvcBUvhTg==CUfN8Pn9aBhusoKR';
        //var authorizationHeaderString = encodedData;
        let query = input;

        //API get 
        const response = await axios.get(
            'https://api.api-ninjas.com/v1/nutrition?query=' + query,
            {headers: { 'X-Api-Key': 'amOmJ7DIV5epVBvcBUvhTg==CUfN8Pn9aBhusoKR'},}
        

        );
        // Retrieve the indexed data portion of the response
        for (let i = 0; i < response.data.length; i++) {
          const data = response.data[i];

          // From the data, get the name and calories (prob changing later)
          const entry = data.name;
          if (!foodList.includes(entry)) {
            foodList.push(entry)
          }
          const entry2 = data.calories;
          caloriesList.push(entry2);

          const entry3 = data.sugar_g;
          sugarList.push(entry3);
      
          const line = document.createElement("p");
          line.innerText = 'Food: ' + entry + '    ';
          //caption.appendChild(line);
          //const line2 = document.createElement("p");
          line.innerText += 'Calories: ' + entry2 + '    ';
          //caption.appendChild(line2);
          //const line3 = document.createElement("p");
          line.innerText += 'Sugar: ' + entry3;
          caption.appendChild(line);
        }
        
    } catch (error) {
        console.log(error);
    }

}


//for the text button input
const taskName = document.getElementById("task-name");
const submitButton = document.getElementById("submit");
const clearButton = document.getElementById("clear");

const foodButton = document.getElementById("food");
const caloriesButton = document.getElementById("calories");
const sugarButton = document.getElementById("sugar");


//Submit Button Listener
submitButton.addEventListener("click", () => {
    if (taskName.value != "") {
      getInfo(taskName.value)
    }
  });
  
//Clear Button Listener
clearButton.addEventListener("click", () => {
    // taskList.replaceChildren();
    const caption = document.getElementById("caption");
    const foodLabel = document.getElementById("food_label");
    const caloriesLabel = document.getElementById("calories_label");
    const sugarLabel = document.getElementById("sugar_label");
    caption.replaceChildren();
    foodLabel.replaceChildren();
    caloriesLabel.replaceChildren();
    sugarLabel.replaceChildren();
    taskName.value = "";
    foodList = []
    caloriesList = []
    sugarList = []
  });
  
foodButton.addEventListener("click", () => {
    const label = document.getElementById("food_label");
    if (foodList.length != 0) {
        label.replaceChildren();
        var newlabel = document.createElement("Label");
        newlabel.style.color = "#69a2ec";
        newlabel.innerHTML = "You have eaten: " + foodList.sort().toString() + " today.";
        label.appendChild(newlabel);
    }
  });

caloriesButton.addEventListener("click", () => {
    const label = document.getElementById("calories_label");
    if (caloriesList.length != 0) {
        label.replaceChildren();
        var newlabel = document.createElement("Label");
        newlabel.style.color = "#69a2ec";
        newlabel.innerHTML = "You have eaten: " + Math.floor((caloriesList.reduce((partialSum, a) => partialSum + a, 0))) + " calories.";
        label.appendChild(newlabel);
    }
  });


sugarButton.addEventListener("click", () => {
    const label = document.getElementById("sugar_label");
    if (sugarList.length != 0) {
        label.replaceChildren();
        var newlabel = document.createElement("Label");
        newlabel.style.color = "#69a2ec";
        newlabel.innerHTML = "You have eaten: " + Math.floor((sugarList.reduce((partialSum, a) => partialSum + a, 0))) + " grams of sugar.";
        label.appendChild(newlabel);
    }
  });



