const publicVapidKeys = 'BL0fGj1E6jenCMrGveDfuA-_xACla-rA5XKnb8xvaoCGYLyl03QX2Mrl5nr_mccMR1e3yj2kLDkeA-1GVMckEZE';

// check for service worker
if('serviceWorker' in navigator) {
    send().catch(err => console.error(err));
}

// register SW, register Push, Send Notification
async function send() {
    // register service worker
    console.log('registering service worker');
    const register = await navigator.serviceWorker.register('/worker.js', {
        scope: '/'
    });
    console.log('service worker registered');

    // register push
    console.log('registering push');
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKeys)
    });
    console.log('push registered');

    // send push notification
    console.log('sending push');
    await fetch('/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }
    });
    console.log('push sent');
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i){
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}