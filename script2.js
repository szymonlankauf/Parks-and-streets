// Declaring classes

class Elements {
    constructor(name, yearOfCreation) {
        this.name = name;
        this.yearOfCreation = yearOfCreation;
    }
    calcAge = function() {
        let now = new Date().getFullYear();
        return now - this.yearOfCreation;
    }
};

class Park extends Elements {
    constructor(name, yearOfCreation, trees, area) {
        super(name, yearOfCreation);
        this.trees = trees;
        this.area = area;
    }
    calcDensity = function() {
        return this.trees / this.area;
    }
};

class Street extends Elements {
    constructor(name, yearOfCreation, length, size = 'normal') {
        super(name, yearOfCreation);
        this.length = length;
        this.size = size;
    }
};

// Creating Parks Map

const Parks = new Map();
Parks.set(1, new Park('Newton\'s Park', 1876, 790, 1.350));
Parks.set(2, new Park('Chopin\'s Park', 1845, 3550, 2.150));
Parks.set(3, new Park('Hawking\'s Park', 1999, 940, 1.230));
Parks.set('Average', (() => {return (Parks.get(1).calcAge() + Parks.get(2).calcAge() + Parks.get(3).calcAge())/3})())
//Parks.set('thePark', getThePark()) -- this works just fine, with function declared outside the map
Parks.set('thePark', (() => {
    for( let [key, value] of Parks.entries() ) {
        if(!typeof(key) === 'number') continue;
        if(value.trees > 1000) {
           return value.name;
        }
    }
})());

// Creating Streets Map

const Streets = new Map();
Streets.set(0, new Street('Lincoln\'s Street', 1890, 950));
Streets.set(1, new Street('Copernicus\' Street', 1797, 1200, 'big'));
Streets.set(2, new Street('Einstein\'s Street', 1930, 880, 'small'));
Streets.set(3, new Street('Pasteur\'s Street', 1890, 700, 'tiny'));
Streets.set('totalLength', (() => {
    let sum = 0;
    for( let [key, value] of Streets.entries() ) {
        if(typeof(key) === 'number') {
            sum += value.length;
        }
    }
    return sum;
})());
Streets.set('AvgLength', (() => {
    return Streets.get('totalLength')/4;
})());
/*Streets.set('streetSize', (() => {
    let sizes = [];
    for( [key, value] of Streets.entries() ) {
        if(typeof(key) === 'number') {
            sizes[key] = value.size;
        }
    }
    return sizes;
})());*/



//console.log(Parks.get('Park1').calcAge());

/*function getThePark() {                           // Declaration of this function is necessary if we dont declare it inside map
    for( let [key, value] of Parks.entries() ) {
        if(!typeof(key) === 'number') continue;
        if(value.trees > 1000) {
           return value.name
        }
    }
};*/

function init() {
    //Parks
    console.log('----PARKS REPORT----');
    console.log(`Our 3 parks are an average of ${Parks.get('Average')} years old`);
    Parks.forEach((value, key) => {
        if(typeof(key) === 'number') {
            console.log(`The ${value.name} has a tree density of ${value.calcDensity()} per square km.`)
        }
    });
    console.log(`${Parks.get('thePark')} has more than a 1000 trees.`)
    //Streets
    console.log('----STREETS REPORT----');
    console.log(`Our 4 streets have a total length of: ${Streets.get('totalLength')}, and average length of: ${Streets.get('AvgLength')}.`);
    Streets.forEach((value,key) => {
        if(typeof(key) === 'number') {
            console.log(`${value.name}, built in ${value.yearOfCreation} is a ${value.size} street.`);
        }
    });

}

init();