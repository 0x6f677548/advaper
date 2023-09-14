window.onload = function () {
    var skipAdButton = document.getElementsByClassName('ytp-ad-skip-button ytp-button');
    var adPlayerOverlay = document.getElementsByClassName('ytp-ad-player-overlay'); // popup ads in video
    var adImageOverlay = document.getElementsByClassName('ytp-ad-image-overlay');


    removeAds();
    // insert a mutation observer to remove ads when they are added to the DOM
    var observer = new MutationObserver(removeAds);
    observer.observe(document, { subtree: true, childList: true });


    function removeAds() {
        removeCompanionAds();
        removePlayerAds();
    }

    function removePlayerAds() {
        if (document.querySelectorAll('.video-ads').length > 0) {

            clickSkipAdButton();
            skipFirstOverlay(function () {
                ads = document.querySelectorAll('.ytp-ad-text');
                // check if ads exist and any of the ads have innerhtml of 'Ad'
                if (ads.length > 0 && checkIfAdExists(ads)) {
                    console.debug('found ad...')
                    clickSkipAdButton();
                    let videos = document.querySelectorAll('video');
                    videos.forEach(function (video) {
                        if (video && video.duration) {
                            console.debug('resetting video...')
                            video.currentTime = video.duration;
                        }
                    });
                }
            });
        }

        // an helper function that checks if ANY of the ads have innerhtml of 'Ad'
        // assumes that ads is a list of elements and not null
        function checkIfAdExists(ads) {
            ads.forEach(function (ad) {
                if (ad && ad.innerHTML.includes('Ad')) {
                    return true;
                }
            });
            return false;
        }
    }

    function removeCompanionAds() {
        var elementsToRemove = document.querySelectorAll('ytd-ad-slot-renderer, #player-ads');
        elementsToRemove.forEach(function (element) {
            console.debug('Companion ad element found. Removing it...');
            element.parentNode.removeChild(element);
        });
    }

    function clickSkipAdButton() {
        if (skipAdButton && skipAdButton.length > 0) {
            console.debug('clicking skip button...');
            skipAdButton[0].click();
        } else {
            console.debug('no skip button found...');
        }
    }

    function skipFirstOverlay(callback) {
        if (adPlayerOverlay[0] && adPlayerOverlay.length > 0) {
            console.debug('skip first inner ad...(player)');
            adPlayerOverlay[0].style.visibility = 'hidden';
        }
        else if (adImageOverlay[0] && adImageOverlay.length > 0) {
            console.debug('skip first inner ad...(image)');
            adImageOverlay[0].style.visibility = 'hidden';
        }
        callback();
    }


};


