describe('titleCase', function() {
  it("capitalizes the first letter of a word", function() {
    expect(titleCase("dandelion")).to.equal("Dandelion");
  });

  it("capitalizes the first letter of a word and downcases the rest of the letters", function() {
    expect(titleCase("DAISY")).to.equal("Daisy");
  });

  it("capitalizes the first letter of every word in a phrase", function() {
    expect(titleCase("happy kittens")).to.equal("Happy Kittens");
  });

  it("does not capitalize certain words like 'the' and 'and'.", function() {
    expect(titleCase("bob and the happy little mountains")).to.equal("Bob and the Happy Little Mountains");
  });

  it("does not skip over exceptions if they are the first word", function() {
    expect(titleCase("the fluffy clouds")).to.equal("The Fluffy Clouds");
  });

  it("accounts for punctuation", function() {
    expect(titleCase("channel your inner, most peaceful, bob ross!")).to.equal("Channel Your Inner, Most Peaceful, Bob Ross!");
  });
});
