// creating a function that creates a bar chart for us
// our BLUEPRINT (class)

function BarChart() {


    // // the data with which we want to draw the bar-chart
    // this.data = function (data) {
    //     if (arguments.length > 0) {
    //         // check if there are any arguments to the function
    //         this._data = data;
    //         return this;
    //     }
    //     // if there are no arguments to the function
    //     // return the dataset already bound to the variable/instance
    //     return this._data;

    //     // WHY DO WE DO THIS?
    //     // this is done to achieve something similar to d3
    //     // d3.selectAll('rect').data(dataArray) -> binds the dataArray to selection and returns this
    //     // d3.selectAll('rect').data() -> returns the dataset the selection is bound to
    // }

    // selection
    this.selection = function(selection) {
        this._selection = selection; // "this" is referring to an object -- every time we call this function we create a new "this"
        
        return this;
    }
    // size
    this.size = function(size) {
        this._size = size;

        return this;
    }
    
    //margins
    this.margins = function(margins) {
        this._margins = margins;

        if (!this._size) {
            console.error('Setup size before margins');
            return;
        }
        if (!this._selection) {
            console.error('Setup selection before margins');
            return;
        }

        this._containerSize = {
            w: this._size.w - margins.l - margins.r,
            h: this._size.h - margins.t - margins.b
        };

        this._selection
            .attr('transform', `translate(${margins.l}, ${margins.t})`);

        return this;
    }

    // data
    this.data = function(data) {
        this._data = data;

        return this;
    }

    this.selectedState = function(state) {
        this._selectedState = state;

        return this;

    }

    this.dispatch = function(dispatch){
        this._dispatch = dispatch;

        this._dispatch.on("changeState", (state) => {

        this._selectedState = state;

        this.draw();

        });

        return this;
    }
    
    // draw (add rect)
    this.draw = function() {
        
        let filteredData = this._data
            .filter(d => d.state === this._selectedState);
        
        let scaleX = d3.scaleBand()
            .domain(filteredData.map(d => d.county))
            .range([0, this._size.w])
            .padding(0.2);
        
        let scaleY = d3.scaleLinear()
            .domain([0, d3.max(filteredData, d => d.cases)])
            .range([this._size.h, 0]);
    
        let rectSel = this._selection
            .selectAll("rect")
            .data(filteredData, (d, i) => i);


        rectSel.enter()
            .append('rect')
            .attr("x", d => scaleX(d.county))
            .attr("y", d => scaleY(d.cases))
            .attr("width", scaleX.bandwidth())
            .attr("height",0)
            .transition()
            .duration(1000)
            .attr("height", d => this._size.h - scaleY(d.cases));

        // rectSel.join("rect")
        rectSel   
            .attr("x", d => scaleX(d.county))
            .attr("y", d => scaleY(d.cases))
            .attr("width", scaleX.bandwidth())
            .attr("height", d => this._size.h - scaleY(d.cases));

        
        rectSel.exit()
            .transition()
            .duration(1000)
            .attr("height",0)
            .remove();

        this.drawAxes(scaleX, scaleY);

    }

    // draw axes
    this.drawAxes = function(scaleX, scaleY){
        
        //Draw x-axis
        this.drawAxisX(scaleX);

         //Draw y-axis
        this.drawAxisY(scaleY);
    }

    this.drawAxisX = function(scaleX){
        let axisX = d3.axisBottom(scaleX);

        let axisG = this._selection
            .selectAll("g.axis-x")
            .data([1])
            .join('g')
            .classed("axis-x", true)
            .classed('axis', true)
            .attr("transform", `translate(0, ${this._containerSize.h})`);

        axisG.call(axisX);

    }


    this.drawAxisY = function(scaleY){
        let axisY = d3.axisLeft(scaleY);

        let axisG = this._selection
            .selectAll("g.axis-y")
            .data([1])
            .join('g')
            .classed("axis-y", true)
            .classed('axis', true)
            // .attr("transform", `translate(0, ${this._containterSize.h})`);

        axisG.call(axisY);

    }

}

