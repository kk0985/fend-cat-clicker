
/* ========Model======= */

var model = {
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
        },
        {
            clickCount: 0,
            name: 'What U Say Cat',
            imgSrc: 'images/cat.jpg',
            imgAttribution: 'https://www.petfinder.com/animal-shelters-and-rescues/fostering-cats/'
        },
        {
            clickCount: 0,
            name: 'Winged Cat',
            imgSrc: 'images/winged-cat.jpg',
            imgAttribution: 'https://www.reddit.com/r/explainlikeimfive/comments/2irfyo/eli5_if_cats_are_lactoseintolerant_how_did_we/'
        },
        {
            clickCount: 0,
            name: 'Cat and Dog',
            imgSrc: 'images/Dog-and-cat.jpg',
            imgAttribution: 'http://www.fanpop.com/clubs/teddybear64/images/16834786/title/dog-cat-wallpaper-wallpaper'
        },
    ],
};

/* ======= Octopus ======= */

var octopus = {

    init: function() {
        // set our current cat to the first one in the list
        model.currentCat = model.cats[0];

        // tell our views to initialize
        catListView.init();
        catView.init();
        adminView.init();
    },

    getCurrentCat: function() {
        return model.currentCat;
    },

    getCats: function() {
        return model.cats;
    },

    // set the currently-selected cat to the object passed in
    setCurrentCat: function(cat) {
        model.currentCat = cat;
    },

    // increments the counter for the currently-selected cat
    incrementCounter: function() {
        model.currentCat.clickCount++;
        catView.render();
    },
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

var adminView = {
        init: function(){
            var admin = document.getElementById('btnAdmin');
            var cancel = document.getElementById('cancel');
            var save = document.getElementById('submit');
            var name = document.getElementById('input-name');
            var src = document.getElementById('imgAttribution');
            var clicks = document.getElementById('clickCount');

            admin.addEventListener('click', function(){
                document.getElementById('adminView').style.display = 'inline-block';
                var currentCat = octopus.getCurrentCat();
                name.value = model.currentCat.name;
                src.value = model.currentCat.imgAttribution;
                clicks.value = model.currentCat.clickCount;
            });

            cancel.addEventListener('click', function(){
                document.getElementById('adminView').style.display = 'none';
            });

            save.addEventListener('click', function(){
                octopus.updateCat(name.value, src.value, clicks.value);
                document.getElementById('adminView').style.display = 'none';
            });
        }
    };

// make it go!
octopus.init();