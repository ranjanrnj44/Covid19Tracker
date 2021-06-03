//getting all variables


getIndiaData();
getChartData();

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


//get chart data
async function getChartData() {
  let url = "https://api.covid19api.com/summary";
  try {
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Something went wrong, please check the URL mate...`);
    } else {
        let convert_raw_data = await response.json();
        let data = convert_raw_data.Global;
      
        let newly_Confirm = data.NewConfirmed;
        let newly_Recovered = data.NewDeaths;
        let newly_Death = data.NewRecovered;
        let total_Confirm = data.TotalConfirmed;
        let total_Recovered = data.TotalDeaths;
        let total_Death = data.TotalRecovered;

        let ctx = document.getElementById("myChart").getContext("2d");

        //defining global properties
        Chart.defaults.global.defaultFontFamily = "Robot";
        Chart.defaults.global.defaultFontSize = 18;

        let config = new Chart(ctx, {
          type: "bar",
          data: {
            labels: [
              "Newly Confirmed",
              "New Deaths",
              "Newly Recovered",
              "Total Confirmed",
              "Total Deaths",
              "Total Recovered",
            ],
            datasets: [
              {
                label: "C19",
                data: [
                  newly_Confirm,
                  newly_Recovered,
                  newly_Death,
                  total_Confirm,
                  total_Recovered,
                  total_Death,
                ],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(55, 92, 192, 0.2)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(153, 102, 255,1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(55, 92, 192, 1)",
                ],
                borderWidth: 3,
                hoverBorderWidth: 4,
                hoverBorderColor: "black",
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: "Today's data COVID-19",
              fontSize: 25,
            },
            layout: {
              padding: {
                left: 0,
                top: 0,
                bottom: 0,
                top: 0,
              },
            },
            tooltips: {
              enabled: true,
            },
          },
        });
      }
  } catch (error) {
    alert(error);
  }
};
