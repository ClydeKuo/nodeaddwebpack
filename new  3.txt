(function() {
    function ajaxEventTrigger(event) {
      var ajaxEvent = new CustomEvent(event, { detail: this });
      window.dispatchEvent(ajaxEvent);
    }
    var oldXHR = window.XMLHttpRequest;
    function newXHR() {
      var realXHR = new oldXHR();
      realXHR.addEventListener('abort', function () { ajaxEventTrigger.call(this, 'ajaxAbort'); }, false);
      realXHR.addEventListener('error', function () { ajaxEventTrigger.call(this, 'ajaxError'); }, false);
      realXHR.addEventListener('load', function () { ajaxEventTrigger.call(this, 'ajaxLoad'); }, false);
      realXHR.addEventListener('loadstart', function () { ajaxEventTrigger.call(this, 'ajaxLoadStart'); }, false);
      realXHR.addEventListener('progress', function () { ajaxEventTrigger.call(this, 'ajaxProgress'); }, false);
      realXHR.addEventListener('timeout', function () { ajaxEventTrigger.call(this, 'ajaxTimeout'); }, false);
      realXHR.addEventListener('loadend', function () { ajaxEventTrigger.call(this, 'ajaxLoadEnd'); }, false);
      realXHR.addEventListener('readystatechange', function() { ajaxEventTrigger.call(this, 'ajaxReadyStateChange'); }, false);
      return realXHR;
    }
    window.XMLHttpRequest = newXHR;
})();
// var xhr = new XMLHttpRequest();
window.addEventListener('ajaxReadyStateChange', function (e) {
  console.log(e.detail); // XMLHttpRequest Object
});
window.addEventListener('ajaxAbort', function (e) {
  // console.log(e.detail.responseText); // XHR ·µ»ØµÄÄÚÈÝ
});
// xhr.send();

window.onload = function() {
    console.log($('html'));
}


<head><meta charset="UTF-8"><title></title></head><body><div id="">ssss</div></body>