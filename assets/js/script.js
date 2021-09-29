const square1 = document.getElementById('square1');
const page = document.getElementById('page');
const bannerText = 'Tap to enable DeviceMotion';
const bannerInnerHtml = `<div id="banner">${bannerText}</div>`

if (window.DeviceMotionEvent && typeof window.DeviceMotionEvent.requestPermission === 'function') {
    const banner = document.createElement('div');
    banner.innerHTML = bannerInnerHtml;
    // This needs to bind the function to a onClick event. An artificial 'onClick' will not work.
    banner.onclick = getAccelerometer;
    document.querySelector('body').appendChild(banner);
}

function getAccelerometer() {
    document.getElementById("banner").style.display = "none";

    window.DeviceMotionEvent.requestPermission()
        .then(response => {
            if (response === 'granted') {
                console.log('DeviceMotion permissions granted')
                window.addEventListener('deviceorientation', updateBackgroundGradient);
            } else {
                console.log('DeviceMotion permissions not granted')
            }
        })
        .catch(e => console.error(e));
};

// Update the background gradient
function updateBackgroundGradient(evt) {
     /**
     * Get gamma value and update the position CSS custom property to match the gamma property of the device orientation event
     * (gamma is tilting left and right)
     * I added 50 to account for the offset.
     **/
    page.style.setProperty('--position', -evt.gamma + 50 +'%');
    square1.style.setProperty('--position', -evt.gamma + 50 +'%');

}



