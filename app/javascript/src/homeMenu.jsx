import React from 'react'

const MenuSelect = (props) => {
    return (
        <>
        <div className="dropdown">

            <button className="btn dropdown-toggle bg-transparent" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{props.username}</button>


            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <button className="dropdown-item" type="button" id="user-tweets">{props.username}</button>
                <hr />
                <button className="dropdown-item" type="button">Lists</button>
                <hr />
                <button className="dropdown-item" type="button">Help</button>
                <button className="dropdown-item" type="button">Keyboard Shortcuts</button>
                <hr />
                <button className="dropdown-item" type="button">Settings</button>
                <button className="dropdown-item" type="button" id="logout">Log Out</button>
            </div>
        </div>
        </>
    )
}

export default MenuSelect;