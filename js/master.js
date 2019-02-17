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
  return localStorage.setItem(localStorageItem, JSON.stringify(settings));
}

/*
  Settings popup.
*/
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

/*
  Key listeners.
*/
window.addEventListener("keydown", keyDownEvent, false);

function keyDownEvent (e) {
  /* Toggle settings popup with "ctrl + ,". */
    if (e.keyCode == "188" && e.ctrlKey) {
      toggleSettingsPopup();
    }
}
