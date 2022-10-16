setTimeout(() => {
    var caloriesList = []
    var foodList = []
    var sugarList = []

    const runCoco = async () => {
        const net = await cocoSsd.load();
        console.log("loaded correctly");
        imageRecog(net);
    };

    const imageRecog = async (net) => {
        console.log("Rendering...")
        const img = document.getElementById("img");
        const imgWidth = img.width;
        const imgHeight = img.height;
        const canvas = document.getElementById("mesh");
        canvas.width = imgWidth;
        canvas.height = imgHeight;


        const obj = await net.detect(img);

        const ctx = canvas.getContext("2d");

        // drawRect(obj, ctx);
        console.log(obj)
        // getCaption(obj);

        let t = document.getElementById("food-item")
        t.innerText = obj[0].class

        img.style.visibility = "visible";
    };

    // const drawRect = (predictions, ctx) => {

    //     predictions.forEach((prediction) => {
    //         // Extract boxes and classes
    //         const [x, y, width, height] = prediction["bbox"];
    //         const text = prediction["class"];

    //         // Set styling
    //         const color = Math.floor(Math.random() * 16777215).toString(16);
    //         ctx.strokeStyle = "#" + color;
    //         ctx.font = "18px Arial";

    //         // Draw rectangles and text
    //         ctx.beginPath();
    //         ctx.fillStyle = "#" + color;
    //         ctx.fillText(text, x, y);
    //         ctx.rect(x, y, width, height);
    //         ctx.stroke();
    //     });
    // };
    const getCaption = (predictions) => {
        predictions.forEach(async (prediction) => {
            const caption = document.getElementById("caption");
            const imger = document.getElementById("imgholder");
            const entity = prediction["class"];
            try {
                // Access token provided
                const accessToken = "574a554e5a8cad9b2666048e80c20365f33323fc";
                // Store the response from GET request
                const response = await axios.get(
                    `https://owlbot.info/api/v4/dictionary/${entity}`,
                    { headers: { Authorization: `Token ${accessToken}` } }
                );
                // Retrieve the data portion of the response
                const data = response.data;

                let lineText = data.word;
                // Input the word into our getInfo functions which will do the other APi access
                getInfo(lineText);



            } catch (error) {
                console.log(error);
            }
        })
    }

    // Input is the word that the image recognition API outputs.
    // So upload photo of apple -> Image API says its apple -> send "apple" to this function
    const getInfo = async (input) => {

        //"Caption" is basically what I'm using as a label rn
        const caption = document.getElementById("caption");

        try {

            //my Authentication Key
            let key = 'amOmJ7DIV5epVBvcBUvhTg==CUfN8Pn9aBhusoKR';

            let query = input;

            //API get 
            const response = await axios.get(
                'https://api.api-ninjas.com/v1/nutrition?query=' + query,
                { headers: { 'X-Api-Key': 'amOmJ7DIV5epVBvcBUvhTg==CUfN8Pn9aBhusoKR' }, }


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

                line.innerText += 'Calories: ' + entry2 + '    ';

                line.innerText += 'Sugar: ' + entry3;
                caption.appendChild(line);
            }

        } catch (error) {
            console.log(error);
        }

    }


    // const clearButton = document.getElementById("clear");

    const foodButton = document.getElementById("food");
    // const caloriesButton = document.getElementById("calories");
    // const sugarButton = document.getElementById("sugar");





    // //Clear Button Listener
    // clearButton.addEventListener("click", () => {
    //     // taskList.replaceChildren();
    //     const caption = document.getElementById("caption");
    //     const foodLabel = document.getElementById("food_label");
    //     const caloriesLabel = document.getElementById("calories_label");
    //     const sugarLabel = document.getElementById("sugar_label");
    //     const input = document.getElementById("img");
    //     caption.replaceChildren();
    //     foodLabel.replaceChildren();
    //     caloriesLabel.replaceChildren();
    //     sugarLabel.replaceChildren();
    //     img.style.visibility = "hidden";


    //     foodList = []
    //     caloriesList = []
    //     sugarList = []
    //   });

    // List all food button listener
    foodButton.addEventListener("click", () => {
        console.log("TRYING TO LOG FOOD ITEM")

        runCoco();

        // const label = document.getElementById("food_label");
        // if (foodList.length != 0) {
        //     label.replaceChildren();
        //     var newlabel = document.createElement("Label");
        //     newlabel.style.color = "#69a2ec";
        //     newlabel.innerHTML = "You have eaten: " + foodList.sort().toString() + " today.";
        //     label.appendChild(newlabel);
        // }
    });

    // // List total calories button listener
    // caloriesButton.addEventListener("click", () => {
    //     const label = document.getElementById("calories_label");
    //     if (caloriesList.length != 0) {
    //         label.replaceChildren();
    //         var newlabel = document.createElement("Label");
    //         newlabel.style.color = "#69a2ec";
    //         newlabel.innerHTML = "You have eaten: " + Math.floor((caloriesList.reduce((partialSum, a) => partialSum + a, 0))) + " calories.";
    //         label.appendChild(newlabel);
    //     }
    // });

    // // List total sugar button listener
    // sugarButton.addEventListener("click", () => {
    //     const label = document.getElementById("sugar_label");
    //     if (sugarList.length != 0) {
    //         label.replaceChildren();
    //         var newlabel = document.createElement("Label");
    //         newlabel.style.color = "#69a2ec";
    //         newlabel.innerHTML = "You have eaten: " + Math.floor((sugarList.reduce((partialSum, a) => partialSum + a, 0))) + " grams of sugar.";
    //         label.appendChild(newlabel);
    //     }
    // });



    const input = document.getElementById("img");

    input.addEventListener("change", (event) => {
        // const caption = document.getElementById("caption");
        // caption.replaceChildren();
        // const img = document.getElementById("img");
        // img.src = URL.createObjectURL(event.target.files[0])
        runCoco();

    })
}, 3000);