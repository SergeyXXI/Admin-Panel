import React from "react";

const Spinner = ({active}) =>
{
    return(
        <div className={active ? `spinner-container active` : "spinner-container"}>
            <span uk-spinner="ratio: 4"></span>
        </div>
    );
}

export default Spinner;