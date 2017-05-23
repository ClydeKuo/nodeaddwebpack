// ==UserScript==
// @name        demo2
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @require      http://code.jquery.com/jquery-3.2.1.min.js
// @match        http://adpays.net/*
// @grant        none
// ==/UserScript==
// Your code here...
(function(){
    clearTimeout(onLoad);
    $('iframe').remove();
})();


1

idel
ÊÇ