var total_num = 0;

function exp() {
	var textbox = document.getElementById("textbox");
	var fileSelector = document.getElementById("fileSelector");

	var fileReader = new FileReader();
	fileReader.readAsText(fileSelector.files[0]);

	for (var i = 0; i < total_num; i++) {
		removeElement(document.getElementById("field"+i));
	}

	total_num = 0;

	fileReader.onload = function() {	
		textbox.innerHTML = fileReader.result.split("[Data]")[1].split("\n")[1].replace(/,/g, "\n");
		const parent = document.createElement('div');
		parent.classList.add("parent");
		var fields = textbox.innerHTML.split("\n");
		for (var i = 0; i < fields.length; i++) {
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

function create_download() {
	var fields = [];
	var tmp;
	var textbox = document.getElementById("textbox");

	var fileSelector = document.getElementById("fileSelector");

	textbox.innerHTML = "";

	console.log("Total num: " + total_num);

	for (var i = 0; i < total_num; i++) {
		tmp = document.getElementById("field"+i);
		textbox.innerHTML += tmp.name + ": " + tmp.checked + "\n";
		fields[i] = tmp.checked;
	}

	console.log(fileSelector.files.length);

	for (var i = 0; i < fileSelector.files.length; i++) {
		var text = "abcdefg";
		var blob = new Blob();
		var fileReader = new FileReader();
		
		fileReader.readAsText(fileSelector.files[i]);
		fileReader.onload = function(){
			var f = fileReader.result.split("[Data]");;
			for (var j = 0; j < fileSelector.files.length; j++) {
			}
		}
		download("new."+fileSelector.files[i].name, text);
	}
}
