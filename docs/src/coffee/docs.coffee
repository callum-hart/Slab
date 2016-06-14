keys = [
  {
    "key": "id",
    "value": "ID"
  }
  {
    "key": "email",
    "value": "Email"
  }
  {
    "key": "name",
    "value": "Name"
  }
  {
    "key": "name_contains",
    "value": "Name Contains"
  }
]

recentSearches = [
  "john@gmail.com",
  "henry@gmail.com",
  "callum@callumhart.com",
  "joe@gmail.com",
  "jason@gmail.com"
]

slab1 = new Slab "#example-one",
          firstComplete:
            selectedKey: "id"
            data: keys
            onSelect: (value, key) -> # optional hook
              console.log "onSelect #{key}: #{value}"
            suggestResult: yes
            onSuggestionSelected: (value, key) ->
              console.log "onSuggestionSelected #{value}"
          secondComplete:
            # value: "callum@callumhart.com"
            noResultsText: "No recent searches match"
            data: recentSearches
            onSelect: (value) -> # optional hook
              console.log "onSelect #{value}"
            canAddNewRecords: yes
            onAdd: (newRecord) -> # optional hook triggered only if canAddNewRecords is set to true
              console.log "onAdd #{newRecord}"
            suggestResult: yes
            onSuggestionSelected: (value, key) ->
              console.log "onSuggestionSelected #{value}"
          onSubmit: (searchKey, searchValue) ->
            console.log "SEARCH BY: #{searchKey} : #{searchValue}"
