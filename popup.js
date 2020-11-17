function wheremst(str) {
    if (str.match(/\/\/t\.co/)) {
        return "probably some tweet";
    }
    return null;
}

(() => {
  document.addEventListener('DOMContentLoaded', function () {
      const info = document.getElementById("info")
      
      info.innerHTML = ""; 
      const data = document.getElementById("data")            
      data.innerHTML = "";
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
            if (response.farewell && response.farewell.length > 0) {
                const anchor = document.createElement("a");

                anchor.setAttribute("href", response.farewell); 
                anchor.innerText = response.farewell;
                info.appendChild(anchor);
                const where = wheremst(response.farewell) 
                if (where) {
                    data.innerText = where;
                }
            } else {
                const p = document.createElement("p");
                p.innerText = "idk"
                info.appendChild(p)
            }
        });
      });
  });

})();