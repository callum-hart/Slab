noop = ->

class Slab
  defaultOptions:
    tabToSearchContent: """Hit <span class="cm-key">tab</span> to search"""
    onSubmit: noop # External hook
    withButton: no
    buttonClass: "ss-search"
    firstComplete:
      placeholder: ""
      noResultsText: "Can't search by"
      defaultKey: no
      onFocussed: noop # External hook
      onBlurred: noop # External hook
      onAdd: noop # External hook
      onSelect: noop # External hook
      onNoResults: noop # External hook
      onKeyedUp: noop # External hook
      onKeyedDown: noop # External hook
      onShowSuggestion: noop # External hook
      onClearSuggestion: noop # External hook
      onSuggestionSelected: noop # External hook
    secondComplete:
      placeholder: ""
      noResultsText: "No results match"
      canAddNewRecordsText: "(Hit enter to search)"
      onFocussed: noop # External hook
      onBlurred: noop # External hook
      onAdd: noop # External hook
      onSelect: noop # External hook
      onNoResults: noop # External hook
      onKeyedUp: noop # External hook
      onKeyedDown: noop # External hook
      onShowSuggestion: noop # External hook
      onClearSuggestion: noop # External hook
      onSuggestionSelected: noop # External hook

  version: "0.1.0"

  constructor: (selector, options) ->
    if CompleteMe?
      @handleElm selector

      if @elm
        @options = Utils.extend {}, @defaultOptions, options
        @options = Utils.extend {}, @options, @ # Check this is best practise for callbacks, look into only making some methods public.
        @options.firstComplete = Utils.extend {}, @defaultOptions.firstComplete, @options.firstComplete
        @options.secondComplete = Utils.extend {}, @defaultOptions.secondComplete, @options.secondComplete
        @handleTemplate()
        @handleCompleteMe()
        @handleDefaultKey() if @options.firstComplete.defaultKey
        @setFirstComplete(@options.firstComplete.selectedKey) if @options.firstComplete.selectedKey
        @setSecondComplete(@options.secondComplete.value) if @options.secondComplete.value
        @bindPersistentEvents()
        @handleHooks()
      else
        console.warn "Slab couldn't initialize #{selector} as it's not in the DOM"
    else
      console.error "Slab couldn't initialize because the dependency CompleteMe is missing. See https://github.com/callum-hart/Slab for more info."

  # You can initialize slab with a class/id selector or with an actual DOM element.
  handleElm: (selector) ->
    if typeof selector is "string"
      @elm = document.querySelector selector
    else if typeof selector is "object"
      # Check that object is an actual dom element.
      if selector.nodeName
        @elm = selector

  # ************************************************************
  # Events
  # ************************************************************

  bindPersistentEvents: -> # Events that listen even when slab isn't being used.
    if @options.withButton
      @buttonElm.addEventListener "click", @onButtonClick

  onButtonClick: (e) =>
    key = Utils.where("value", @firstComplete.input.value, @options.firstComplete.data)?[0].key
    secondComplete = @secondComplete.input.value

    if Utils.present(key) and Utils.present(secondComplete)
      @handleSubmit key, secondComplete
    else if @options.firstComplete.defaultKey
      # Treat firstComplete value as search query if its value isn't a key to search by.
      unless key
        @handleSubmit @options.firstComplete.defaultKey, @firstComplete.input.value

  # ************************************************************
  # Hooks
  #   Subscribe to CompleteMe hooks and then propagate them to Slab instance.
  # ************************************************************

  handleHooks: ->
    # firstComplete hooks
    # ------------------------
    @firstComplete.options.onFocussed = =>
      Utils.addClass "focussed", @elm
      @options.firstComplete.onFocussed()

    @firstComplete.options.onBlurred = =>
      Utils.removeClass "focussed", @elm
      @options.firstComplete.onBlurred()

    @firstComplete.options.onAdd = (value) =>
      @handleSubmit @firstComplete.options.defaultKey, value
      @options.firstComplete.onAdd value

    @firstComplete.options.onSelect = (value, key) =>
      @focusSecondComplete()
      @options.firstComplete.onSelect value, key

    @firstComplete.options.onNoResults = (value) =>
      @options.firstComplete.onNoResults value

    @firstComplete.options.onKeyedUp = (value) =>
      @options.firstComplete.onKeyedUp value

    @firstComplete.options.onKeyedDown = (e) =>
      if Keyboarding.isTab(e.keyCode)
        ###
          If tab is pressed and the input value matches the suggestion set the value of the input
          to the 'data-result' of the suggestion element. Needed because suggestion is case
          insensitve so typing in 'name' matches 'Name' -> so convert inputs value 'name' to 'Name'.
        ###
        if Utils.present @firstComplete.input.value
          if @firstComplete.input.value is @firstComplete.suggestionElm.value
            @firstComplete.input.value = @firstComplete.suggestionElm.dataset.result
            @firstComplete.selectedResult = @firstComplete.resultsElm.querySelector "a.index-0"

      if Keyboarding.isTab(e.keyCode) and @firstComplete.selectedResult
        e.preventDefault()
        # This is needed if user hits tab when a result is active. (Result is active when they've pressed up / down)
        @firstComplete.input.value = @firstComplete.selectedResult.dataset.result
        @focusSecondComplete()

      @options.firstComplete.onKeyedDown e

    @firstComplete.options.onShowSuggestion = (suggestion) =>
      @showTabToSearch()
      @options.firstComplete.onShowSuggestion suggestion

    @firstComplete.options.onClearSuggestion = =>
      @hideTabToSearch()
      @options.firstComplete.onClearSuggestion()

    @firstComplete.options.onSuggestionSelected = (value, key) =>
      @focusSecondComplete() if key is "TAB"
      @options.firstComplete.onSuggestionSelected value, key

    # secondComplete hooks
    # ------------------------
    @secondComplete.options.onFocussed = =>
      @onSecondCompleteFocussed()
      Utils.addClass "focussed", @elm
      @options.secondComplete.onFocussed()

    @secondComplete.options.onBlurred = =>
      Utils.removeClass "focussed", @elm
      @options.secondComplete.onBlurred()

    @secondComplete.options.onAdd = (value) =>
      key = Utils.where("value", @firstComplete.input.value, @options.firstComplete.data)[0].key
      @handleSubmit key, value
      @secondComplete.hideResults()
      @options.secondComplete.onAdd value

    @secondComplete.options.onSelect = (value) =>
      key = Utils.where("value", @firstComplete.input.value, @options.firstComplete.data)[0].key
      @handleSubmit key, value
      @secondComplete.hideResults()
      @options.secondComplete.onSelect value

    @secondComplete.options.onNoResults = (value) =>
      @options.secondComplete.onNoResults value

    @secondComplete.options.onKeyedUp = (value) =>
      @options.secondComplete.onKeyedUp value

    @secondComplete.options.onKeyedDown = (e) =>
      if Keyboarding.isBackspace(e.keyCode) and @secondComplete.input.value.length is 0
        @hideSelectedLabel()
        @focusFirstComplete()

      @options.secondComplete.onKeyedDown e

    @secondComplete.options.onShowSuggestion = (suggestion) =>
      @options.secondComplete.onShowSuggestion suggestion

    @secondComplete.options.onClearSuggestion = =>
      @options.secondComplete.onClearSuggestion()

    @secondComplete.options.onSuggestionSelected = (value, key) =>
      @options.secondComplete.onSuggestionSelected value, key

  # ************************************************************
  # Actions
  # ************************************************************

  handleCompleteMe: ->
    @firstComplete = new CompleteMe @firstCompleteMeElm, @options.firstComplete
    @secondComplete = new CompleteMe @secondCompleteMeElm, @options.secondComplete

  focusFirstComplete: ->
    @firstComplete.input.focus()

  focusSecondComplete: ->
    # requestAnimationFrame needed when onSelect is called from click event.
    window.requestAnimationFrame =>
      @showSelectedLabel @firstComplete.input.value
      @secondComplete.input.focus()

  onSecondCompleteFocussed: ->
    # When second complete is focussed make sure first one has a valid value, if not focus first complete.
    if @firstComplete.input.value.length is 0 or @selectedLabelElm.innerText.length > -1
      @focusFirstComplete()

  setFirstComplete: (key) ->
    if Utils.present key
      value = Utils.where("key", key, @options.firstComplete.data)[0].value
      @firstComplete.setValue value
      @showSelectedLabel value

  setSecondComplete: (value) ->
    @secondComplete.setValue value if Utils.present value

  handleDefaultKey: ->
    @firstComplete.options.canAddNewRecords = yes

  handleSubmit: (key, value) ->
    @secondComplete.hideResults()
    @options.onSubmit key, value

  reset: ->
    @hideSelectedLabel()
    @firstComplete.setValue ""
    @secondComplete.setValue ""
    @secondComplete.input.blur()

  # ************************************************************
  # Templating
  # ************************************************************

  render: (elm, template) ->
    elm.innerHTML = template

  handleTemplate: ->
    # Template related variables
    @containerClass = "sb-container" # might not be needed
    @autoCompleteClass = "sb-complete"
    @selectedLabelClass = "sb-label"
    @tabToSearchClass = "sb-tab"
    @template = """
                <span class="#{@selectedLabelClass}"></span>
                <div class="#{@autoCompleteClass} first-complete-me"></div>
                <div class="#{@autoCompleteClass} second-complete-me"></div>
                <span class="#{@tabToSearchClass}"></span>
                """

    if @options.withButton
      @buttonClass = "sb-button"
      @buttonSnippet = """<button type="button" class="#{@buttonClass} #{@options.buttonClass}"></button>"""
      @template += @buttonSnippet

    @render @elm, @template

    # Now that slab is rendered we can do DOM related things.
    Utils.addClass @containerClass, @elm
    @selectedLabelElm = @elm.querySelector ".#{@selectedLabelClass}"
    @tabToSearchElm = @elm.querySelector ".#{@tabToSearchClass}"
    @buttonElm = @elm.querySelector ".#{@buttonClass}"
    @firstCompleteMeElm = @elm.querySelector ".first-complete-me"
    @secondCompleteMeElm = @elm.querySelector ".second-complete-me"

  showTabToSearch: ->
    Utils.addClass "tab-showing", @tabToSearchElm
    @render @tabToSearchElm, @options.tabToSearchContent

  hideTabToSearch: ->
    Utils.removeClass "tab-showing", @tabToSearchElm
    @render @tabToSearchElm, ""

  showSelectedLabel: (value) ->
    @render @selectedLabelElm, "#{value}:"
    Utils.addClass "label-showing", @elm

  hideSelectedLabel: ->
    @render @selectedLabelElm, ""
    Utils.removeClass "label-showing", @elm

window.Slab = Slab

Utils =
  extend: (target, objects...) ->
    for object in objects
      target[key] = val for key, val of object

    target

  where: (key, value, array) ->
    results = []

    array.filter (object) ->
      if typeof object is "object"
        results.push object if object[key] == value
      else
        results.push object if object == value

    if results.length > 0
      results

  addClass: (className, elm) ->
    elm.classList.add className

  removeClass: (className, elm) ->
    elm.classList.remove className

  present: (thing) ->
    if typeof thing is "string"
      result = thing.length > 0
    if typeof thing is "number"
      result = yes

    result

Keyboarding =
  isTab: (keyCode) ->
    if keyCode is 9 then yes else no

  isBackspace: (keyCode) ->
    if keyCode is 8 then yes else no
