import React from "react";

const Panel = ({exit}) =>
(
    <div className="panel">
        <button onClick={exit} className="uk-button uk-button-danger" data-exit >ВЫХОД</button>
        <button className="uk-button uk-button-primary uk-margin-small-right" uk-toggle="target: #modal-save">ОПУБЛИКОВАТЬ</button>
        <button className="uk-button uk-button-primary uk-margin-small-right" uk-toggle="target: #modal-choose">ОТКРЫТЬ</button>
        <button className="uk-button uk-button-primary uk-margin-small-right" uk-toggle="target: #modal-meta">РЕДАКТОР МЕТА</button>          
        <button className="uk-button uk-button-default" uk-toggle="target: #modal-backup">ВОССТАНОВИТЬ</button>                          
    </div>  

);

export default Panel;