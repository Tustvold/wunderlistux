window.setCustomTheme = function(_, theme){
  $('#headerbar').remove();
  $("body").prepend("<div id='headerbar'></div>");
  var THEME_CONTAINER_ID = "webview_theme_container";
  fs = require('fs');
  var createOrUpdate = function(id, content, type, appender){
    $('#'+id).remove();
    $('<'+type+' id="'+id+'">'+content+'</'+type+'>').appendTo(appender);
  }
  fs.readFile("./themes/"+theme+"/webview.css", 'utf8', function (err, content) {
    createOrUpdate(THEME_CONTAINER_ID, content, "style", "body")
  });
  localStorage.setItem("custom_electron_theme", theme)
}

var ipcRenderer  = require('electron').ipcRenderer;
window.onload = function() {
    window.$ = window.jQuery = require('./jquery-3.1.0.min.js');
    setCustomTheme(null, "elementary")
}
ipcRenderer.on('change-theme', setCustomTheme);
