# Slab

Slab is a **JavaScript component** that handles **search filters and queries**.

- [Getting Started](#getting-started)
  - [Demo](#demo)
  - [Supported Browsers](#supported-browsers)
  - [Dependencies](#dependencies)
  - [To Run](#to-run)
  - [To Use](#to-use)
- [Configuration](#configuration)
  - [firstComplete](#firstcomplete)
  - [secondComplete](#secondcomplete)
  - [withButton](#withbutton)
  - [buttonClass](#buttonclass)
  - [firstComplete.defaultKey](#firstcomplete.defaultkey)
- [Callbacks](#callbacks)
  - [onSubmit](#onsubmit)
- [Markup](#markup)
  - [Generated HTML](#generated-html)
  - [Conditional CSS Classes](#conditional-css-classes)
    - [label-showing](#label-showing)
    - [focussed](#focussed)

## Getting Started

### Demo

A demo of the library in action can be [found here](http://www.callumhart.com/open-source/slab).

### Supported Browsers

So far tested on Chrome, Firefox and Safari.

### Dependencies

Slab has **1 dependency**. And that is [Complete Me](https://github.com/callum-hart/Complete-Me).

### To Run

```
$ git clone git@github.com:callum-hart/Slab.git
$ cd Slab
$ npm install
$ grunt watch
```

### To Use

Include [CSS](https://github.com/callum-hart/Complete-Me/blob/master/lib/css/complete-me.min.css) and [JavaScript](https://github.com/callum-hart/Complete-Me/blob/master/lib/js/complete-me.min.js) from [Complete Me](https://github.com/callum-hart/Complete-Me). Both need to be **included before** the [CSS](https://github.com/callum-hart/Slab/blob/master/lib/css/slab.min.css) and [JavaScript](https://github.com/callum-hart/Slab/blob/master/lib/js/slab.min.js) for Slab:

```html
<!-- CSS -->
<link href="complete-me.min.css" rel="stylesheet">
<link href="slab.min.css" rel="stylesheet">

<!-- JavaScript -->
<script type="text/javascript" src="complete-me.min.js"></script>
<script type="text/javascript" src="slab.min.js"></script>
```

Create an instance:

```javascript
var instance = new Slab(element, { options });
```

> `element` can be a selector or a DOM element.

## Configuration

### firstComplete

- **Details**
  - Child attributes are [configuration options](https://github.com/callum-hart/Complete-Me#configuration) and [Callbacks](https://github.com/callum-hart/Complete-Me#callbacks) from the Complete Me library.
- **Type** `Object`
- **Required** Yes

### secondComplete

- **Details**
  - Child attributes are [configuration options](https://github.com/callum-hart/Complete-Me#configuration) and [Callbacks](https://github.com/callum-hart/Complete-Me#callbacks) from the Complete Me library.
- **Type** `Object`
- **Required** Yes

### withButton

- **Details**
  - Give the Slab input a submit button.
- **Type** `Boolean`
- **Default** `False`

### buttonClass

- **Details**
  - Change what class is applied to the button.
- **Type** `String`
- **Default** `ss-search`
- **Condition**
  - Option [`withButton`](withbutton) has to be set to `true`.

### firstComplete.defaultKey

- **Details**
  - Key that should be taken as the search filter if Slab is submitted when no filter has been selected by the user. The key is a reference to an object in the [data](https://github.com/callum-hart/Complete-Me#data) option from Complete Me. `data` type for `firstComplete` will need to be `Array <Object>`.
- **Type** `String`

## Callbacks

### onSubmit
`onSubmit: (searchKey, searchValue) {}`

- **Details**
  - When the Slab input is submitted.
- **Arguments** `(searchKey, searchValue)`
- **Condition**
  - Only called when the search filter and query are valid.

## Markup

### Generated HTML

The HTML generated by Slab is:

```html
<div class="sb-container">
  <span class="sb-label"></span>
  <div class="sb-complete first-complete-me cm-container">
    <div class="cm-input-wrap">
      <input type="text" class="cm-input">
      <input type="text" class="cm-suggestion">
    </div>
    <div class="cm-results-wrap">
      <ul class="cm-results">
        <li><a href="#"></a></li>
      </ul>
    </div>
  </div>
  <div class="sb-complete second-complete-me cm-container">
    <div class="cm-input-wrap">
      <input type="text" class="cm-input">
      <input type="text" class="cm-suggestion">
    </div>
    <div class="cm-results-wrap">
      <ul class="cm-results">
        <li><a href="#"></a></li>
      </ul>
    </div>
  </div>
  <span class="ss-tab"></span>
</div>
```

### Conditional CSS Classes

Classes that are applied when a certain condition is true.

#### label-showing
`.label-showing`

- **Condition**
  - Applied when the search filter is selected.
- **Element**
  - Applied to `.sb-container`

#### focussed
`.focussed`

- **Condition**
  - Applied when the Slab input is focussed.
- **Element**
  - Applied to `.sb-container`

> Conditional classes are applied to the Complete Me's rendered inside Slab. These can be [found here](https://github.com/callum-hart/Complete-Me#conditional-css-classes).