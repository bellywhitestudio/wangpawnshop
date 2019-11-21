// &filterByFormula=Display
axios.get('https://api.airtable.com/v0/applgpGFRXcIF7ORT/Data?api_key=key1Wb5cOe9qMbz4N&fields%5B%5D=Name&fields%5B%5D=Dropped+Object&fields%5B%5D=Exchange+Object&fields%5B%5D=Reason')
    .then((response) => {
        const raw_records = response.data.records;
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
            dropped.innerHTML = `我願意拿出 ${raw_records[i].fields['Dropped Object']} ，`;
            let exchanged = document.createElement("p");
            exchanged.innerHTML = `為了換得 ${raw_records[i].fields['Exchange Object']} ，`;
            let reason = document.createElement("p");
            reason.innerHTML = `因為 ${raw_records[i].fields['Reason']} 。`;
            ticket.appendChild(name);
            ticket.appendChild(dropped);
            ticket.appendChild(exchanged);
            ticket.appendChild(reason);
            item.appendChild(ticket);
            slides.appendChild(item);
        }
    })