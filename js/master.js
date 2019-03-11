/*
  Storage.
  Using Web Storage API (localStorage) and stringified JSON.
*/
// Name of localStorage item.
var localStorageItem = "settings";

function makeLocalStorageItem () {
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

function getSettings () {
  // Returns all settings from web storage.

  // Check if item exists, else create it.
  if (!localStorage.getItem(localStorageItem)) {
    makeLocalStorageItem();
  }

  return JSON.parse(localStorage.getItem(localStorageItem));
}

function setSettings (settings) {
  localStorage.setItem(localStorageItem, JSON.stringify(settings));
}

/*
  Settings popup.
*/
// Show and hide settings popup.
settingsPanelHidden = true;
function toggleSettingsPopup () {
  if (settingsPanelHidden) {
    document.getElementById("settingsPopupOverlay").style.display = "block";
    document.getElementById("settingsPopup").style.display = "block";
  } else {
    document.getElementById("settingsPopupOverlay").style.display = "none";
    document.getElementById("settingsPopup").style.display = "none";
  }

  settingsPanelHidden = !settingsPanelHidden;
}

// Choose grid menu.
function updateGridMenu() {
  var settings = getSettings();
  var settingsChooseGrid = document.getElementById("settingsChooseGrid");
  // Clear grid menu (expect first child).
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
  // Hide grid options if no grid is selected.
  var settingsGrid = document.getElementById("settingsGrid");
  if (settingsChooseGrid.value == "") {
    settingsGrid.style.display = "none"
  } else {
    settingsGrid.style.display = "block"
  }
}
// Init run.
updateGridMenu();

// New grid.
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
  Key listeners.
*/
// Keydown.
window.addEventListener("keydown", keyDownEvent, false);

function keyDownEvent (e) {
  /* Toggle settings popup with "ctrl + ,". */
    if (e.keyCode == "188" && e.ctrlKey) {
      toggleSettingsPopup();
    }
}
// DOMContentLoaded. Source https://developer.mozilla.org/en-US/docs/Web/Events/change (2019-03-09).
document.addEventListener('DOMContentLoaded',function() {
    document.querySelector('select[id="settingsChooseGrid"]').onchange=chooseGridChangeEventHandler;
},false);

function chooseGridChangeEventHandler(event) {
  var gridWidgetList = document.getElementById("settingsGridWidgetList");
  if (event.target.value != "") {
    var settings = getSettings();

    if (settings["grids"][event.target.value].length > 1) {
      for (var i = 0; i < settings["grids"][event.target.value].length; i++) {
        // TODO
      }
    } else {
      gridWidgetList.innerHTML = "Empty grid chosen...";
    }
  } else {
    gridWidgetList.innerHTML = "";
  }
}

// Click.
document.getElementById("settingsAddGrid").addEventListener("click", newGrid);
