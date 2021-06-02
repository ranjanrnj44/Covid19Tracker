//getting all variables


getIndiaData();

//get the data from api - INDIA
async function getIndiaData() {
    let url = "https://api.covid19api.com/summary";
    try {
        let response = await fetch(url)
        if (!response.ok) {
            throw new Error(`Something went wrong, please check the URL mate...`);
        }
        else {
            let convert_raw_data = await response.json();
            let data = convert_raw_data.Countries[76]
            console.log(data);

            //implement the card functionality here
            let cards_container = document.getElementById("cards_container");
            let card_div = document.createElement("div");
                card_div.className="single_card"
                card_div.innerHTML = `
                    <div id="card" class="orange">
                        <h1>${data.TotalConfirmed}</h1>
                        <h3>Confirmed</h3>
                    </div>

                    <div id="card" class="green">
                        <h1>${data.TotalRecovered}</h1>
                        <h3>Recovered</h3>
                    </div>

                    <div id="card" class="red">
                        <h1>${data.TotalDeaths}</h1>
                        <h3>Passed Away</h3>
                    </div>
                `;
            cards_container.appendChild(card_div);
        }
    }
    catch (error){
        alert(error);
    }
}