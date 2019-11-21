axios.get('https://api.airtable.com/v0/applgpGFRXcIF7ORT/Data?api_key=key1Wb5cOe9qMbz4N&fields%5B%5D=Name&fields%5B%5D=Dropped+Object&fields%5B%5D=Exchange+Object')
    .then((response) => {
        const raw_records = response.data.records;
        console.log(raw_records);
        let slides = document.querySelector('.carousel-inner');
        for(let i=0; i<raw_records.length; i++) {
            let item = document.createElement("div");
            item.classList.add("item");
            if(i===0) item.classList.add("active");
            let ticket = document.createElement("div");
            ticket.classList.add("ticket");
            let name = document.createElement("h2");
            name.innerHTML = raw_records[i].fields['Name'];
            let dropped = document.createElement("p");
            dropped.innerHTML = `想放下的： ${raw_records[i].fields['Dropped Object']}`;
            let exchanged = document.createElement("p");
            exchanged.innerHTML = `想換取的： ${raw_records[i].fields['Exchange Object']}`;
            ticket.appendChild(name);
            ticket.appendChild(dropped);
            ticket.appendChild(exchanged);
            item.appendChild(ticket);
            slides.appendChild(item);
        }
    })