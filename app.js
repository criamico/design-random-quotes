(function() {
  // Function that returns a random number between min (inclusive) and max (exclusive)
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function getRandomColor() {
    var colorTable = [
      "#A272AA",
      "#5FAED2",
      "#AA72A7",
      "#8872AA",
      "#7287AA",
      "#72A6AA",
      "#72AA96",
      "#77AA72",
      "#AAA972",
      "#AA7272",
      "#AA9C59",
      "#62AA59",
      "#AA5968",
      "#979397",
      "#A45050",
      "#D5CD67"
    ];

    var newBg = getRandomNumber(0, colorTable.length);
    $("body").css("background-color", colorTable[newBg]);
  }

  function getQuote() {
    $.ajax({
      url:
        "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1",
      type: "GET",
      cache: false
    })
      .done(function(data) {
        var post = data.shift();
        var author = "";
        /*remove the p tag*/
        var quote = post.content.slice(0, post.content.length - 5);
        quote = quote.slice(3);
        author = "- " + post.title;

        var newHref =
          "https://twitter.com/intent/tweet?button_hashtag=QuotesOnDesign&text=" +
          escape(quote.replace(/'/g, "%27") + author);
        $("#text").html(
          '<i class="fa fa-quote-left" aria-hidden="true"></i> ' +
            quote +
            ' <i class="fa fa-quote-right" aria-hidden="true"></i>'
        );
        $(".author").html(author);
        $("#tweet-quote").attr("href", newHref);
        $("#tweet-quote").attr("data-size", "large");
      })
      .fail(function() {
        alert("There was an error retrieving the new quote.");
      });
  }

  function execute() {
    getRandomColor();
    getQuote();
  }

  execute();

  $("#new-quote").on("click", execute);
})();
