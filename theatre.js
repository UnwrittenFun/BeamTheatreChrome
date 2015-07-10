var startWidth = 900;
chrome.storage.sync.get({'startWidth': 900}, function(items) {
  console.log(items["startWidth"]);
  startWidth = items["startWidth"]
})


var resizePlayer = function() {
  startWidth = $(".channel-video").width();
  chrome.storage.sync.set({'startWidth': startWidth})

  $(".stream-target").css("width", $(".channel-video").width() + "px")

  var padding = ($(document).height() - $(".stream-target > div").height()) / 2.0;
  $(".stream-target").css("padding-top", padding + "px")

  // $(".chat-container").css("top", "0");
  $(".chat-container").css("left", ($(".stream-target > div").width() - 12) + "px");
  $(".chat-container").css("width", $(document).width() - $(".stream-target > div").width() + 12 + "px");

  $(".channel-v2>.left").css("width", $(".stream-target > div").width() - 12 + "px")

  $(".chat-panel .panel-body").css("height", ($(document).height() - $(".chat-panel .panel-footer").height()) + "px");
}

var startTheatre = function() {
  $("body").addClass("theatre-mode");
  var offset = $(".channel-video").offset();

  $(".channel-video").css({
    "top": -offset.top + "px",
    "left": -offset.left - 15 + "px",
    "height": $(document).height() + "px",
  })

  $(".stream-target").css("height", $(document).height() + "px");

  $(".channel-video").css("width", startWidth + "px")

  $(".chat-container").css({
    "background-color": "#0a0911"
  })

  $(".channel-video").resizable({
    handles: "e",
    maxWidth: $(document).width() - 250,
    resize: resizePlayer
  })

  resizePlayer();
}

var stopTheatre = function() {
  $("body").removeClass("theatre-mode");

  $(".channel-video").css({
    "top": "",
    "left": "",
    "height": "",
  });

  $(".stream-target").css({
    "height": "",
    "width": "",
    "padding-top": "",
  });

  $(".chat-container").css({
    "left": "",
    "width": "",
    "background-color": ""
  });

  $(".channel-v2>.left").css("width", "");

  $(".chat-panel .panel-body").css("height", "")

  $('.channel-video').resizable('destroy').css("width", "");
}

var toggleTheatre = function() {
  if ($("body").hasClass("theatre-mode")) {
    stopTheatre();
  } else {
    startTheatre();
  }
}

var onBeamLoaded = function() {
  console.log("Beam loaded, injecting theatre button");

  var button = $('<li><a class="pull-left btn btn-link icon icon-film"></a></li>');
  $(".message-actions ul").append(button);
  button.click(toggleTheatre);
}

var waitForLoad = function() {
  if ($(".message-actions ul").length > 0) {
    onBeamLoaded()
  } else {
    setTimeout(waitForLoad, 1000);
  }
}

$(document).ready(function() {
  console.log("Beam Theatre Mode Loaded");
  waitForLoad()
});
