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

DeviceMotionEvent.requestPermission()
    .then(response => {
        if (response === 'granted') {
            window.addEventListener('deviceorientation', updateBackgroundGradient);
        }
    })
    .catch(console.error);



// update the background gradient
function updateBackgroundGradient(evt) {
    // Get gamma value and update the position css custom property to match the gamma property of the device orientation event (gamma is tilting left and right)
    // - I added 50 to account for the offset.
    page.style.setProperty('--position', -evt.gamma + 50 +'%');
    square1.style.setProperty('--position', -evt.gamma + 50 +'%');

}



