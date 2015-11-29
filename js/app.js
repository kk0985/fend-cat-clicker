
/* ========Figures======= */

var figures = {
	currentCat: null,
	cats: [
		{
			clickCount: 0,
			name: 'Little Cute Cat',
			imgSrc: 'images/little_cute_cat.jpg',
			imgAttribution : 'petattack.com/socializing-cats/'
		},
		{
			clickCount: 0,
			name: 'Adorable Cat',
			imgSrc: 'images/adorable-cat.jpg',
			imgAttribution : 'https://www.petsworld.in/blog/cat-pictures-funny-cute-adorable-and-all-time-favorite-cat-images.html'
		}
	]
};

/* ======= Octopus ======= */

var octopus = {

    init: function() {
        // set our current cat to the first one in the list
        figures.currentCat = figures.cats[0];

        // tell our views to initialize
        catListView.init();
        catView.init();
    },

    getCurrentCat: function() {
        return figures.currentCat;
    },

    getCats: function() {
        return figures.cats;
    },

    // set the currently-selected cat to the object passed in
    setCurrentCat: function(cat) {
        figures.currentCat = cat;
    },

    // increments the counter for the currently-selected cat
    incrementCounter: function() {
        figures.currentCat.clickCount++;
        catView.render();
    }
};


/* ======= View ======= */

var catView = {

    init: function() {
        // store pointers to our DOM elements for easy access later
        this.catElem = document.getElementById('cat');
        this.catNameElem = document.getElementById('cat-name');
        this.catImageElem = document.getElementById('cat-img');
        this.countElem = document.getElementById('cat-count');

        // on click, increment the current cat's counter
        this.catImageElem.addEventListener('click', function(){
            octopus.incrementCounter();
        });

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        // update the DOM elements with values from the current cat
        var currentCat = octopus.getCurrentCat();
        this.countElem.textContent = currentCat.clickCount;
        this.catNameElem.textContent = currentCat.name;
        this.catImageElem.src = currentCat.imgSrc;
    }
};

var catListView = {

    init: function() {
        // store the DOM element for easy access later
        this.catListElem = document.getElementById('cat-list');

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        var cat, elem, i;
        // get the cats we'll be rendering from the octopus
        var cats = octopus.getCats();

        // empty the cat list
        this.catListElem.innerHTML = '';

        // loop over the cats
        for (i = 0; i < cats.length; i++) {
            // this is the cat we're currently looping over
            cat = cats[i];

            // make a new cat list item and set its text
            elem = document.createElement('li');
            elem.textContent = cat.name;

            // on click, setCurrentCat and render the catView
            // (this uses our closure-in-a-loop trick to connect the value
            //  of the cat variable to the click event function)
            elem.addEventListener('click', (function(catCopy) {
                return function() {
                    octopus.setCurrentCat(catCopy);
                    catView.render();
                };
            })(cat));

            // finally, add the element to the list
            this.catListElem.appendChild(elem);
        }
    }
};

// make it go!
octopus.init();