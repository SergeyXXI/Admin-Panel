import React from "react";
import {createPortal} from "react-dom";

const ChooseModal = ({id, choose, items, title}) =>
{
    var list, container;    

    if(items)
    {
        list = items.map(item =>
        {
            if(item.page) 
            {
                return(
                    <li key={item.date}>
                        <a href="#" className="uk-modal-close" onClick={e => { e.preventDefault(); choose(item.file, item.page); }}>
                            Резервная копия от {item.date}    
                        </a>
                    </li>
                );
            }
            else
            {
                return(
                    <li key={item + Math.random()}>
                        <a href="#" className="uk-modal-close" onClick={e => { e.preventDefault(); choose(item); }}>
                            {item}    
                        </a>
                    </li>
                );
            }
            

        });       
    }  
    
    const modalWindow =
    (             
        <div className="uk-modal-dialog uk-modal-body">                    
            <h2>{title}</h2>                                  
            {list && list.length !== 0 ? 
            <ul className="uk-list uk-list-divider">
                {list}
            </ul> :
            <p>Резервные копии отсутствуют.</p>
            }
            <p className="uk-text-right">                                               
                <button className="uk-button uk-button-default uk-modal-close" type="button">Отмена</button>                
            </p>
        </div>                
    ); 

    if(!document.getElementById(id))
    {
        container = document.createElement("div");
        container.setAttribute("uk-modal", "true");
        container.id = id;
        document.body.append(container);

    }
    else container = document.getElementById(id);    
    
    return createPortal(modalWindow, container);
};

export default ChooseModal;