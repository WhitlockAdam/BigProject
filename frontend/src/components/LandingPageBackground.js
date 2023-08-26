import React from 'react';
import Budgeting_Square_Sticker from '../images/Budgeting_Square_Sticker_2.png';

function LandingPageBackground(){

    return(
        <img src={Budgeting_Square_Sticker} alt="logo" style={{
            top: 0,
            left: 0,
            minWidth: '100%',
            maxHeight: '800px',
            width: 'auto',
            zIndex: -1
        }}/>
    );

}

export default LandingPageBackground;