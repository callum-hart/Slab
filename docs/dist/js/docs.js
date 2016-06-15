(function() {
  var amazonExample, gmailExample, gmailFilters, recentSearches, shopCategories;

  shopCategories = [
    {
      "key": "aps",
      "value": "All Departments"
    }, {
      "key": "pantry",
      "value": "Amazon Pantry"
    }, {
      "key": "instant-video",
      "value": "Amazon Video"
    }, {
      "key": "mobile-apps",
      "value": "Apps & Games"
    }, {
      "key": "baby",
      "value": "Baby"
    }, {
      "key": "beauty",
      "value": "Beauty"
    }, {
      "key": "stripbooks",
      "value": "Books"
    }, {
      "key": "automotive",
      "value": "Car & Motorbike"
    }, {
      "key": "popular",
      "value": "CDs & Vinyl"
    }, {
      "key": "classical",
      "value": "Classical"
    }, {
      "key": "clothing",
      "value": "Clothing"
    }, {
      "key": "computers",
      "value": "Computers"
    }, {
      "key": "digital-music",
      "value": "Digital Music "
    }, {
      "key": "diy",
      "value": "DIY & Tools"
    }, {
      "key": "dvd",
      "value": "DVD & Blu-ray"
    }, {
      "key": "electronics",
      "value": "Electronics & Photo"
    }, {
      "key": "outdoor",
      "value": "Garden & Outdoors"
    }, {
      "key": "gift-cards",
      "value": "Gift Cards"
    }, {
      "key": "grocery",
      "value": "Grocery"
    }, {
      "key": "drugstore",
      "value": "Health & Personal Care"
    }, {
      "key": "kitchen",
      "value": "Home & Kitchen"
    }, {
      "key": "industrial",
      "value": "Industrial & Scientific"
    }, {
      "key": "jewelry",
      "value": "Jewellery"
    }, {
      "key": "digital-text",
      "value": "Kindle Store"
    }, {
      "key": "appliances",
      "value": "Large Appliances"
    }, {
      "key": "lighting",
      "value": "Lighting"
    }, {
      "key": "dvd-bypost",
      "value": "LOVEFiLM by Post"
    }, {
      "key": "luggage",
      "value": "Luggage"
    }, {
      "key": "luxury-beauty",
      "value": "Luxury Beauty"
    }, {
      "key": "mi",
      "value": "Musical Instruments & DJ"
    }, {
      "key": "videogames",
      "value": "PC & Video Games"
    }, {
      "key": "pets",
      "value": "Pet Supplies"
    }, {
      "key": "shoes",
      "value": "Shoes & Bags"
    }, {
      "key": "software",
      "value": "Software"
    }, {
      "key": "sports",
      "value": "Sports & Outdoors"
    }, {
      "key": "office-products",
      "value": "Stationery & Office Supplies"
    }, {
      "key": "toys",
      "value": "Toys & Games"
    }, {
      "key": "vhs",
      "value": "VHS"
    }, {
      "key": "watches",
      "value": "Watches"
    }
  ];

  window.shopCategories = shopCategories;

  amazonExample = new Slab("#amazon-example", {
    withButton: true,
    tabToSearchContent: "Hit <span class=\"cm-key\">tab</span> to shop",
    firstComplete: {
      data: shopCategories,
      suggestResult: true,
      selectedKey: "aps"
    },
    secondComplete: {
      data: [],
      noResultsText: "No recent searches for"
    }
  });

  gmailFilters = ["from", "from:me", "to", "in:inbox", "in:trash", "in:anywhere", "in:sent", "is:starred", "is:read", "is:unread", "is:muted", "is:chat", "is:important", "label:inbox", "label:sent", "label:unread"];

  recentSearches = ["callum@callumhart.com", "jodiebowers@zentry.com", "wootengreene@mantro.com", "sonjaprince@harmoney.com", "roxiedeleon@electonic.com", "melodybuchanan@manufact.com", "cherrysims@paragonia.com", "marciasimmons@martgo.com", "jamiehayes@magneato.com", "mercerfernandez@techtrix.com", "walterperry@strezzo.com", "lindseyknox@mixers.com", "popefitzgerald@kindaloo.com", "morrisonrusso@austex.com", "lindakaufman@pharmacon.com", "adrianboone@bluplanet.com", "mooncarney@acrodance.com", "molinacannon@junipoor.com", "abbottalexander@marqet.com", "penelopeterrell@zoid.com", "concepcionkeith@zolavo.com", "castanedalevine@multron.com", "claudetterichmond@zaphire.com", "skinnercampos@isoplex.com", "beacharmstrong@exiand.com", "elenamcclure@inquala.com", "moodyhorton@extro.com", "dalebarlow@golistic.com", "karinahensley@voipa.com", "brucecraft@tubesys.com", "christiangilmore@exovent.com", "bennettstein@pharmex.com", "munozcardenas@vendblend.com", "pollyhubbard@bovis.com", "eileenbates@datagen.com", "luannsantiago@trasola.com", "glendacastaneda@fuelton.com", "allieblack@typhonica.com", "marshalllangley@updat.com", "inezcummings@cofine.com", "benderbullock@deminimum.com", "laralittle@acium.com", "serranofreeman@zenco.com", "mcfarlandgiles@incubus.com", "pollardspears@calcu.com", "sosakoch@codact.com", "danielsherman@micronaut.com", "warrendudley@ziggles.com", "minnietran@avenetro.com", "lenorelowery@photobin.com"];

  window.gmailFilters = gmailFilters;

  window.recentSearches = recentSearches;

  gmailExample = new Slab("#gmail-example", {
    firstComplete: {
      data: gmailFilters,
      suggestResult: true
    },
    secondComplete: {
      data: recentSearches,
      suggestResult: true,
      canAddNewRecords: true,
      noResultsText: "No recent searches match"
    }
  });

}).call(this);
