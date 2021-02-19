function ScaleBand() {

    this.domain = function(domain) {
        if (arguments.length > 0) {
            this._domain = domain;
            return this;
        }
        return this._domain;
    }

    this.range = function(range) {
        if (arguments.length > 0) {
            this._range = range;
            return this;
        }
        return this._range;
    }
}

let x = new ScaleBand();
x.domain(['askdhfj'])
    .range([0,900]);