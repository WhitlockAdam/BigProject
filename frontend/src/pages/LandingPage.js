import React from "react";
import NavigationBar from "../components/NavigationBar";
import LandingPageBackground from "../components/LandingPageBackground";

const LandingPage = () =>
{

    var myUrl = new URL('frontend/src/images/Budgeting_Square_Sticker.png', 'http://localhost:3000/');

    const styles = {
        backgroundImage: myUrl,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundColor: '#273A4B',
        width: '100vw',
        height: '100vh'
    };

    return(
        <div>
            <NavigationBar/>
            <LandingPageBackground/>
        </div>
    );
};

export default LandingPage;