/*
  Using JSDoc style for code documentation.
  https://github.com/jsdoc3/jsdoc
*/

/*
  Storage.
  Using Web Storage API (localStorage) and stringified JSON.
*/
// Name of localStorage item.
var localStorageItem = "settings";

/**
 * Initializes browser local storage.
*/
function makeLocalStorageItem() {
  // If localStorageItem does not exist it will create the JSON layout.
  if (!localStorage.getItem(localStorageItem)) {
    var settings = {
      // Universal settings.
      "universal": {},
      // Grids.
      "grids": [
        // Here are grids with widgets within.
      ]
    }

    localStorage.setItem(localStorageItem, JSON.stringify(settings));
  }
}

/**
 * Returns all settings from local storage.
 * @returns {object}
 */
function getSettings() {
  // Check if item exists, else create it.
  if (!localStorage.getItem(localStorageItem)) {
    makeLocalStorageItem();
  }

  return JSON.parse(localStorage.getItem(localStorageItem));
}

/**
 * Set local storage settings.
 * @param {object} settings - New settings to be set in local storage.
 */
function setSettings(settings) {
  localStorage.setItem(localStorageItem, JSON.stringify(settings));
}

/**
 * Update grid and widgets.
 */
function update() {
  var settings = getSettings();

  var main = document.getElementById("main");

  // Grids.
  for (var i = 0; i < settings["grids"].length; i++) {
    var gridElement = document.createElement("div");
    gridElement.classList.add("grid");
    // Widgets
    for (var j = 0; j < settings["grids"][i]["widgets"].length; j++) {
      var widgetElement = document.createElement("div");
      gridElement.classList.add("widget");
      for (var k = 0; k < widgets.length; k++) {
        if (widgets[k].getId() == settings["grids"][i]["widgets"][j]["widgetId"]) {
          widgets[k].displayWidget(widgetElement, settings["grids"][i]["widgets"][j]["settings"]);
          break
        }
      }
    }
  }
}
// Init run.
update();

/*
  Settings popup.
*/
settingsPanelHidden = true;
/**
 * Show and hide settings popup.
 */
function toggleSettingsPopup() {
  if (settingsPanelHidden) {
    document.getElementById("settingsPopupOverlay").style.display = "block";
    document.getElementById("settingsPopup").style.display = "block";
  } else {
    document.getElementById("settingsPopupOverlay").style.display = "none";
    document.getElementById("settingsPopup").style.display = "none";
  }

  settingsPanelHidden = !settingsPanelHidden;
}

/**
 * Update grid menu with new enterties.
 */
function updateGridMenu() {
  var settings = getSettings();
  var settingsChooseGrid = document.getElementById("settingsChooseGrid");
  // Clear grid menu (except first child).
  while (settingsChooseGrid.childElementCount > 1) {
    settingsChooseGrid.removeChild(settingsChooseGrid.lastChild);
  }
  // Add options.
  for (var i = 0; i < settings["grids"].length; i++) {
    var option = document.createElement("option");
    option.text = i + 1;
    option.value = i + 1;
    settingsChooseGrid.add(option);
  }
}
// Init run.
updateGridMenu();

/**
 * Update settings panel based on chosen grid in the dropdown menu.
 */
function chooseGridChange() {
  var gridWidgetList = document.getElementById("settingsGridWidgetList");
  var settingsGrid = document.getElementById("settingsGrid");
  var settingsRemoveGrid = document.getElementById("settingsRemoveGrid");
  var settingsAddWidget = document.getElementById("settingsAddWidget");
  if (document.getElementById("settingsChooseGrid").value != "") {
    var settings = getSettings();
    chosenGrid = document.getElementById("settingsChooseGrid").value - 1;
    settingsGrid.style.display = "block";
    settingsRemoveGrid.style.display = "block";
    settingsAddWidget.style.display = "block";

    if (settings["grids"][chosenGrid].length > 1) {
      for (var i = 0; i < settings["grids"][chosenGrid].length; i++) {
        // TODO
      }
    } else {
      gridWidgetList.innerHTML = "Empty grid chosen...";
    }
  } else {
    gridWidgetList.innerHTML = "";
    settingsGrid.style.display = "none";
    settingsRemoveGrid.style.display = "none";
    settingsAddWidget.style.display = "none";
  }
}
// Init run.
chooseGridChange();

/**
 * New grid.
 */
function newGrid() {
  var settings = getSettings();
  var grid = {
    "position": "absolute",
    "width": "300",
    "left": "0",
    "top": "0",
    "widgets": []
  }
  settings["grids"].push(grid);
  setSettings(settings);
  updateGridMenu();
  chooseGridChange();
}

/**
 * Remove grid.
 */
function removeGrid() {
  var settings = getSettings();
  var settingsChooseGrid = document.getElementById("settingsChooseGrid").value;
  if (settingsChooseGrid != "") {
    settings["grids"].splice(settingsChooseGrid - 1, 1);
    setSettings(settings);
    updateGridMenu();
    if (settingsChooseGrid == "") {
      chooseGridChange();
    }
  }
}

/**
 *New widget popup.
 */
