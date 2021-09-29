const square1 = document.getElementById('square1');
const page = document.getElementById('page');

// Check I have access to the device orientation event
// if (typeof DeviceOrientationEvent['requestPermission'] === 'function') {
//     DeviceOrientationEvent['requestPermission']()
//         .then(permissionState => {
//             if (permissionState === 'granted') {
//                 window.addEventListener('deviceorientation', updateBackgroundGradient);
//             }
//         })
//         .catch(console.error);
// } else {
//     if (window.DeviceOrientationEvent) {
//         window.addEventListener('deviceorientation', updateBackgroundGradient);
//     }
// }

if (window.DeviceMotionEvent && typeof window.DeviceMotionEvent.requestPermission === 'function') {
    const banner = document.createElement('div')
    banner.innerHTML = `<div style="z-index: 1; position: absolute; width: 100%; background-color:#000; color: #fff"><p style="padding: 10px">Click here to enable DeviceMotion</p></div>`
    banner.onclick = getAccelerometer // You NEED to bind the function into a onClick event. An artificial 'onClick' will NOT work.
    document.querySelector('body').appendChild(banner)
}

function getAccelerometer() {
    window.DeviceMotionEvent.requestPermission()
        .then(response => {
            if (response === 'granted') {
                console.log('DeviceMotion permissions granted.')
                window.addEventListener('deviceorientation', updateBackgroundGradient);
            } else {
                console.log('DeviceMotion permissions not granted.')
            }
        })
        .catch(e => console.error(e));
};




// update the background gradient
function updateBackgroundGradient(evt) {
    // Get gamma value and update the position css custom property to match the gamma property of the device orientation event (gamma is tilting left and right)
    // - I added 50 to account for the offset.
    page.style.setProperty('--position', -evt.gamma + 50 +'%');
    square1.style.setProperty('--position', -evt.gamma + 50 +'%');

}



