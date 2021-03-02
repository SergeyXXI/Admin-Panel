import React from "react";
import {createPortal} from "react-dom";

const container = document.createElement("div");
container.setAttribute("uk-modal", "true");
container.id = "modal-save";
document.body.append(container);

const ConfirmModal = ({save}) =>
{     
    const modalWindow =
    (     
        <div className="uk-modal-dialog uk-modal-body">                    
            <p className="paragraph-confirm">Cохранить изменения?</p>
            <p className="uk-text-right">                                               
                <button className="uk-button uk-button-default uk-modal-close" type="button">Отмена</button>
                <button
                className="uk-button uk-button-primary uk-modal-close"
                type="button"
                onClick={save}>Сохранить
                </button>
            </p>
        </div>        
    ); 
    
    return createPortal(modalWindow, container);
};

export default ConfirmModal;