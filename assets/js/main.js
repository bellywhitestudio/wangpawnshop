let tickets = [];
const airtable_api_url = 'https://api.airtable.com/v0/applgpGFRXcIF7ORT/Data?api_key=keylmELBoZbgflH0P&fields%5B%5D=Name&fields%5B%5D=Dropped+Object&fields%5B%5D=Exchange+Object&fields%5B%5D=Reason&maxRecords=20&filterByFormula=NOT(Hidden)&sort%5B0%5D%5Bfield%5D=Created+time&sort%5B0%5D%5Bdirection%5D=desc';
let glide = {};

window.addEventListener('load', function () {
    document.querySelector('#button-scroll-to-tickets').addEventListener('click', function () {
        const section_tickets = document.querySelector('section.tickets');
        if(section_tickets) page_smoothly_scroll_to(section_tickets.offsetTop, 1000);
    });

    axios.get(airtable_api_url)
        .then((response) => {
            tickets = response.data.records;
            refresh_tickets();
        });

    if (getUrlParameter('autoRefresh') === 'true') {
        setInterval(() => {
            if (document.hasFocus()) {
                axios.get(airtable_api_url)
                    .then((response) => {
                        let should_update = false;
                        for (let i = 0; i < tickets.length; i++) {
                            if (response.data.records[i].id !== tickets[i].id) {
                                should_update = true;
                                break;
                            }
                        }

                        if (should_update) {
                            console.log('refresh data');
                            tickets = response.data.records;
                            glide.destroy();
                            refresh_tickets();
                        }
                    })
                    .catch(() => {
                        console.log('error');
                    });
            }
        }, 300000);
    }
}, false);

function refresh_tickets() {
    let sliders = document.querySelector('#tickets-slider ul.glide__slides');
    sliders.innerHTML = '';
    let lines = [{
        field_name: 'Dropped Object',
        label_name: "我願意拿出"
    }, {
        field_name: 'Exchange Object',
        label_name: "為了換得"
    }, {
        field_name: 'Reason',
        label_name: "因為"
    }];
    for(let i=0; i<tickets.length; i++) {
        let slider = document.createElement("li");
        slider.className = 'glide__slide ticket-wrapper';
        let img = document.createElement('img');
        img.src = './assets/img/ticket.svg';
        let content = document.createElement('div');
        content.className = "content";

        for(let j=0; j<lines.length; j++) {
            let line = document.createElement('div');
            line.className = "line";
            let label = document.createElement('span');
            label.className = "label";
            label.innerText = lines[j].label_name;
            let text = document.createElement('span');
            text.className = "text";
            text.innerText = tickets[i].fields[lines[j].field_name];

            line.appendChild(label);
            line.appendChild(text);
            content.appendChild(line);
        }

        slider.appendChild(img);
        slider.appendChild(content);
        sliders.appendChild(slider);
    }

    glide = new Glide('#tickets-slider', {
        perView: 1,
        autoplay: 7000,
        rewind: true,
        hoverpause: false,
        gap: 40,
        animationDuration: 1000,
        rewindDuration: 2000,
    }).mount();
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

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};