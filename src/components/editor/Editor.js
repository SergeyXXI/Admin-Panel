import React, {useState, useEffect} from "react";
import axios from "axios";
import "../../helpers/iframeLoader.js";
import {parseStrToDOM, wrapTextNodes, parseDOMtoStr,
        unwrapTextNodes, wrapImages, unwrapImages} from "../../helpers/dom-helper.js";
import EditorText from "./editor-text.js";
import UIkit from "uikit";
import Spinner from "../spinner/Spinner";
import ConfirmModal from "../confirm-modal/ConfirmModal";
import ChooseModal from "../choose-modal/ChooseModal";
import Panel from "../panel/Panel";
import EditorMeta from "../editor-meta/EditorMeta";
import Login from "../login/Login";

var currentPage = "index.html", iframe, virtualDOM,
    imgUploader, img, imgVirtual;

const getPages = setPages =>
{
    axios.get("api/")
    .then(resp => setPages(resp.data));    
};

const enableTextEditing = () =>
{
    const textNodes = iframe.contentDocument.querySelectorAll("text-editor");
    textNodes.forEach(node =>
    {   
        const dataNode = node.getAttribute("data-node");
        const virtualNode = virtualDOM.querySelector(`[data-node="${dataNode}"]`);

        new EditorText(node, virtualNode);        
        
    });  

};

const enableImageEditing = () =>
{
    imgUploader = document.getElementById("img-uploader");    

    iframe.contentDocument.querySelectorAll("[editableimgid]").forEach(item =>
    {
        const id = item.getAttribute("editableimgid");
        const virtualElement = virtualDOM.querySelector(`[editableimgid="${id}"]`);
        
        item.addEventListener("contextmenu", e =>
        {
            e.preventDefault();            
            img = item;
            imgVirtual = virtualElement;
            imgUploader.click();
        })

        item.addEventListener("click", e =>
        { 
            e.preventDefault();            
        });        
       
    });    
                                                               
};

const injectIframeStyles = () =>
{
    const style = iframe.contentDocument.createElement("style");
    style.innerHTML =
    `text-editor:hover
     {
        outline: 3px solid orange;
        outline-offset: 5px;
     }
     text-editor:focus
     {
        outline: 3px solid red;
        outline-offset: 5px;
     }
     [editableimgid]:hover
     {
        outline: 3px solid #0089ffcc;
        outline-offset: 5px;
        cursor: pointer
     }       
     `;
      
    iframe.contentDocument.head.append(style);
};

export const Editor = () =>
{
    const [pages, setPages] = useState();    
    const [loading, setLoading] = useState(true);
    const [backups, setBackups] = useState([]); 
    const [authd, setAuthd] = useState(null);       

    const initIframe = () =>
    {        
        iframe = document.querySelector("iframe");    
        openPage(currentPage);
    };

    const openPage = page =>
    {
        setLoading(true);            

        const requestPage = `../${page}`;

        axios.get(`${requestPage}?rnd=${Math.random()}`)
             .then(response => parseStrToDOM(response.data))
             .then(wrapTextNodes)
             .then(wrapImages)         
             .then(dom => {virtualDOM = dom; return dom; })
             .then(parseDOMtoStr)         
             .then(html=> axios.post("api/saveTemp.php", {html}))
             .then(() => iframe.load("../temp_sdjfhj734_dhghery7234.html"))
             .then(() => enableTextEditing())
             .then(() => enableImageEditing())
             .then(() => { injectIframeStyles(); currentPage = page; })
             .then(() => axios.post("api/deletePage.php", {name: "temp_sdjfhj734_dhghery7234.html"}))
             .then(() => getBackups())
             .finally(() => setLoading(false));
    };

    const savePage = async () =>
    {
        setLoading(true);        

        const newDOM = virtualDOM.cloneNode(true);
        unwrapTextNodes(newDOM);
        unwrapImages(newDOM);
        const html = parseDOMtoStr(newDOM);

        await axios.post("api/savePage.php", {html, page: currentPage})
                   .then(() => UIkit.notification("Изменения успешно сохранены!",
                                                  {status: 'success', timeout: 2000}))
                   .catch(() => UIkit.notification("Ошибка сохранения :(", {status:'danger', timeout: 2000}))
                   .finally(() => setLoading(false));

        getBackups();
    };

    const getBackups = () =>
    {
        axios.get(`backups/backup.json?rnd=${Date.now()}`)
             .then(response => { setBackups(response.data.filter(item => item.page === currentPage))})
             .catch(() => {});            
        
    };
    
    const loadBackup = (file, page) =>
    {
        const msg = `<p class='paragraph-confirm'>Восстановить выбранную копию страницы?</p>
                     <span class="modal-span-warning">Все несохраненные данные будут утеряны!</span>`;

        UIkit.modal.confirm(msg, {labels: {ok: "Ок", cancel: "Отмена"}})
                   .then(() =>
                         {
                            axios.post("api/loadBackup.php", {filename: file, page})
                                 .then(() => openPage(page))                         
                                 .catch(() => UIkit.notification("Файл бекапа не существует!", {status:'danger'}));
                         })
                   .catch(() => {});
       
    };

    const fileAddedHandler = () =>
    { 
        const formData = new FormData();
        formData.append("image", imgUploader.files[0]); 
        
        setLoading(true);
        
        axios.post("api/uploadImg.php", formData)
             .then(({data}) => img.src = imgVirtual.src = `img/${data}`)             
             .catch(() => UIkit.notification({message: "Ошибка загрузки изображения", status: "danger" }))
             .finally(() => { imgUploader.value = ""; setLoading(false); });
        
    };  
    
    const authorization = password =>
    {
        return axios.post("api/login.php", {password})
                    .then(({data}) =>
                          {   
                              if(data === true) setAuthd(true);
                              else              setAuthd(false);                            

                              return data;                                
                                    
                          });
    };
   
    const logOut = () =>
    {
        axios.get("api/logOut.php")            
             .then(() => window.location = "/");
    };

    useEffect(() =>
    {  
        if(authd === null) authorization(); 

        if(authd)
        {
            getPages(setPages);        
            initIframe(); 
        }           
                        
    }, [authd]);      

    if(!authd)
    {
        
        if(authd === false) return( <Login authorization={authorization} />);
        else                return null;
    }      
    else
    {
        return( 
            <>       
                {loading ? <Spinner active /> : <Spinner />}
    
                <Panel exit={logOut} />                   
                
                <ConfirmModal save={savePage} />
                <ChooseModal id="modal-choose" items={pages} choose={openPage} title="Открыть страницу" /> 
                <ChooseModal id="modal-backup" items={backups} choose={loadBackup} title="Восстановить" />
                <EditorMeta dom={virtualDOM} />
    
                <input id="img-uploader" type="file" accept="image/*" style={{display: "none"}}
                    onChange={fileAddedHandler} />
                
                <iframe src=""></iframe>
                
            </>
        );
    }    

}; 

