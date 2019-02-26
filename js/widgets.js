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
    this.getId = function () {
      return "staticText";
    }

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
          id:"text",
          name:"Text",
          description:"Text to display.",
          type:"string",
          required:true
        },
        {
          id:"fontSize",
          name:"Font size (px)",
          description:"Font size in pixels.",
          type:"number",
          default:30,
          required:false
        }
      ];
    }

    this.displayWidget = function (widgetElement, widgetSettings) {
      widgetElement.classList.add(this.getId());
      widgetElement.innerHTML = `
        <span style="font-size: ` + widgetSettings["fontSize"] + `px;">` + widgetSettings["text"] + `</span>
      `;
    }
  }

// End of widgets array.
]
