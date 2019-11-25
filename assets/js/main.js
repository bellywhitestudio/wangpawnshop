// &filterByFormula=Display
let active_index = 0;
let tikets = [];

axios.get('https://api.airtable.com/v0/applgpGFRXcIF7ORT/Data?api_key=key1Wb5cOe9qMbz4N&fields%5B%5D=Name&fields%5B%5D=Dropped+Object&fields%5B%5D=Exchange+Object&fields%5B%5D=Reason')
    .then((response) => {
        tikets = response.data.records;
        refresh_tick();
    });

window.addEventListener('load', function () {
    document.querySelector('#button-next-ticket').addEventListener('click', function () {
        if(active_index === tikets.length - 1) {
            active_index = 0;
        } else {
            active_index += 1;
        }
        refresh_tick();
    });
    document.querySelector('#button-prev-ticket').addEventListener('click', function () {
        if(active_index === 0) {
            active_index = tikets.length - 1;
        } else {
            active_index -= 1;
        }
        refresh_tick();
    });

    document.querySelector('#button-scroll-to-tickets').addEventListener('click', function () {
        const section_tickets = document.querySelector('section.tickets');
        if(section_tickets) page_smoothly_scroll_to(section_tickets.offsetTop, 1000);
    });
}, false);

function refresh_tick() {
    let dropped = document.querySelector('#dropped');
    let exchanged = document.querySelector('#exchanged');
    let reason = document.querySelector('#reason');
    dropped.innerHTML = tikets[active_index].fields['Dropped Object'];
    exchanged.innerHTML = tikets[active_index].fields['Exchange Object'];
    reason.innerHTML = tikets[active_index].fields['Reason'];
}

function smoothly_scroll_to(element, to, duration) {
    if(element) {
        let start = element.scrollTop,
            change = to - start,
            currentTime = 0,
            increment = 20;

        let animateScroll = function() {
            currentTime += increment;
            let val = Math.easeInOutQuad(currentTime, start, change, duration);
            element.scrollTop = val;
            if(currentTime < duration) {
                setTimeout(animateScroll, increment);
            }
        };
        animateScroll();
    }
}

//t = current time
//b = start value
//c = change in value
//d = duration
Math.easeInOutQuad = function (t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t + b;
    t--;
    return -c/2 * (t*(t-2) - 1) + b;
};

function page_smoothly_scroll_to(to, duration) {
    smoothly_scroll_to(document.body, to, duration);
    smoothly_scroll_to(document.documentElement, to, duration);
};