importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

firebase.initializeApp({
    messagingSenderId: "762005281615"
});

const messaging = firebase.messaging();