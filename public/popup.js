chrome.runtime.sendMessage({
    action: "injectScript"
}, function (response) {
    if(response){
        console.log(response.status)
    }
})