function newWidgetPopup() {
  document.getElementById("settingsPopupMain").style.display = "none";
  document.getElementById("settingsPopupNewWidget").style.display = "block";

  var widgetList = document.getElementById("settingsPopupNewWidgetList");
  widgetList.innerHTML = "";

  for (var i = 0; i < widgets.length; i++) {
    var node = document.createElement("div");
    node.id = "widget" + i;

    var widget = widgets[i];
    node.innerHTML =
      '<span class="header">' + widget.getName() + '</span>' +
      '<span class="author">' + widget.getAuthor() + '</span>' +
      '<span class="description">' + widget.getDescription() + '</span>'
    ;
    // Add settings for widget.
    var widgetSettings = widget.getSettings();
    for (var j = 0; j < widgetSettings.length; j++) {
      node.innerHTML += '<span class="settingHeader">' + widgetSettings[j]["name"] + '</span>';
      if (widgetSettings[j]["required"] == true) {
        node.lastChild.innerHTML = "* " + node.lastChild.innerHTML;
      }
      if (widgetSettings[j]["type"] == "string") {
        node.innerHTML += '<input class="setting' + j + '" type="text">';
        if ("default" in widgetSettings[j]) {
          node.lastChild.placeholder = widgetSettings[j]["default"]
        }
      } else if (widgetSettings[j]["type"] == "number") {
        node.innerHTML += '<input class="setting' + j + '" type="number">';
        if ("default" in widgetSettings[j]) {
          node.lastChild.placeholder = widgetSettings[j]["default"]
        }
      } else if (widgetSettings[j]["type"] == "boolean") {
        node.innerHTML += '<input class="setting' + j + '" type="checkbox">';
        if ("default" in widgetSettings[j]) {
          if (widgetSettings[j]["default"] == true) {
            node.lastChild.checked = true;
          } else {
            node.lastChild.checked = false;
          }
        }
      }
      node.innerHTML += '<span class="settingDescription">' + widgetSettings[j]["description"] + '</span>';
    }

    node.innerHTML += '<a href="javascript:void(0)" class="saveNewWidget">Save new widget</a>';

    widgetList.appendChild(node);
  }
}

/**
 * Quit without saving.
 */
function settingsQuitWithoutSaving() {
  document.getElementById("settingsPopupMain").style.display = "block";
  document.getElementById("settingsPopupNewWidget").style.display = "none";
}

/**
 * New widget save.
 * @param {string} widgetId - Widget id on the format "widget0".
 * @param {object} widgetSettingsElement - Settings DOM element.
 */
function newWidgetSave(widgetId, widgetSettingsElement) {
  var settings = getSettings();

  widgetId = widgetId.replace("widget", "");
  var widgetEntry = widgets[widgetId];
  var widgetInputs = widgetSettingsElement.querySelectorAll("input");
  var settingsChooseGrid = document.getElementById("settingsChooseGrid").value - 1;

  var newWidget = {settings: {}}

  newWidget["widgetId"] = widgets[widgetId].getId();

  for (var i = 0; i < widgets[widgetId].getSettings().length; i++) {
    if (widgetInputs[i].type == "text" || widgetInputs[i].type == "number") {
      if (widgetInputs[i].value == "" && widgets[widgetId].getSettings()[i].hasOwnProperty("default")) {
        newWidget["settings"][widgets[widgetId].getSettings()[i]["id"]] = widgets[widgetId].getSettings()[i]["default"]
      } else {
        newWidget["settings"][widgets[widgetId].getSettings()[i]["id"]] = widgetInputs[i].value;
      }
    } else if (widgetInputs[i].type == "checkbox") {
      newWidget["settings"][widgets[widgetId].getSettings()[i]["id"]] = widgetInputs[i].checked;
    }
  }

  settings["grids"][settingsChooseGrid]["widgets"].push(newWidget);
  setSettings(settings);

  // TODO: Update grids.

  // Hide new widget tab.
  document.getElementById("settingsPopupMain").style.display = "block";
  document.getElementById("settingsPopupNewWidget").style.display = "none";
}

/*
  Key listeners.
*/
// Keydown.
window.addEventListener("keydown", keyDownEvent, false);

/**
 * Key down event listener.
 */
function keyDownEvent(e) {
  /* Toggle settings popup with "Ctrl + ,". */
    if (e.keyCode == "188" && e.ctrlKey) {
      toggleSettingsPopup();
    } else if (e.keyCode == "27" && document.getElementById("settingsPopup").style.display == "block") {
      /* Close settings popup with "Esc" if it is open. */
      toggleSettingsPopup();
    }

}

/*
  DOMContentLoaded event listener.
  Source https://developer.mozilla.org/en-US/docs/Web/Events/change (2019-03-09).
*/
document.addEventListener('DOMContentLoaded',function() {
    document.querySelector('select[id="settingsChooseGrid"]').onchange=chooseGridChangeEventHandler;
},false);

function chooseGridChangeEventHandler(event) {
  chooseGridChange();
}

// Click.
document.getElementById("settingsAddGrid").addEventListener("click", newGrid);
document.getElementById("settingsRemoveGrid").addEventListener("click", removeGrid);
document.getElementById("settingsAddWidget").addEventListener("click", newWidgetPopup);
document.getElementById("settingsQuitWithoutSaving").addEventListener("click", settingsQuitWithoutSaving);

document.querySelector("#settingsPopupNewWidgetList").addEventListener("click", settingsPopupNewWidgetListEvent, false);
function settingsPopupNewWidgetListEvent(e) {
  if (e.target.classList.contains('saveNewWidget')) {
    newWidgetSave(e.target.parentElement.id, e.target.parentElement);
  }
  e.stopPropagation();
}
