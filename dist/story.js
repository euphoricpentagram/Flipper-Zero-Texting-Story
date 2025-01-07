checkSdkCompatibility(0, 1);
let exports = {};
"use strict";

// dist/index.js
Object.defineProperty(exports, "__esModule", { value: true });
var eventLoop = require("@flipperdevices/fz-sdk/event_loop");
var gui = require("@flipperdevices/fz-sdk/gui");
var dialog = require("@flipperdevices/fz-sdk/gui/dialog");
var story = [
  "-in the begining-",
  "A: did you know there\nare vampires",
  "B: do they travel\nunderground",
  "A: lol they can't \ntravel underground\nB: why??",
  "A: cuz theres a bunch of\ngaters down there",
  "B: ok sure but then whos\nfeeding the gaters",
  "A: well obvi the sewer nuns!\nB: the sewer nuns?",
  "A: ya they care for the gaters\nto keep the vampires out",
  "B: ohhhhhhhh",
  "A: i know right,\ntheir so kind too\nB: i love that",
  "-now changed anew-"
];
var current_page = 0;
var views = {
  change_i: dialog.makeWith({
    header: "Simple txting story",
    text: story[current_page],
    left: "<",
    center: "X",
    right: ">"
  })
};
function change_page(foward) {
  if (foward) {
    current_page++;
  } else {
    current_page--;
  }
  if (current_page < 0) {
    current_page = 0;
  }
  if (current_page > story.length - 1) {
    current_page = story.length - 1;
  }
  views.change_i.set("text", story[current_page]);
}
eventLoop.subscribe(views.change_i.input, function(_sub, button, eventLoop2) {
  if (button === "left") {
    change_page(false);
  }
  if (button === "right") {
    change_page(true);
  }
  if (button === "center") {
    print("Byeee *waves*");
    eventLoop2.stop();
  }
}, eventLoop);
gui.viewDispatcher.switchTo(views.change_i);
eventLoop.subscribe(gui.viewDispatcher.navigation, function(_sub, _item, eventLoop2) {
  print("Byeee *waves*");
  eventLoop2.stop();
}, eventLoop);
eventLoop.run();
