import React from 'react';
import '../Assets/Styles/onboarding.css';

// Import text field component
import Card from '../Components/Card';

import food from '../Assets/Images/food.png';

import PrimaryButton from '../Components/PrimaryButton';

import Footer from "../Components/navbar/Footer";

function Home() {
    return (
        <div id='home'>

            <div id='home-header'>
                <h1>Welcome Back, Bobby</h1>
            </div>

            <h2>Goals</h2>
            <div id='home-goals'>
                <Card size='large'>
                    Meal breakdown, etc
                </Card>
            </div>

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
                        <img src={food} alt='food' />
                        <h3>Meal 2</h3>
                        <p>Meal 2 description</p>
                    </Card>
                    <Card size='small'>
                        <img src={food} alt='food' />
                        <h3>Meal 3</h3>
                        <p>Meal 3 description</p>
                    </Card>
                </div>
            </div>

            <PrimaryButton text="Scan Item" action="scan-item" modifier='light' />

            <Footer>

            </Footer>
        </div>
    );
}

export default Home;