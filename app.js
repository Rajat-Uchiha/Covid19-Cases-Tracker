console.log(`Working with fetch api`);

// Function to hide Loader
let loader = document.getElementById("Loading");
function hideLoader() {
    loader.style.display = "none";
}


let url = "https://covid-api.mmediagroup.fr/v1/cases";
fetch(url).then(function (response) {
    return response.json();
}).then(function (data) {
    //This array contains the data as an array
    let fullInfo = Object.entries(data);


    //Showing the percentage of total confirmed cases
    let globalCases = data.Global.All.confirmed;
    let gPopulation = data.Global.All.population;
    let PercentageCases = document.getElementById("percentageCases");
    let worldPercentage = (globalCases / gPopulation) * 100;
    worldPercentage = worldPercentage.toFixed(2);
    PercentageCases.innerText = worldPercentage;

    //retrieving the current values.
    let updatedDate = data.Afghanistan.All.updated;
    globalCases = data.Global.All.confirmed.toLocaleString("en-US");
    gPopulation = data.Global.All.population.toLocaleString("en-US");
    let gDeaths = data.Global.All.deaths.toLocaleString("en-US");

    //Showing the updateTime
    let update = document.getElementById("update");
    update.innerText = updatedDate;

    // Showing global confirmed cases
    let gCases1 = document.getElementById("cnCases");
    gCases1.innerText = globalCases;

    // Showing total population
    let population1 = document.getElementById("population");
    population1.innerText = gPopulation;

    // Showing total deaths
    let deaths1 = document.getElementById("deaths");
    deaths1.innerText = gDeaths;

    // Representing the Data into Table
    showTable(fullInfo);
    function showTable(newData) {
        let bodyofTable = document.getElementById("bodyofTable");
        for (let i = 0; i < newData.length - 1; i++) {
            if (i % 2 == 0) {
                let row = `  <tr class="border-b bg-stone-800">
                                    <td  class="text-sm text-white font-bold px-6 py-4 whitespace-nowrap countryName">
                                        ${newData[i][0]}
                                    </td>
                                    <td  class="text-sm text-white font-bold px-6 py-4 whitespace-nowrap">
                                    ${newData[i][1].All.population}
                                    </td>
                                    <td  class="text-sm text-white font-bold px-6 py-4 whitespace-nowrap">
                                    ${newData[i][1].All.confirmed.toLocaleString("en-US")}
                                    </td>
                                    <td  class="text-sm text-white font-bold px-6 py-4 whitespace-nowrap">
                                    ${newData[i][1].All.deaths.toLocaleString("en-US")}
                                    </td>
                                </tr> `;
                bodyofTable.innerHTML += row;
            }
            else {
                let row = `  <tr class="border-b bg-stone-600">
                                    <td  class="text-sm text-white font-bold px-6 py-4 whitespace-nowrap countryName">
                                        ${newData[i][0]}
                                    </td>
                                    <td  class="text-sm text-white font-bold px-6 py-4 whitespace-nowrap">
                                    ${newData[i][1].All.population ? newData[i][1].All.population : "Unknown"}
                                    </td>
                                    <td  class="text-sm text-white font-bold px-6 py-4 whitespace-nowrap">
                                    ${newData[i][1].All.confirmed.toLocaleString("en-US") ? newData[i][1].All.confirmed.toLocaleString("en-US") : "Unknown"}
                                    </td>
                                    <td  class="text-sm text-white font-bold px-6 py-4 whitespace-nowrap">
                                    ${newData[i][1].All.deaths.toLocaleString("en-US") ? newData[i][1].All.deaths.toLocaleString("en-US") : "Unknown"}
                                    </td>
                                </tr> `;
                bodyofTable.innerHTML += row;
            }
        }
    }
    
}).catch((err) => {
    console.log(err);
    console.log("Some error occured");
})
