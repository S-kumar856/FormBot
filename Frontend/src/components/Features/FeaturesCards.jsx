import React from 'react'
import style from './FeaturesCards.module.css'

const FeaturesCards = () => {
    return (
        <>
            <div className={style.cards}>
                <div className={style.icons}>
                <i className="fa-regular fa-universal-access"></i>
                </div>
                <div className={style.Boxes}>
                    <h3>Hidden fields</h3>
                    <p>Include data in your form URL to segment
                        your user and use its data directly in your
                        form.</p>
                </div>
            </div>

        </>
    )
}

export default FeaturesCards
