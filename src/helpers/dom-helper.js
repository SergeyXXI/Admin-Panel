export const parseStrToDOM = str =>
{
    const parser = new DOMParser();
    return parser.parseFromString(str, "text/html");
};

export const wrapTextNodes = dom =>
{
    const textNodes = [];        

    const findTextNodes = parentNode =>
    {
        parentNode.childNodes.forEach(node =>
        {
            node.nodeType === 3 &&
            node.nodeValue.replace(/\s+/g, "").length > 0 ?
            textNodes.push(node) : findTextNodes(node); 
        });
    };

    findTextNodes(dom.body);       

    textNodes.forEach((node, i) =>
    {
        const wrapper = dom.createElement("text-editor");                    
        node.replaceWith(wrapper);
        wrapper.append(node);
        wrapper.setAttribute("data-node", i);
    });

    return dom;
};

export const parseDOMtoStr = dom =>
{
    const s = new XMLSerializer();        
    return s.serializeToString(dom);
};

export const unwrapTextNodes = dom =>
{
    dom.querySelectorAll("text-editor").forEach(node =>
    {        
        node.replaceWith(node.firstChild);
    });
};

export const wrapImages = dom =>
{
    dom.querySelectorAll("img").forEach((img, i) => img.setAttribute("editableimgid", i));

    return dom;
};

export const unwrapImages = dom =>
{
    dom.querySelectorAll("[editableimgid]").forEach(img => img.removeAttribute("editableimgid"));    
};
