var total_num = 0;
var i;

function exp() {
	var textbox = document.getElementById("textbox");
	var fileSelector = document.getElementById("fileSelector");

	var fileReader = new FileReader();
	fileReader.readAsText(fileSelector.files[0]);

	for (i = 0; i < total_num; i++) {
		removeElement(document.getElementById("field"+i));
	}

	total_num = 0;

	fileReader.onload = function() {	
		textbox.innerHTML = fileReader.result.split("[Data]")[1].split("\n")[1].replace(/,/g, "\n");
		const parent = document.createElement('div');
		parent.classList.add("parent");
		var fields = textbox.innerHTML.split("\n");
		for (i = 0; i < fields.length; i++) {
			if (fields[i] != "") {
				var labelfield = document.createElement("LABEL");
				
				var inputfield = document.createElement("INPUT");
				inputfield.setAttribute("type", "checkbox");
				inputfield.setAttribute("id", "field"+i);
				inputfield.setAttribute("name", fields[i]);
				labelfield.appendChild(inputfield);
				labelfield.appendChild(document.createTextNode(fields[i]));
				parent.appendChild(labelfield);
				total_num += 1;
			}
		}
		document.body.appendChild(parent);
	};
	var downloadButton = document.createElement("BUTTON");
	downloadButton.setAttribute("id", "downloadButton");
	downloadButton.setAttribute("onclick", "create_download()");
	downloadButton.innerHTML = "Download";
	document.body.appendChild(downloadButton);
}

function download(filename, text) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
}

var text;
var name;

function create_download() {
	var fields = [];
	var tmp;
	var textbox = document.getElementById("textbox");

	var fileSelector = document.getElementById("fileSelector");

	textbox.innerHTML = "";

	console.log("Total num: " + total_num);

	for (i = 0; i < total_num; i++) {
		tmp = document.getElementById("field"+i);
		textbox.innerHTML += tmp.name + ": " + tmp.checked + "\n";
		fields[i] = tmp.checked;
	}

	for (i = 0; i < fileSelector.files.length; i++) {
		var blob = new Blob();
		var fileReader = new FileReader();
		text = "";
		name = fileSelector.files[i].name;

		fileReader.readAsText(fileSelector.files[i]);
		fileReader.onloadend = function(){
			var fileSelector = document.getElementById("fileSelector");
console.log("file selector: " + fileSelector)
console.log("i: " + i)
			var prom = new Promise(function(resolve, reject) {
				var f = fileReader.result.split("[Data]");

				text += f[0];
				resolve("true");
			});

			prom.then(function(value) {
				download("new."+name, text);
			});
		}
		
	}
}