const utils = require ("daveutils");
const macroprocess = require ("macroprocess");
//const macroprocess = require ("./macroprocess.js");

const options = {
	startChars: "[%",
	endChars: "%]",
	delimiter: ":",
	handlers: {
		search: function (macrotext) {
			var url, link;
			macrotext = utils.trimWhitespace (macrotext);
			url = "https://duckduckgo.com/?q=site%3Ascripting.com+%22" + macrotext + "%22&t=h_&ia=web";
			link = "<a href=\"" + url + "\">" + macrotext + "</a>";
			return (link);
			}
		}
	};

console.log (macroprocess ("oh the [%search: hunky dory%] buzzing", options));
