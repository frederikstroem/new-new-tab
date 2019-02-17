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
