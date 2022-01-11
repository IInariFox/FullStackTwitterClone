import React from 'react'

const LanguageSelect = () => {
    return (
        <>
        <div className="dropdown">

            <button className="btn dropdown-toggle bg-transparent" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Choose Language</button>


            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <button className="dropdown-item" type="button">English</button>
                <button className="dropdown-item" type="button">French</button>
                <button className="dropdown-item" type="button">Spanish</button>
                <button className="dropdown-item" type="button">Bahasa</button>
                <button className="dropdown-item" type="button">Mandarin</button>
            </div>
        </div>
        </>
    )
}

export default LanguageSelect;