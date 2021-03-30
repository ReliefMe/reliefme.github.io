/* for the COVID 19 cases API */

// Adding Event Listener
window.addEventListener('load', () => fetchData());

async function fetchData() {
    try {
        const data = await fetch('https://api.covid19api.com/summary', {
            method: 'GET'
        });

        const res = await data.json();

        /* Getting elements from DOM */
        let total_cases = document.getElementById('total-cases');
        let total_deaths = document.getElementById('total-deaths');
        let total_recovered = document.getElementById('total-recovered');
        let active_cases = document.getElementById('active-cases');


        total_cases.textContent = res.Global.TotalConfirmed;
        total_deaths.textContent = res.Global.TotalDeaths;
        total_recovered.textContent = res.Global.TotalRecovered;
        active_cases.textContent = String(parseInt(res.Global.TotalConfirmed) - parseInt(res.Global.TotalDeaths) - parseInt(res.Global.TotalRecovered));

    } catch (err) {
        console.log(err);
    }
}