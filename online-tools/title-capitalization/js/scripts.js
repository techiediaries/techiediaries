String.prototype.capitalizeFirstLetter = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

var titleCase = function(phrase) {
  var exceptions = ["and", "the", "of", "or", "a", "an", "but", "for", "nor"]
  var words = phrase.split(" ");
  var titledWords = [];

  titledWords.push(words[0].toLowerCase().capitalizeFirstLetter());

  for(var index = 1; index < words.length; index += 1) {
    var pushed = false;
    for(var i = 0; i < exceptions.length; i += 1) {
      if (exceptions[i] === words[index]) {
        titledWords.push(words[index].toLowerCase())
        pushed = true;
        break;
      };
    };

    if (pushed===false) {
      titledWords.push(words[index].toLowerCase().capitalizeFirstLetter());
    };
  };
  return titledWords.join(" ");
};

// --------------------------------------------------

$(document).ready(function() {
  $("form#title-case").submit(function(event) {
    var phrase = $("input#phrase").val();
    var result = titleCase(phrase);

    $("#title").text(result);
    $("#result").show();

    event.preventDefault();
  });
});
