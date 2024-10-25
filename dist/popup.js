/******/ (() => { // webpackBootstrap
/*!*************************!*\
  !*** ./public/popup.js ***!
  \*************************/
chrome.runtime.sendMessage({
    action: "injectScript"
}, function (response) {
    if(response){
        console.log(response.status)
    }
})
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2xpcGNsYXJpdHktY2hyb21lLWV4dGVuc2lvbi8uL3B1YmxpYy9wb3B1cC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7XHJcbiAgICBhY3Rpb246IFwiaW5qZWN0U2NyaXB0XCJcclxufSwgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICBpZihyZXNwb25zZSl7XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2Uuc3RhdHVzKVxyXG4gICAgfVxyXG59KSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==