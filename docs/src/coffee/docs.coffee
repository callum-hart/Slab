# Amazon Example

shopCategories = [
  {
    "key": "aps",
    "value": "All Departments"
  }
  {
    "key": "pantry",
    "value": "Amazon Pantry"
  }
  {
    "key": "instant-video",
    "value": "Amazon Video"
  }
  {
    "key": "mobile-apps",
    "value": "Apps &amp; Games"
  }
  {
    "key": "baby",
    "value": "Baby"
  }
  {
    "key": "beauty",
    "value": "Beauty"
  }
  {
    "key": "stripbooks",
    "value": "Books"
  }
  {
    "key": "automotive",
    "value": "Car &amp; Motorbike"
  }
  {
    "key": "popular",
    "value": "CDs &amp; Vinyl"
  }
  {
    "key": "classical",
    "value": "Classical"
  }
  {
    "key": "clothing",
    "value": "Clothing"
  }
  {
    "key": "computers",
    "value": "Computers"
  }
  {
    "key": "digital-music",
    "value": "Digital Music "
  }
  {
    "key": "diy",
    "value": "DIY &amp; Tools"
  }
  {
    "key": "dvd",
    "value": "DVD &amp; Blu-ray"
  }
  {
    "key": "electronics",
    "value": "Electronics &amp; Photo"
  }
  {
    "key": "outdoor",
    "value": "Garden &amp; Outdoors"
  }
  {
    "key": "gift-cards",
    "value": "Gift Cards"
  }
  {
    "key": "grocery",
    "value": "Grocery"
  }
  {
    "key": "drugstore",
    "value": "Health &amp; Personal Care"
  }
  {
    "key": "kitchen",
    "value": "Home &amp; Kitchen"
  }
  {
    "key": "industrial",
    "value": "Industrial &amp; Scientific"
  }
  {
    "key": "jewelry",
    "value": "Jewellery"
  }
  {
    "key": "digital-text",
    "value": "Kindle Store"
  }
  {
    "key": "appliances",
    "value": "Large Appliances"
  }
  {
    "key": "lighting",
    "value": "Lighting"
  }
  {
    "key": "dvd-bypost",
    "value": "LOVEFiLM by Post"
  }
  {
    "key": "luggage",
    "value": "Luggage"
  }
  {
    "key": "luxury-beauty",
    "value": "Luxury Beauty"
  }
  {
    "key": "mi",
    "value": "Musical Instruments &amp; DJ"
  }
  {
    "key": "videogames",
    "value": "PC &amp; Video Games"
  }
  {
    "key": "pets",
    "value": "Pet Supplies"
  }
  {
    "key": "shoes",
    "value": "Shoes &amp; Bags"
  }
  {
    "key": "software",
    "value": "Software"
  }
  {
    "key": "sports",
    "value": "Sports &amp; Outdoors"
  }
  {
    "key": "office-products",
    "value": "Stationery &amp; Office Supplies"
  }
  {
    "key": "toys",
    "value": "Toys &amp; Games"
  }
  {
    "key": "vhs",
    "value": "VHS"
  }
  {
    "key": "watches",
    "value": "Watches"
  }
]

# shopCategories is an array of objects. Saved as window variable so it's available in your console.
window.shopCategories = shopCategories

amazonExample = new Slab "#amazon-example",
                  withButton: yes
                  tabToSearchContent: """Hit <span class="cm-key">tab</span> to shop"""
                  firstComplete:
                    data: shopCategories
                    suggestResult: yes
                    selectedKey: "aps"
                  secondComplete:
                    data: []
                    noResultsText: "No recent searches for"
