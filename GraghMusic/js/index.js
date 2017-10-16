var mid = new Array()
mid[1] = "sound/1.mp3"
mid[2] = "sound/2.mp3"
mid[3] = "sound/3.mp3"
mid[4] = "sound/4.mp3"
mid[5] = "sound/5.mp3"
mid[6] = "sound/6.mp3"

var audio = null;
var index = -1;
var flag = true;

function clicksound(i) {
  console.log(i)
  if (i == 5) {
    return;
  }
  if (audio === null) {
    audio = document.createElement('audio');
    audio.src = mid[i];
    index = i;
    audio.autoplay = "autoplay";
    document.body.appendChild(audio);
  } else {
    if (i == index) {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    } else {
      audio.pause();
      audio.src = mid[i];
      index = i;
      audio.play();
    }
  }
}

$(document).ready(elementChange);
$(window).resize(elementChange);

var gW = 1349;
var gH = 620;

function elementChange() {
  console.log("change");
  var h = $(document.body).height();
  var w = $(document.body).width();
  var scaleH = h / gH;
  var scaleW = w / gW;
  var scaleMin = Math.min(scaleH, scaleW);
  // p5
  $("#p5").css("width", "30%");
  var p5_width = pasrePx($("#p5").css("width"));
  var left = w / 2 - p5_width / 2;
  var last_left = left + "px";
  $("#p5").css("left", last_left);
  $("#p5").css("top", (h * 0.06) + "px");
  // p1
  var p1_width = left * 0.8;
  $("#p1").css("width", p1_width + "px");
  var p5_right = pasrePx($("#p5").css("right"));
  var p1_right = p5_width + p5_right + 45*scaleMin;
  $("#p1").css("right", p1_right + "px");
  // p2
  var p2_width = left * 0.8;
  $("#p2").css("width", p2_width + "px");
  var p1_top = pasrePx($("#p1").css("top"));
  var p1_height = pasrePx($("#p1").css("height"));
  var p2_top = p1_height + p1_top + 50*scaleMin;
  $("#p2").css("top", p2_top + "px");
  $("#p2").css("right", p1_right + "px");
  // p3
  var p3_width = left * 0.8;
  $("#p3").css("width", p3_width + "px");
  var p2_height = pasrePx($("#p2").css("height"));
  var p3_top = p2_height + p2_top + 50*scaleMin;
  $("#p3").css("top", p3_top + "px");
  $("#p3").css("right", p1_right + "px");
  // p4
  var p4_width = left * 0.8;
  $("#p4").css("width", p4_width + "px");
  var p5_top = pasrePx($("#p5").css("top"));
  var p5_left = pasrePx($("#p5").css("left"));
  var p5_height = pasrePx($("#p5").css("height"));
  var p4_top = p5_top + p5_height * 0.1;
  $("#p4").css("top", p4_top + "px");
  var p4_left = p5_left + p5_width + 45*scaleMin;
  $("#p4").css("left", p4_left + "px");
  // p6
  var p6_width = left * 0.8;
  $("#p6").css("width", p6_width + "px");
  var p4_top = pasrePx($("#p4").css("top"));
  var p4_height = pasrePx($("#p4").css("height"));
  var p6_top = p4_top + p4_height + 30*scaleMin;
  // $("#p6").css("top", p6_top+"px");
  var p3_bottom = pasrePx($("#p3").css("bottom"));
  $("#p6").css("bottom", p3_bottom + "px");
  $("#p6").css("left", p4_left + "px");

  // drawLeadingLine();
  // Draw leading line
  // Get new h and w
  var p1_left = pasrePx($("#p1").css("left"));
  w = p1_left + p1_width + p1_right;
  var p1_bottom = pasrePx($("#p1").css("bottom"));
  h = p1_top + p1_height + p1_bottom;
  var canvas_jq = $("#leading_line_canvas");
  var canvas = canvas_jq[0];
  // This won't be out of shape
  canvas.width = w;
  canvas.height = h;
  // Now we can draw normally
  var cxt = canvas.getContext("2d");
  // p1 to p5
  // var p1_left = pasrePx($("#p1").css("left"));
  var body_margin_left = pasrePx($(document.body).css("margin-left"));
  var x_p1 = p1_left + p1_width - body_margin_left;
  var y_p1 = p1_top + p1_height * 0.75;
  var x_p51 = p5_left + p5_width * 0.2 - body_margin_left;
  var y_p51 = p5_top + p5_height * 0.2;
  cxt.moveTo(x_p1, y_p1);
  cxt.lineTo(x_p51, y_p51);
  cxt.stroke();
  // p2 to p5
  var p2_left = pasrePx($("#p2").css("left"));
  var x_p2 = p2_left + p2_width - body_margin_left;
  var y_p2 = p2_top + p2_height * 0.5;
  var x_p52 = p5_left + p5_width * 0.1 - body_margin_left;
  var y_p52 = p5_top + p5_height * 0.4;
  cxt.moveTo(x_p2, y_p2);
  cxt.lineTo(x_p52, y_p52);
  cxt.stroke();
  // p3 to p5
  var p3_left = pasrePx($("#p3").css("left"));
  var p3_height = pasrePx($("#p3").css("height"));
  var x_p3 = p3_left + p3_width - body_margin_left;
  var y_p3 = p3_top + p3_height * 0.35;
  var x_p53 = p5_left + p5_width * 0.15 - body_margin_left;
  var y_p53 = p5_top + p5_height * 0.65;
  cxt.moveTo(x_p3, y_p3);
  cxt.lineTo(x_p53, y_p53);
  cxt.stroke();
  // p4 to p5
  var p4_left = pasrePx($("#p4").css("left"));
  var p4_height = pasrePx($("#p4").css("height"));
  var x_p4 = p4_left - body_margin_left;
  var y_p4 = p4_top + p4_height * 0.35;
  var x_p54 = p5_left + p5_width * (1 - 0.15) - body_margin_left;
  var y_p54 = p5_top + p5_height * 0.65;
  cxt.moveTo(x_p4, y_p4);
  cxt.lineTo(x_p54, y_p54);
  cxt.stroke();
  // p6 to p5
  var p6_left = pasrePx($("#p6").css("left"));
  var p6_height = pasrePx($("#p6").css("height"));
  var x_p6 = p6_left - body_margin_left;
  var y_p6 = p6_top + p6_height * 0.35;
  var x_p56 = p5_left + p5_width * (1 - 0.2) - body_margin_left;
  var y_p56 = p5_top + p5_height * 0.85;
  cxt.moveTo(x_p6, y_p6);
  cxt.lineTo(x_p56, y_p56);
  cxt.stroke();
  // Regenerate p1-p6
  if(flag) {
    flag = false;
    regenerateMask("#p1", 1);
    regenerateMask("#p2", 2);
    regenerateMask("#p3", 3);
    regenerateMask("#p4", 4);
    regenerateMask("#p5", 5);
    regenerateMask("#p6", 6);
  } else {
    changeMask("#p1", 1);
    changeMask("#p2", 2); 
    changeMask("#p3", 3);
    changeMask("#p4", 4);
    changeMask("#p5", 5);
    changeMask("#p6", 6);
  }
}



function pasrePx(px_str) {
  return parseInt(px_str.substr(0, px_str.length - 2));
}

function regenerateMask(elementId, index) {
  var e_jq = $(elementId);
  var e_width = e_jq.css("width");
  var e_height = e_jq.css("height");
  var e_left = e_jq.css("left");
  var e_top = e_jq.css("top");
  $("body").append("<div id=\"mask" + index + "\" ></div>");
  var new_e_jq = $("#mask" + index);
  new_e_jq.css("width", e_width);
  new_e_jq.css("height", e_height);
  new_e_jq.css("left", e_left);
  new_e_jq.css("top", e_top);
  new_e_jq.click(function() {
    clicksound(index);
  });
}

function changeMask(elementId, index) {
  var e_jq = $(elementId);
  var e_width = e_jq.css("width");
  var e_height = e_jq.css("height");
  var e_left = e_jq.css("left");
  var e_top = e_jq.css("top");
  var old_e_jq = $("#mask" + index);
  old_e_jq.css("width", e_width);
  old_e_jq.css("height", e_height);
  old_e_jq.css("left", e_left);
  old_e_jq.css("top", e_top);
}