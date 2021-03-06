const margins = {t: 50, r: 50, b: 50, l: 50};
const size = {w: 800, h: window.innerHeight*0.8};
const svg = d3.select('svg');
const containerG = svg.append('g');
const dispatch = d3.dispatch('changeState');

svg.attr('width', size.w)
    .attr('height', size.h);

d3.csv('data/covid_data.csv')
    .then(function(data) {
        data.forEach(d => {
            d.cases = +d.cases;
            d.fips = +d.fips;
            d.deaths = +d.deaths;
            d.lat = +d.lat;
            d.long = +d.long;
        });

        // this line uses a Set to get just unique values of our states (since it will repeat a lot across counties)
        let states = new Set(data.map(d => d.state));
        // then we create an array from that set
        states = Array.from(states);
        states = states.sort();

        // BAR CHART
        let barChart = new BarChart(); // make the chair from the blueprint!
        // barChart.selection(containerG);
        // barChart.size(size);

        barChart
            .selection(containerG)
            .size(size)
            .margins(margins)
            .data(data)
            .dispatch(dispatch)
            .selectedState(states[0]);

        barChart.draw(); // draw the chart!

        populateStates(states);
    });

function populateStates(states) {
    d3.select("select#state") // create element for each
        .selectAll("option") //add options into this for dropdown menu
        .data(states) // bind the option to data
        .join("option") // this is the element we want to create
        .attr("value", d => d) // each d is a state element
        .text(d => d);

    d3.select("select#state")
        .on('change', function() {
            dispatch.call("changeState", this, this.value); 
        });
}