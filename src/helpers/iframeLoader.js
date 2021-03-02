HTMLIFrameElement.prototype.load = function(url)
{
    const iframe = this;
    iframe.src = `${url}?rnd=${Math.random().toString().substring(2)}`;   

    const maxTime = 40000;
    const interval = 200;
    var timerCount = 0;

    return new Promise((resolve, reject) =>
    {
        const timer = setInterval(() =>
        {
            timerCount++;

            if(iframe.contentDocument && iframe.contentDocument.readyState === "complete")
            {                
                clearInterval(timer);
                resolve();
            }
            else
            {               
                if(timerCount * interval > maxTime)
                {                    
                    clearInterval(timer);
                    reject("Iframe failed to load! Load time limit exceeded.");
                }
            }                
            
        }, interval);
    });   
    
};