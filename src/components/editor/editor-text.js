export default class EditorText
{
    constructor(node, virtualNode)
    {
        this.node = node;
        this.virtualNode = virtualNode;

        this.node.addEventListener("click", (e) => this.textNodeClickHandler(e));      
        this.node.addEventListener("input", () => this.textNodeInputHandler());
        this.node.addEventListener("blur", () => this.textNodeBlurHandler());
        this.node.addEventListener("keypress", e => this.textNodeKeyboardHandler(e));

        if(this.node.parentNode.nodeName === "A" || this.node.parentNode.nodeName === "BUTTON")
        {
            this.node.addEventListener("contextmenu", e => this.textNodeRightClickHandler(e));
        }
    }

    textNodeClickHandler(e) 
    {           
        if(e) e.preventDefault();        
        this.node.contentEditable = true; 
        this.node.focus();   
    }

    textNodeInputHandler()
    {      
        this.virtualNode.innerText = this.node.innerText;    
    }

    textNodeBlurHandler()
    {    
        this.node.removeAttribute("contenteditable");       
    }

    textNodeKeyboardHandler(e)
    {        
        if(e.key === "Enter") this.node.blur();    
    }

    textNodeRightClickHandler(e)
    {
        e.preventDefault();
        this.textNodeClickHandler();
    }
}