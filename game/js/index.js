function showOutput() {
  alert(document.getElementById("string-result-17-6-25-output").value);
}

function showPsw() {
  alert(document.getElementById("psw").value);
}

function showSexVehicle() {
  var result = "";
  var s = document.getElementsByName("sex");
  var v = document.getElementsByName("vehicle");
  var i = 0;
  for(; i < s.length; i++) {
    if(s[i].checked) {
      result += s[i].value;
    }
  }
  i = 0;
  for(; i < v.length; i++) {
    if(v[i].checked) {
      result += v[i].value;
    }
  }
  alert(result);
}