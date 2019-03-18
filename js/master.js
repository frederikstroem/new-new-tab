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
function setSettings (settings) {
  localStorage.setItem(localStorageItem, JSON.stringify(settings));
}

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
  var settingsAddWidget = document.getElementById("settingsAddWidget");
  if (document.getElementById("settingsChooseGrid").value != "") {
    var settings = getSettings();
    chosenGrid = document.getElementById("settingsChooseGrid").value - 1;
    settingsGrid.style.display = "block";
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
}

/*
 *New widget popup.
 */
function newWidgetPopup() {
  document.getElementById("settingsPopupMain").style.display = "none";
  document.getElementById("settingsPopupNewWidget").style.display = "block";

  var widgetList = document.getElementById("settingsPopupNewWidgetList");
  widgetList.innerHTML = "";

  for (var i = 0; i < widgets.length; i++) {
    var node = document.createElement("div");
    node.id = widgets[i].getId() + "Widget";

    var widget = widgets[i];
    node.innerHTML =
      '<span class="header">' + widget.getName() + '</span>' +
      '<span class="author">' + widget.getAuthor() + '</span>' +
      '<span class="description">' + widget.getDescription() + '</span>' +
      '<a href="javascript:void(0)" class="saveNewWidget">Save new widget</a>'
    ;

    widgetList.appendChild(node);
  }
}

/**
 * New widget save.
 */
function settingsQuitWithoutSaving() {
  document.getElementById("settingsPopupMain").style.display = "block";
  document.getElementById("settingsPopupNewWidget").style.display = "none";
}

function newWidgetSave() {
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
  /* Toggle settings popup with "ctrl + ,". */
    if (e.keyCode == "188" && e.ctrlKey) {
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
document.getElementById("settingsAddWidget").addEventListener("click", newWidgetPopup);
document.getElementById("settingsQuitWithoutSaving").addEventListener("click", settingsQuitWithoutSaving);
