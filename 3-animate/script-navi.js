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
            d.long = +d.long; // NaN
        });

        let states = new Set(data.map(d => d.state));
        states = Array.from(states);
        states = states.sort();
        console.log(states);

        // BAR CHART
        let barChart = new BarChart();

        barChart
            .selection(containerG)
            .size(size)
            .margins(margins)
            .data(data)
            .selectedState(states[0])
            .dispatch(dispatch);
        
        barChart.draw();

        populateStates(states);
    });


function populateStates(states) {
    d3.select('select#state')
        .selectAll('option')
        .data(states)
        .join('option')
        .attr('value', d => d)
        .text(d => d);

    d3.select('select#state')
        .on('change', function() {
            dispatch.call('changeState', this, this.value);
        });
}