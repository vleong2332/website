document.addEventListener('DOMContentLoaded', function() {
    showContent();
    initTextCarousel();
    addElevationToNav();
});


function showContent() {
    document.querySelector('body').classList.remove('opaque');
}

function initTextCarousel() {
    var el = document.querySelector('.text-carousel'),
        items = el && el.children ? el.children : [],
        counter = 0;

    // Hide all but the first children
    for (var i = 0, length = items.length; i < length; i++) {
        if (i !== 0) {
            items[i].classList.add('opaque');
        }
    }

    runInterval(function() {
        items[counter].classList.add('opaque');
        counter = (counter + 1) > (items.length - 1) ? 0 : counter + 1;
        items[counter].classList.remove('opaque');
    }, 2333);
}

function runInterval(func, interval) {
    var error = false,
        call = function(interval) {
            return function() {
                if (!error) {
                    setTimeout(call, interval);
                    try {
                        func.call(null);
                    } catch (e) {
                        console.error(e);
                        error = true;
                    }
                }
            };
        }(interval);

    setTimeout(call, interval);
}

function addElevationToNav() {
    var el = document.querySelector('nav');
    checkNavElevation(el);
    document.addEventListener('scroll', function() {
        checkNavElevation(el);
    });
}

function checkNavElevation(el) {
    if (document.querySelector('body').getBoundingClientRect().top < 0) {
        el.classList.add('elevated');
    } else {
        el.classList.remove('elevated');
    }
}