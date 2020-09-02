var myVersion = "0.4.4", myProductName = "macroprocess";

const fs = require ("fs"); 
const utils = require ("daveutils");

module.exports = function (s, options) { 
	//Changes
		//8/31/20; 11:36:49 AM by DW
			//each of options.startChars and endChars are assumed to have two chars. 
	if (options.startChars === undefined) {
		options.startChars = "[%";
		}
	if (options.endChars === undefined) {
		options.endChars = "%]";
		}
	var i = 0;
	function evalMacro (macrotext) {
		//Changes
			//9/2/20; 10:51:01 AM by DW
				//Macros are in this form:
					//[%search: hello world%]
		if (options.delimiter !== undefined) {
			if (options.handlers !== undefined) {
				var part1 = utils.stringNthField (macrotext, options.delimiter, 1);
				var part2 = utils.stringNthField (macrotext, options.delimiter, 2);
				if (options.handlers [part1] !== undefined) {
					return (options.handlers [part1] (part2));
					}
				}
			}
		return (options.startChars + macrotext + options.endChars); //pass it back unchanged
		};
	while (i < (s.length - 1)) {
		if (s [i] == options.startChars [0]) {
			if (s [i+1] == options.startChars [1]) {
				var j, flfound = false;
				for (var j = i + 2; j <= s.length - 2; j++) {
					if ((s [j] == options.endChars [0]) && (s [j+1] == options.endChars [1])) {
						var macrotext = utils.stringMid (s, i + 3, j - i - 2);
						macrotext = evalMacro (macrotext);
						s = utils.stringDelete (s, i + 1, j - i + 2);
						s = utils.stringInsert (macrotext, s, i);
						i += macrotext.length;
						flfound = true;
						break;
						}
					}
				if (!flfound) {
					break;
					}
				}
			else {
				i += 2;
				}
			}
		else {
			i++;
			}
		}
	return (s);
	}
