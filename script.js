function prefix() {
	return "ExperimentPrefix";
}

function save() {
	var fileNameWithExtension = window.location.href.split("/").pop();
	var fileName = fileNameWithExtension.split(".")[0];
	var tElements = document.getElementsByTagName('input');
	var prefix = window.prefix();
	for (var i = tElements.length - 1; i >= 0; i--)
	{
		var tElement = tElements[i];
		if (tElement.type !== "text")
			continue;
		var key = prefix + "-" + fileName + "-"+ tElement.id;
		localStorage.setItem(key, tElement.value)
	}
}

function upfile(){
  var b = document.createElement('p');
  b.innerHTML = 'Now, please click \'Upload\' to save the file to Dropbox. <br> Please enter your participant ID which was given to you at the start as your first name, and \'test@test.com\' as your email  address <br>';
  document.body.appendChild(b);
  var c = document.createElement('a');
  c.innerHTML = 'Upload';
  c.href = 'https://www.dropbox.com/request/Dk5LZXlusQWf6L6ZCXWj?oref=e';
  document.body.appendChild(c);
  var d = document.createElement('h3')
  d.innerHTML = 'Thank you for participating in the study!'
  document.body.appendChild(d)
}

function read() {
	csvRows = [];
	myKeys = [];
	var pattern = window.prefix();
	for (var key in localStorage)
	{
		if (key.indexOf(pattern) == -1)
			continue;
		myKeys.push(key);
		var rowKey = key.substring(pattern.length + 1);
		csvRows.push(rowKey+ ","+localStorage.getItem(key))
	}

	for (var i = myKeys.length - 1; i >=0; i--)
		localStorage.removeItem(myKeys[i]);
	var csvString = csvRows.join("\r\n");
	var a = document.createElement('a');
	a.innerHTML = "Download";
	a.href     = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csvString);
	a.target   = '_blank';
	a.download = 'results.csv';
  a.onclick = function() {upfile()};
	document.body.appendChild(a);
}

function submit() {
	window.save();
	window.read();
}
window.onload = function(e) {
	var aelements = document.getElementsByTagName('a');
	for (var i = aelements.length - 1; i >= 0; i--)
	{
		var aelement = aelements[i];
		if (aelement.href.length > 0 && aelement.innerText.length > 0)
			aelement.addEventListener("click",
				function(event) {
					window.save();
			});
	}
}
