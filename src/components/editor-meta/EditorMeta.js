import React, { useEffect, useState } from "react";
import {createPortal} from "react-dom";

const container = document.createElement("div");
container.setAttribute("uk-modal", "true");
container.id = "modal-meta";
document.body.append(container);

var $title, keywords, description;

const EditorMeta = ({dom}) =>
{
    const [meta, setMeta] = useState({ title: "", keywords: "", description: ""});     

    const getMetaData = () =>
    {
        if(dom)
        {
            $title = dom.head.querySelector("title") || dom.head.appendChild(dom.createElement("title"));

            keywords = dom.head.querySelector("meta[name='keywords']");
            if(!keywords)
            {
                keywords = dom.head.appendChild(dom.createElement("meta"));
                keywords.setAttribute("name", "keywords");
                keywords.setAttribute("content", "");
            }

            description = dom.head.querySelector("meta[name='description']");
            if(!description)
            {
                description = dom.head.appendChild(dom.createElement("meta"));
                description.setAttribute("name", "description");
                description.setAttribute("content", "");
            }           

            setMeta(
            {
                title: $title.innerText,
                keywords: keywords.getAttribute("content"),
                description: description.getAttribute("content")
            });

            
        }        
       
    };

    useEffect(() => { getMetaData(); }, [dom]); 
    
    const changeValueHandler = (e, metaTag) =>
    {
        switch(metaTag)
        {
            case "title": setMeta(meta => ({...meta, title: e.target.value})); break;
            case "keywords": setMeta(meta => ({...meta, keywords: e.target.value})); break;
            case "description": setMeta(meta => ({...meta, description: e.target.value})); break;
        }
        
    };

    const applyMetaData = () =>
    {
        $title.innerText = meta.title;
        keywords.setAttribute("content", meta.keywords);
        description.setAttribute("content", meta.description); 
    }

    const modalWindow =
    (           
        <div className="uk-modal-dialog uk-modal-body">                    
            <h2>Редактор Мета-тэгов</h2>
            <form>
                <div className="uk-margin">
                    <input className="uk-input" type="text" placeholder="Title" value={meta.title}
                           onChange={e => changeValueHandler(e, "title")} />
                </div>

                <div className="uk-margin">
                    <textarea className="uk-textarea" rows="5" placeholder="Keywords" value={meta.keywords}
                              onChange={e => changeValueHandler(e, "keywords")}></textarea>
                </div>

                <div className="uk-margin">
                    <textarea className="uk-textarea" rows="5" placeholder="Description" value={meta.description}
                              onChange={e => changeValueHandler(e, "description")}></textarea>
                </div>

            </form>

            <p className="uk-text-right">                                               
                <button className="uk-button uk-button-default uk-modal-close uk-margin-small-right" type="button">Отмена</button>
                <button className="uk-button uk-button-primary uk-modal-close" type="button"
                        onClick={applyMetaData}>Применить</button>
            </p>
        </div>        
    );  

    return createPortal(modalWindow, container);    

};

export default EditorMeta;