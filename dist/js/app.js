"use strict";for(var smoothScrollTrigger=document.querySelectorAll('a[href^="#"]'),_loop=function(n){smoothScrollTrigger[n].addEventListener("click",function(o){o.preventDefault();var e=smoothScrollTrigger[n].getAttribute("href"),t=document.getElementById(e.replace("#","")).getBoundingClientRect().top+window.pageYOffset-60;window.scrollTo({top:t,behavior:"smooth"})})},i=0;i<smoothScrollTrigger.length;i++)_loop(i);function showElementAnimation(){var o=document.getElementsByClassName("js-fadein");if(o)for(var e=768<window.innerHeight?200:80,t=window.pageYOffset,n=window.innerHeight,i=0;i<o.length;i++){t+o[i].getBoundingClientRect().top<t+n-e&&o[i].classList.add("scrollin")}}function getScrolled(){return void 0!==window.pageYOffset?window.pageYOffset:document.documentElement.scrollTop}window.addEventListener("scroll",showElementAnimation);var topButton=document.getElementById("js-scroll-fadein");function scrollToTop(){var o=getScrolled();window.scrollTo(0,Math.floor(o/2)),0<o&&window.setTimeout(scrollToTop,30)}window.onscroll=function(){500<getScrolled()?topButton.classList.add("is-fadein"):topButton.classList.remove("is-fadein")},topButton.addEventListener("click",scrollToTop);