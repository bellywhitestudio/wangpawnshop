// &filterByFormula=Display
let active_index = 0;
let tikets = [];

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
}, false);

function refresh_tick() {
    let dropped = document.querySelector('#dropped');
    let exchanged = document.querySelector('#exchanged');
    let reason = document.querySelector('#reason');
    dropped.innerHTML = tikets[active_index].fields['Dropped Object'];
    exchanged.innerHTML = tikets[active_index].fields['Exchange Object'];
    reason.innerHTML = tikets[active_index].fields['Reason'];
}

axios.get('https://api.airtable.com/v0/applgpGFRXcIF7ORT/Data?api_key=key1Wb5cOe9qMbz4N&fields%5B%5D=Name&fields%5B%5D=Dropped+Object&fields%5B%5D=Exchange+Object&fields%5B%5D=Reason')
    .then((response) => {
        tikets = response.data.records;
        refresh_tick();
    });