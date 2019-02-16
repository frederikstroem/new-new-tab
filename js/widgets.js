/*
 *
 * All widgets is stored in this file.
 *
*/
// Refferences to all widget objects is stored in this array.
var widgets = [

  /*
    Static text widget.
  */
  function () {
    this.getName = function () {
      return "Static text";
    }

    this.getDescription = function () {
      return "A widget to make static texts.";
    }

    this.getAuthor = function () {
      return "Frederik Holm Strøm";
    }

    this.getSettings = function () {
      return [
        {
          name:"Text",
          description:"Text to display.",
          type:"string",
          required:true
        },
        {
          name:"Font size (px)",
          description:"Font size in pixels.",
          type:"number",
          default:30,
          required:false
        }
      ];
    }

    this.displayWidget = function (widgetId) {

    }
  }

// End of widgets array.
]
