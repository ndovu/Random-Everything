var duplicateDivs;
var excess;
var counter = 1;
var maximumShapes = 500;

// Colours taken from here:
// http://ethanschoonover.com/solarized
// Thanks Ethan!
var solarize_colours = ['#002b36', '#073642', '#586e75', '#657b83', 
                        '#839496', '#93a1a1', '#eee8d5', '#fdf6e3', 
                        '#b58900', '#cb4b16', '#dc322f', '#d33682', 
                        '#6c71c4', '#268bd2', '#2aa198', '#859900'];

// Use DRY principle on Math.random() method
var makeRandom = function(range, minimum) {
  (typeof minimum == 'undefined') && (minimum = 0);
  return minimum + Math.round(range * Math.random());
};

var makeSquareCssRandom = function() {
  return {
    background:     "rgb(" +makeRandom(255)+ "," +makeRandom(255)+ "," +makeRandom(255)+ ")",
    opacity:        1,
    width:          makeRandom( $('body').width() / 6 ), // Max value is 1/6 of <body> width
    height:         makeRandom( $('body').width() / 6 ),
    borderRadius:   makeRandom(100)+ "%",
    transform:      "rotate(" +makeRandom(180)+ "deg)",
    position:       "absolute",
    left:           makeRandom(95)+ "%",
    top:            makeRandom(95)+ "%"
  }
};

var animateExisting = function(element){
  element.animate( makeSquareCssRandom(),makeRandom(5000) );
};

var animateNew = function(){
  // Render the shapes
  for (i = 1; i < ( makeRandom(10,20) ); i++ ) {
    $('div.clone-me').clone().css( makeSquareCssRandom() ).addClass('duplicate').removeClass('clone-me').animate(
        makeSquareCssRandom(), makeRandom(5000) // Create random CSS and random duration
      ).appendTo('body');
  }
  // Remove the excess
  duplicateDivs = $('.duplicate');
  if ( duplicateDivs.length > maximumShapes ) {
    excess = duplicateDivs.length - maximumShapes;
    for (i = 1; i < excess; i++) {
      duplicateDivs.eq(makeRandom(excess)).remove();
    }
  }

  for (i = 1; i < (duplicateDivs.length/4); i++ ){
    animateExisting(
      duplicateDivs.eq(makeRandom( duplicateDivs.length/4 ))
    )
  }

  console.log("Iteration number " +counter+ ". Number of shapes: " +duplicateDivs.length);
  counter ++;
};

// Run for first time
animateNew();

setInterval(animateNew, 2000);