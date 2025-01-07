// import modules
// caution: `eventLoop` HAS to be imported before `gui`, and `gui` HAS to be
// imported before any `gui` submodules.
import * as eventLoop from "@next-flip/fz-sdk-mntm/event_loop";
import * as gui from "@next-flip/fz-sdk-mntm/gui";
import * as dialog from "@next-flip/fz-sdk-mntm/gui/dialog"

// A knows
let story = [
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
]

let current_page = 0

let views = {
	change_i: dialog.makeWith({
		header: "Simple txting story",
		text: story[current_page],
		left: "<",
		center: "X",
		right: ">",
	}),
}

function change_page(foward) { 
	if (foward) {
		current_page++
	} else { 
		current_page--
	}
	if (current_page < 0) { 
		current_page = 0
	}
	if (current_page > story.length - 1) { 
		current_page = story.length - 1
	}
	views.change_i.set("text", story[current_page])

}

eventLoop.subscribe(views.change_i.input, (_sub, button, eventLoop) => {
	//NAV
	if (button === "left") { 
		change_page(false);
	}
	if (button === "right") { 
		change_page(true);
	}



	//EXIT
	if (button === "center") {
		print("Byeee *waves*");
		eventLoop.stop();
	}
}, eventLoop);

gui.viewDispatcher.switchTo(views.change_i);

//Back Button
eventLoop.subscribe(gui.viewDispatcher.navigation, (_sub, _item, eventLoop) => {
	print("Byeee *waves*");
	eventLoop.stop();
}, eventLoop);

eventLoop.run();