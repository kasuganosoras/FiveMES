/* FiveMES configuration start */
var use_SSL = false;
var ws_host = "example.com";
var ws_port = 9230;
/* FiveMES configuration end */

/* Don't change anything following this line */
var s_playerID;
var s_rpm;
var s_speed;
var s_gear;
var s_IL;
var s_Handbrake;
var s_LS_r;
var s_LS_o;
var s_LS_h;
var inVehicle = false;
	
$(function() {
	
	var ws;
	var connected = false;
	
	function websocket () {
		pl = use_SSL ? "wss" : "ws";
		ws = new WebSocket(`${pl}://${ws_host}:${ws_port}/`);
		ws.onopen = function(event){
			console.log('Connect successful');
			connected = true;
		};
		ws.onmessage = function (event) {
			var message = event.data;
		}
		ws.onclose = function(event) {
			connected = false;
			console.log("Connect close, status: " + this.readyState);
			websocket();
		};
		ws.onerror = function(event) {
			console.log("WebSocket error.");
		};
	}
	
	function heartbeat() {
		if(connected) {
			var senddata = "{\"action\":\"heartbeat\",\"token\":\"" + $("#token").val() + "\"}";
			ws.send(senddata);
			return;
		}
	}
	
	function setSpeed(id, speed, rpm, gear, IL, Handbrake, LS_r, LS_o, LS_h) {
		if(connected) {
			Handbrake = booltoString(Handbrake);
			LS_r = booltoString(LS_r);
			LS_o = booltoString(LS_o);
			LS_h = booltoString(LS_h);
			var senddata = `{"action":"setspeed","sid":"${id}","speed":"${speed}","rpm":"${rpm}","gear":"${gear}","IL":"${IL}","Handbrake":"${Handbrake}","LS_r":"${LS_r}","LS_o":"${LS_o}","LS_h":"${LS_h}"}`;
			ws.send(senddata);
			return;
		}
	}
	
	function booltoString(str) {
		return str ? "true" : "false";
	}
	
	websocket();
	
    window.addEventListener("message", function(event) {
        var item = event.data;
        
        if (item.incar) {
			
			inVehicle = true;
			s_playerID = item.playerID;
			s_rpm = item.CurrentCarRPM;
			s_speed = item.CurrentCarSpeed;
			s_gear = item.CurrentCarGear;
			s_IL = item.CurrentCarIL;
			s_Handbrake = item.CurrentCarHandbrake;
			s_LS_r = item.CurrentCarLS_r;
			s_LS_o = item.CurrentCarLS_o;
			s_LS_h = item.CurrentCarLS_h;
			
        } else if (item.outcar) {
			inVehicle = false;
        }
    });
	
	setInterval(function() {
		if(inVehicle) {
			setSpeed(s_playerID, s_speed, s_rpm, s_gear, s_IL, s_Handbrake, s_LS_r, s_LS_o, s_LS_h);
		}
	}, 50);
});