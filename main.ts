import * as https from "https";
import * as fs from "fs";
import { JSDOM } from 'jsdom';

const webUrl = "https://api.gamesparks.net";
const fileUrl = "./gs.html"
const fromFile = false;
const outPath = "./typings/";

const typingsPaths: string[] = [];

interface ApiInfo {
	href: string,
	title: string,
	descriptions: string[],
	requestParameters: {
		Parameter: string,
		Required: string,
		Type: string,
		Description: string,
	}[],
	responseParameters: {
		Parameter: string,
		Type: string,
		Description: string,
	}[],
}
interface DataInfo {
	href: string,
	title: string,
	descriptions: string[],
	parameters: {
		Parameter: string,
		Type: string,
		Description: string,
	}[],
}

async function main() {
	let dom = await readHtml();

	let contents = dom.window.document.getElementsByClassName("content");
	for (let i = 0; i < contents.length; i++) {
		let content = contents[i];
		let h1 = "";
		for (let j = 0; j < content.childNodes.length; j++) {
			let node = content.childNodes[j];
			if (node.localName == undefined) {
				continue;
			}
			if (node.localName == "h1") {
				h1 = node.textContent as string;
				continue;
			}
			if (h1 == "Introduction" || h1 == "Messages") {
				continue;
			}
			if (node.localName == "h2") {
				let title = node.textContent as string;
				console.log(h1 + ": " + title);
				let descriptions: any[] = [];
				let isGetDes = false;
				for (let k = j + 1; k < content.childNodes.length; k++) {
					let node_2 = content.childNodes[k];
					if (node_2.localName == undefined) {
						j++;
						continue;
					}
					if (node_2.localName == "p") {
						descriptions.push(node_2.textContent as string);
						isGetDes = true;
					}
					else if (node_2.localName == "table" || node_2.localName == "h2" || isGetDes) {
						break;
					}
					j++;
				}
				if (h1 == "Data Types") {
					// Data
					let data: DataInfo = {
						href: h1,
						title: title,
						descriptions: descriptions,
						parameters: [],
					};
					j = toTag(content, "table", j + 1);
					data.parameters = readTableNode(content.childNodes[j]);
					handleData(data);
				}
				else {
					// Request API
					let api: ApiInfo = {
						href: h1,
						title: title,
						descriptions: descriptions,
						requestParameters: [],
						responseParameters: [],
					};
					j = toTag(content, "table", j + 1);
					api.requestParameters = readTableNode(content.childNodes[j]);
					j = toTag(content, "table", j + 1);
					api.responseParameters = readTableNode(content.childNodes[j]);
					handleReurestAPI(api);
				}
			}
		}
	}
	writeIndexTypings();
}
function toTag(content: Node, findLocalName: string, start: number) {
	for (let i = start; i < content.childNodes.length; i++) {
		let node = content.childNodes[i];
		if (node.localName == undefined) {
			continue;
		}
		else if (node.localName == findLocalName) {
			return i;
		}
	}
	return -1;
}
function handleData(data: DataInfo) {
	if (!fs.existsSync(outPath)) {
		fs.mkdirSync(outPath);
	}
	if (!fs.existsSync(outPath + data.href + "/")) {
		fs.mkdirSync(outPath + data.href + "/");
	}

	let dts = "";
	let level = 0;
	dts += getLevelSpace(level) + "declare namespace SparkRequests {\n";
	level++; {
		dts += createDes(data.descriptions, level);
		dts += getLevelSpace(level) + "class " + data.title + " {\n";
		level++; {
			for (let i = 0; i < data.parameters.length; i++) {
				let requestParameter = data.parameters[i];
				dts += createDes([requestParameter.Description], level);
				dts += getLevelSpace(level) + requestParameter.Parameter + ": " + requestParameter.Type + ";\n"
			}
		} level--;
		dts += getLevelSpace(level) + "}\n";
	} level--;

	dts += getLevelSpace(level) + "}\n";

	const path: string = outPath + data.href + "/" + data.title + ".d.ts";
	fs.writeFileSync(path, dts);

    typingsPaths.push(path);
}
function handleReurestAPI(data: ApiInfo) {
	if (!fs.existsSync(outPath)) {
		fs.mkdirSync(outPath);
	}
	if (!fs.existsSync(outPath + data.href + "/")) {
		fs.mkdirSync(outPath + data.href + "/");
	}

	let requestExtends = "_Request";
	let response = "_" + data.title.replace("Request", "Response");
	let responseExtends = "_Response";

	let dts = "";
	let level = 0;
	dts += getLevelSpace(level) + "declare namespace SparkRequests {\n";
	level++; {
		// Resuest
		dts += createDes(data.descriptions, level);
		dts += getLevelSpace(level) + "class " + data.title + " extends " + requestExtends + "<" + response + "> {\n";
		level++; {
			for (let i = 0; i < data.requestParameters.length; i++) {
				let requestParameter = data.requestParameters[i];
				let required = "@Required " + requestParameter.Required;
				dts += createDes([requestParameter.Description, required], level);
				dts += getLevelSpace(level) + requestParameter.Parameter + ": " + requestParameter.Type + ";\n"
			}
		} level--;
		dts += getLevelSpace(level) + "}\n";
		// Response
		dts += getLevelSpace(level) + "class " + response + " extends " + responseExtends + " {\n";
		level++; {
			for (let i = 0; i < data.responseParameters.length; i++) {
				let responseParameter = data.responseParameters[i];
				dts += createDes([responseParameter.Description], level);
				dts += getLevelSpace(level) + responseParameter.Parameter + ": " + responseParameter.Type + ";\n"
			}
		} level--;
		dts += getLevelSpace(level) + "}\n";
	} level--;

	dts += getLevelSpace(level) + "}\n";

	const path: string = outPath + data.href + "/" + data.title + ".d.ts";
	fs.writeFileSync(path, dts);

    typingsPaths.push(path);
}
function writeIndexTypings(): void {
	let dts = "";
	typingsPaths.forEach((path: string) => {
        dts += "///<reference path=\"" + path + "\"/>\n";
	});

	fs.writeFileSync('./index.d.ts', dts);
}
function createDes(dess: string[], level: number) {
	if (dess.length == 0) {
		return "";
	}
	let des = getLevelSpace(level) + "/**\n";
	for (let i = 0; i < dess.length; i++) {
		if (i > 0) {
			// des += getLevelSpace(level) + " *\n";
		}
		des += getLevelSpace(level) + " * " + dess[i] + "\n";
	}
	des += getLevelSpace(level) + " */\n"
	return des;
}
function getLevelSpace(level: number) {
	let space = "";
	while (level > 0) {
		level--;
		space += "    ";
	}
	return space;
}
function readTableNode(node: Node) {
	let tab: any[] = [];
	let requestTitles = node.childNodes[0].childNodes[1];
	let requestPars = node.childNodes[1];
	for (let k = 1; k < requestPars.childNodes.length; k += 2) {
		let requestPar = requestPars.childNodes[k];
		let requestObj: any = {};
		for (let l = 1; l < requestPar.childNodes.length; l += 2) {
			let key = requestTitles.childNodes[l];
			let val = requestPar.childNodes[l];
			requestObj[key.textContent as string] = val.textContent;
		}
		tab.push(requestObj);
	}
	return tab
}
function readHtml() {
	console.log("read...");
	if (fromFile) {
		return JSDOM.fromFile(fileUrl);
	}
	else {
		return JSDOM.fromURL(webUrl);
	}
}

main();
