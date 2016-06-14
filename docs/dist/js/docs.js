(function() {
  var keys, recentSearches, slab1;

  keys = [
    {
      "key": "id",
      "value": "ID"
    }, {
      "key": "email",
      "value": "Email"
    }, {
      "key": "name",
      "value": "Name"
    }, {
      "key": "name_contains",
      "value": "Name Contains"
    }
  ];

  recentSearches = ["john@gmail.com", "henry@gmail.com", "callum@callumhart.com", "joe@gmail.com", "jason@gmail.com"];

  slab1 = new Slab("#example-one", {
    firstComplete: {
      selectedKey: "id",
      data: keys,
      onSelect: function(value, key) {
        return console.log("onSelect " + key + ": " + value);
      },
      suggestResult: true,
      onSuggestionSelected: function(value, key) {
        return console.log("onSuggestionSelected " + value);
      }
    },
    secondComplete: {
      noResultsText: "No recent searches match",
      data: recentSearches,
      onSelect: function(value) {
        return console.log("onSelect " + value);
      },
      canAddNewRecords: true,
      onAdd: function(newRecord) {
        return console.log("onAdd " + newRecord);
      },
      suggestResult: true,
      onSuggestionSelected: function(value, key) {
        return console.log("onSuggestionSelected " + value);
      }
    },
    onSubmit: function(searchKey, searchValue) {
      return console.log("SEARCH BY: " + searchKey + " : " + searchValue);
    }
  });

}).call(this);
