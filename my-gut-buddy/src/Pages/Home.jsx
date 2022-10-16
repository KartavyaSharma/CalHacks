import React from 'react';
import '../Assets/Styles/onboarding.css';

// Import text field component
import Card from '../Components/Card';

import food from '../Assets/Images/food.png';
import food2 from '../Assets/Images/food2.jpeg';
import food3 from '../Assets/Images/food3.jpeg';

import PrimaryButton from '../Components/PrimaryButton';

import Footer from "../Components/navbar/Footer";

function Home() {

    // Get URL params, as hash #success
    // Find index of 'success'

    const url = window.location.href;
    const s_index = url.indexOf('success');


    setTimeout(() => {
        document.getElementById('success-alert').style.display = 'none';
    }, 3000);

    console.log(s_index)
    return (
        <div id='home'>

            <div id='home-header'>
                <h1>Hey👋, Bobby!</h1>
            </div>

            <h2>Goals</h2>
            <div id='home-goals'>
                <Card size='large' style={{ overflow: 'hidden' }}>
                    <img
                        alt="stats"
                        style={{ width: '108px', height: "108px", left: '48px', top: '198px', position: 'absolute' }}
                        src="https://cdn.discordapp.com/attachments/1025178616952266814/1031128016434233354/Group_6913.png"
                    />
                    <h1 style={{ position: 'absolute', width: '179px', height: '18px', left: '183px', top: '196px', fontSize: '14px', lineHeight: "18px" }}>
                        Meal Breakdown
                    </h1>
                    <img
                        alt="carbs"
                        style={{ position: 'absolute', width: '55px', height: '55px', left: '184px', top: '211px' }}
                        src="https://media.discordapp.net/attachments/1025178616952266814/1031129433525977168/Details.png"
                    />
                    <img
                        alt="fat"
                        style={{ position: 'absolute', width: '55px', height: '55px', left: '184px', top: '238px' }}
                        src="https://cdn.discordapp.com/attachments/1025178616952266814/1031129450135441500/Details_1.png"
                    />
                    <img
                        alt="protein"
                        style={{ position: 'absolute', width: '55px', height: '55px', left: '184px', top: '266px' }}
                        src="https://cdn.discordapp.com/attachments/1025178616952266814/1031129467432730644/Details_2.png"
                    />
                    <h1 style={{ position: 'absolute', width: '93px', height: '18px', left: '220px', top: '227px', fontSize: '8px', lineHeight: "18px", textAlign: "left" }}>
                        Carbohydrates
                    </h1>
                    <h1 style={{ position: 'absolute', width: '93px', height: '18px', left: '220px', top: '253px', fontSize: '8px', lineHeight: "18px", textAlign: "left" }}>
                        Fat
                    </h1>
                    <h1 style={{ position: 'absolute', width: '93px', height: '18px', left: '220px', top: '282px', fontSize: '8px', lineHeight: "18px", textAlign: "left" }}>
                        Protein
                    </h1>
                    <h1 style={{ position: 'absolute', width: '93px', height: '18px', left: '320px', top: '227px', fontSize: '8px', lineHeight: "18px", textAlign: "left" }}>
                        58%
                    </h1>
                    <h1 style={{ position: 'absolute', width: '93px', height: '18px', left: '320px', top: '253px', fontSize: '8px', lineHeight: "18px", textAlign: "left" }}>
                        27%
                    </h1>
                    <h1 style={{ position: 'absolute', width: '93px', height: '18px', left: '320px', top: '282px', fontSize: '8px', lineHeight: "18px", textAlign: "left" }}>
                        15%
                    </h1>
                </Card>
            </div>

            {/* Success alert */}
            {
                s_index != -1 ?
                    (<div id='success-alert'>
                        <p>Success! Food log added. We'll ask you later today how you're feeling.</p>
                    </div>
                    )
                    :
                    null
            }

            <h2>Previous Meals</h2>
            {/* carousel */}
            <div id='home-meals'>
                <div id='home-meals-carousel'>
                    <Card size='small'>
                        <img src={food} alt='food' />
                        <h3>Meal 1</h3>
                        <p>Meal 1 description</p>
                    </Card>
                    <Card size='small'>
                        <img src={food3} alt='food' />
                        <h3>Meal 2</h3>
                        <p>Meal 2 description</p>
                    </Card>
                    <Card size='small'>
                        <img src={food2} alt='food' />
                        <h3>Meal 3</h3>
                        <p>Meal 3 description</p>
                    </Card>
                </div>
            </div>

            <PrimaryButton text="Scan Item" action="scan" modifier='light' />

            <Footer>

            </Footer>
        </div>
    );
}

export default Home;