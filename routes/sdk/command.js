var express = require("express");
var router = express.Router();
var device = require("./device.js");
var checkbox = require("./checkbox.js");
var time = require("./time.js");
var appdata = require("./appdata.js");
var config = require("./config.js");
var usercode = require("./usercode.js");
var sun = require("./sun.js");
var userdata = require("./userdata.js");
var define = require("./define.js");
var ifaces = require("./interface.js");
var error = require("./error.js");
var events = new Array();
var sequence = 1;
var socketaddr = "";
var socketport = "";
var setsocketsec = "";
var gateway_siren = false;
var maxevent = 200;
var timestamp = 0;

/*timer*/
var timertime = 8000;
var deviceeventtimer = null;
var tampereventtimer = null;
var lowbatteryeventtimer = null;
var gatewaysirentimer = null;
var appupdatetimer = null;
var exludetimer = null;
/*event flag*/
var deviceeventflag = false;
var tampereventflag = false;
var lowbatteryeventflag = false;
var gatewaysireneventflag = false;
var appupdateeventflag = false;
var exludeeventflag = false;

var kwh = 0;

router.get('/sdk.cgi', function(req, res, next) 
{
  res.status(200);
  var ctrlObj = null;
  try
  {
    ctrlObj = JSON.parse(decodeURI(req.query.json));
  }
  catch(e)
  {
    
  }
  SDKCommandHandle(ctrlObj,res);
});
router.post('/sdk.cgi', function(req, res, next) 
{
  res.status(200);
  var ctrlObj = null;
  try
  {
    ctrlObj = JSON.parse(decodeURI(req.body.json));
  }
  catch(e)
  {
    
  }
  SDKCommandHandle(ctrlObj,res);
});
router.get('/network.cgi', function(req, res, next) 
{
  NetworkCommandHandle(req.query,res);
});
router.post('/network.cgi', function(req, res, next) 
{
  NetworkCommandHandle(req.body,res);
});
router.get('/get.dat', function(req, res, next) 
{
  res.status(200);
  var response = new Object();
  response = appdata.JsonGetAll();
  response = JSON.stringify(response);
  res.send(response);
});


module.exports = router;

function SDKCommandHandle(ctrlObj,res)
{
  var cmd = ctrlObj.control.cmd;
  var uid = ctrlObj.control.uid;
  var response = InitSDKResponse(cmd,uid);
  switch(cmd)
  {
    case "getdevice":
    {
      response.device = device.GetDevice(uid);
      break;
    }
    case "get_all_device":
    {
      response.device = device.GetDevice(256);
      break;
    }
    case "getinterface":
    {
      response.iface = ifaces.GetInterface();  
      break;
    }
    case "switch":
    {
      var chid = ctrlObj.control.chid;
      var val = ctrlObj.control.val;
      device.UpdateDevice(val,chid,uid);
      var eve = InitEvent(5002,chid,uid);
      while(events.length>=maxevent)
      {
        events.splice(0,1);
      }
      events.push(eve);
      if(uid == 510)
      {
        var alldevice = device.GetDevice(256);
        for(var i=0;i<alldevice.length;i++)
        {
          for(var j=0;j<alldevice[i].channel.length;j++)
          {
            if(alldevice[i].channel[j].functype == 22 || alldevice[i].channel[j].functype == 23)
            {
              device.UpdateDevice(val,alldevice[i].channel[j].chid,alldevice[i].uid);
              var eve = InitEvent(4804,alldevice[i].channel[j].chid,alldevice[i].uid);
              while(events.length>=maxevent)
              {
                events.splice(0,1);
              }
              events.push(eve);
            }
          }
        }
      }
      break;
    }
    case "zwnosecure":
    {
      var val = ctrlObj.control.val;
      if(val == -1)
      {
        response.control.val = global.security;
      }
      else
      {
        global.security = val;
      }
      break;
    }
    case "include":
    {
      break;
    }
    case "abort":
    {
      break;
    }
    case "exclude":
    {
      break;
    }
    case "switch_color_set":
    {
      var val = ctrlObj.control.val;
      device.UpdateColor(val,uid);
      var eve = InitEvent(4804,0,uid);
      while(events.length>=maxevent)
      {
        events.splice(0,1);
      }
      events.push(eve);
      break;
    }
    case "getswitch":
    {
      if(uid!=256)
      {
        var eve = InitEvent(4804,0,uid);
        while(events.length>=maxevent)
        {
          events.splice(0,1);
        }
        events.push(eve);
      }
      else
      {
        var alldevice = device.GetDevice(uid);
        for(var i=0;i<alldevice.length;i++)
        {
          if(alldevice[i].battery == 255)
          {
            for(var j=0;j<alldevice[i].channel.length;j++)
            {
              var eve = InitEvent(4804,alldevice[i].channel[j].chid,alldevice[i].uid);
              while(events.length>=maxevent)
              {
                events.splice(0,1);
              }
              events.push(eve);
            }
          }
        }
      }
      break;
    }
    case "getconfig":
    {
      var key = ctrlObj.control.datas[0].key;
      response.control.datas = new Array();
      response.control.datas.push(config.GetConfig(uid,key));
      break;
    }
    case "setconfig":
    {
      var key = ctrlObj.control.datas[0].key;
      var val = ctrlObj.control.datas[0].val;
      config.SetConfig(uid,key,val);
      break;
    }
    case "thermostatfan":
    {
      var val = ctrlObj.control.val;
      device.UpdateSensorValue(val,32,uid,0);
      var eve = InitEvent(4804,32,uid);
      while(events.length>=maxevent)
      {
        events.splice(0,1);
      }
      events.push(eve);
      break;
    }
    case "thermostatmode":
    {
      var val = ctrlObj.control.val;
      device.UpdateSensorValue(val,33,uid,0);
      var eve = InitEvent(4804,33,uid);
      while(events.length>=maxevent)
      {
        events.splice(0,1);
      }
      events.push(eve);
      break;
    }
    case "thermostattemp":
    {
      var temp = ctrlObj.control.temp;
      var unit = ctrlObj.control.unit;
      device.UpdateSensorValue(temp,34,uid,unit);
      var eve = InitEvent(4804,34,uid);
      while(events.length>=maxevent)
      {
        events.splice(0,1);
      }
      events.push(eve);
      break;
    }
    case "usercodeget":
    {
      var userID = ctrlObj.control.userID;
      response.control.datas = usercode.GetUserCode(uid,userID);
      break;
    }
    case "usercodeset":
    {
      var userID = ctrlObj.control.userID;
      var code1 = String.fromCharCode(ctrlObj.control.code1);
      var code2 = String.fromCharCode(ctrlObj.control.code2);
      var code3 = String.fromCharCode(ctrlObj.control.code3);
      var code4 = String.fromCharCode(ctrlObj.control.code4);
      var code = code1+""+code2+""+code3+""+code4;
      response.control.datas = usercode.SetUserCode(uid,userID,code);
      break;
    }
    case "settampernotify":
    {
      var chid = ctrlObj.control.chid;
      var val = ctrlObj.control.val;
      device.UpdateTamperNotify(val,chid,uid);
      break;
    }
    case "setlowbattnotify":
    {
      var chid = ctrlObj.control.chid;
      var val = ctrlObj.control.val;
      device.UpdateBatteryNotify(val,chid,uid);
      break;
    }
    case "setmainscene":
    {
      var chid = ctrlObj.control.chid;
      var val = ctrlObj.control.val;
      device.UpdateMainScene(val,chid,uid);
      break;
    }
    case "sunrise_trig_time_get":
    {
      var chid = ctrlObj.control.chid;
      response.control.datas = parseInt(sun.GetSunriseTime(chid));
      break;
    }
    case "sunrise_trig_time_set":
    {
      var chid = ctrlObj.control.chid;
      var val = ctrlObj.control.val;
      sun.SetSunriseTime(chid,val);
      break;
    }
    case "sunset_trig_time_get":
    {
      var chid = ctrlObj.control.chid;
      response.control.datas = parseInt(sun.GetSunsetTime(chid));
      break;
    }
    case "sunset_trig_time_set":
    {
      var chid = ctrlObj.control.chid;
      var val = ctrlObj.control.val;
      sun.SetSunsetTime(chid,val);
      break;
    }
    case "test":
    {
      response.device = new Array();
      response.device.push(0);
      response.device.push(1);
      response.device.push(2);
      break;
    }
    case "Setcontroltype":
    {
      var uid = ctrlObj.control.uid;
      var chid = ctrlObj.control.chid;
      var val = ctrlObj.control.val;
      device.SetControlType(uid,chid,val);
      var eve = InitEvent(1002,chid,uid);
      while(events.length>=maxevent)
      {
        events.splice(0,1);
      }
      events.push(eve);
      break;
    }
    case "Setfunctiontype":
    {
      var uid = ctrlObj.control.uid;
      var chid = ctrlObj.control.chid;
      var val = ctrlObj.control.val;
      device.SetFunctionType(uid,chid,val);
      var eve = InitEvent(1002,chid,uid);
      while(events.length>=maxevent)
      {
        events.splice(0,1);
      }
      events.push(eve);
      break;
    }
    default:
    {
      console.log(cmd);
      break;
    }
  }
  res.send(JSON.stringify(response));
};
function InitSDKResponse(cmd,uid)
{
  var response = new Object();
  var control = new Object();
  control.cmd = cmd;
  control.respcode = 100;
  control.respmsg = "OK";
  if(uid == undefined)
  {
    uid = 0;
  }
  control.uid = uid;
  response.control = control;
  return response;
};
function NetworkCommandHandle(url,res)
{
  var cmd = "";
  var response = new Object();
  if(url.jsongetevent != undefined)
  {
    cmd = "jsongetevent";
    response.Now_timeStamp = GetCurrentTimestamp();
    response.checkbox = checkbox.GetCheckbox();
    response.eventLog = GetCurrentEvent(url.jsongetevent);
    response.scene_device_number_total = 0;
    response.scene_device_success_number = 0;
    response.scene_exec_check_enable = 0;
    response.scene_success = 0;
    response["send.dat_ts"] = 0;
    // console.log(GetCurrentTimestamp()-timestamp);
    // timestamp = GetCurrentTimestamp();
  }
  if(url.memusage != undefined)
  {
    cmd = "memusage";
    var app = new Object();
    app.VmSize = 56284;
    var httpd = new Object();
    httpd.VmSize = 6336;
    var philiosdk = new Object();
    philiosdk.VmSize = 64416;
    var platform = new Object();
    platform.VmSize = 41048;
    response.app = app;
    response.httpd = httpd;
    response["philio-sdk"] = philiosdk;
    response.platform = platform;
  }
  if(url.gettimezone != undefined)
  {
    cmd = "gettimezone";
    response = time.GetTimzone();
  }
  if(url.jsongetall != undefined)
  {
    cmd = "jsongetall";
    response = appdata.JsonGetAll();
  }
  if(url.jsonsetall != undefined)
  {
    cmd = "jsonsetall";
    var json = JSON.parse(decodeURI(url.jsonsetall));
    appdata.JsonSetAll(json);
    var eve = InitEvent(5003,0,0);
    while(events.length>=maxevent)
    {
      events.splice(0,1);
    }
    // events.push(eve);
  }
  if(url.jsondel != undefined)
  {
    cmd = "jsondel";
    console.log(url.jsondel);
    var json = JSON.parse(decodeURI(url.jsondel));
    appdata.JsonDel(json);
    var eve = InitEvent(5003,0,0);
    while(events.length>=maxevent)
    {
      events.splice(0,1);
    }
    // events.push(eve);
  }
  if(url.getplatform != undefined)
  {
    cmd = "getplatform";
    response = global.platform;
  }
  if(url.getswversion != undefined)
  {
    cmd = "getswversion";
    response = global.version;
  }
  if(url.getp2ppwd != undefined)
  {
    cmd = "getp2ppwd";
    response = global.password;
  }
  if(url.jsongetcheckbox != undefined)
  {
    cmd = "jsongetcheckbox";
    response = checkbox.GetCheckbox();
  }
  if(url.jsonsetcheckbox != undefined)
  {
    cmd = "jsonsetcheckbox";
    var val = JSON.parse(decodeURI(url.jsonsetcheckbox));
    checkbox.SetCheckbox(val);
  }
  if(url.getp2pusername != undefined)
  {
    cmd = "getp2pusername";
    response = global.username;
  }
  if(url.enableastclock != undefined)
  {
    cmd = "enableastclock";
    var val = JSON.parse(decodeURI(url.enableastclock));
    sun.SetSunEnable(val);
  }
  if(url.getenableastclock != undefined)
  {
    cmd = "getenableastclock";
    response = sun.GetSunEnable();
  }
  if(url.getastclock_lon != undefined)
  {
    cmd = "getastclock_lon";
    response = sun.GetSunLongitude();
  }
  if(url.setastclock_lon != undefined)
  {
    cmd = "setastclock_lon";
    var val = JSON.parse(decodeURI(url.setastclock_lon));
    sun.SetSunLongitude(val);
  }
  if(url.getastclock_lat != undefined)
  {
    cmd = "getastclock_lat";
    response = sun.GetSunLatitude();
  }
  if(url.setastclock_lat != undefined)
  {
    cmd = "setastclock_lat";
    var val = JSON.parse(decodeURI(url.setastclock_lat));
    sun.SetSunLatitude(val);
  }
  if(url.jsongetuserdata != undefined)
  {
    cmd = "jsongetuserdata";
    response = userdata.GetUserData();
  }
  if(url.jsonsetuserdata != undefined)
  {
    cmd = "jsonsetuserdata";
    var val = JSON.parse(decodeURI(url.jsonsetuserdata));
    userdata.SetUserData(val);
  }
  if(url.authcode != undefined)
  {
    cmd = "authcode";
    var obj = new Object();
    obj.code = "FHSJOX";
    obj.cdt = 60;  
    response = obj;
  }
  if(url.getbuildinsiren != undefined)
  {
    cmd = "getbuildinsiren";
    response = global.buildinsiren;
  }
  if(url.getsocketaddr != undefined)
  {
    cmd = "getsocketaddr";
    response = socketaddr;
  }
  if(url.getsocketport != undefined)
  {
    cmd = "getsocketport";
    response = socketport;
  }
  if(url.getsocketsec != undefined)
  {
    cmd = "getsocketsec";
    response = socketsec;
  }
  if(url.setsocketaddr != undefined)
  {
    cmd = "setsocketaddr";
    socketaddr = url.setsocketaddr;
  }
  if(url.setsocketport != undefined)
  {
    cmd = "setsocketport";
    socketport = url.setsocketport;
  }
  if(url.setsocketsec != undefined)
  {
    cmd = "setsocketsec";
    setsocketsec = url.setsocketsec;
  }
  if(url.socketcommit != undefined)
  {
    cmd = "socketcommit";
  }
  if(url.sendGCM != undefined)
  {
		console.log(0);
    var value = url.sendGCM;
		console.log(0);
    value = "APA91bHYXA0MKcyrKu0Ese4WRKbuQHtEz2yqtXT2e_mpMdYbjBy1f7vRz9yitHgD_TfaQceqvtTd4KBu5TSLRdQrSbGpWXuZXTtX0F48Pe8AGWn1a4l-bHlZ3yHIVaZgqrfTuB4feLfL";
    var gcm = require('node-gcm'); 
    /*new app*/
    var sender = new gcm.Sender('AIzaSyAoipPVrcIwXIHhY_ldFbVcfT6G7ImwgBk');
    var message = new gcm.Message({
        data: { message: "Test Android Message" }
    });
    var regTokens = [value];
    sender.send(message, { registrationTokens: regTokens }, function (err, response) {
        if (err) 
          console.log("error: "+err+" response: "+response);
        else 
          console.log("success: "+response.success);
    });
		console.log(0);
    cmd = "sendGCM";
  }
  if(url.sendAPN != undefined)
  {
    var value = url.sendAPN;
    console.log(value);
    var device1 = "<"+value+">";
    var join = require('path').join
    var pfx = join(__dirname, '../../notification/IOS_new_APP_KEY.p12');
    var apnagent = require('apnagent')
    var agent  = new apnagent.Agent();
    agent.set('pfx file', pfx);
    var message = 'Test Message';
    agent.createMessage().device(device1).alert(
    {
        body: message, 
        'launch-image': 'notif.png'
    }).send();
    agent.connect(function (err) 
    {
      if(err!=undefined)
      {
        console.log(err);
      }
      var env = agent.enabled('sandbox')? 'sandbox': 'production';
      console.log('apnagent [%s] gateway connected', env);
    });
    cmd = "sendAPN";
  }
  if(url.getMAC != undefined)
  {
    cmd = "getMAC";
    response = "eth: 18:cc:23:00:27:dc<br>wifi: 18:cc:23:00:27:db";
  }
  if(url.enabledeviceevent != undefined)
  {
    cmd = "enabledeviceevent";
    if(deviceeventflag)
    {
      deviceeventflag = false;
      clearInterval(deviceeventtimer);
    }
    else
    {
      deviceeventflag = true;
      DeviceEvent();
      deviceeventtimer = setInterval(DeviceEvent,timertime);
    }
  }
  if(url.enabletamperevent != undefined)
  {
    cmd = "enabletamperevent";
    if(tampereventflag)
    {
      tampereventflag = false;
      clearInterval(tampereventtimer);
    }
    else
    {
      tampereventflag = true;
      TamperEvent();
      tampereventtimer = setInterval(TamperEvent,timertime);
    }
  }
  if(url.enablelowbatteryevent != undefined)
  {
    cmd = "enablelowbatteryevent";
    if(lowbatteryeventflag)
    {
      lowbatteryeventflag = false;
      clearInterval(lowbatteryeventtimer);
    }
    else
    {
      lowbatteryeventflag = true;
      LowBettery();
      lowbatteryeventtimer = setInterval(LowBettery,timertime);
    }
  }
  if(url.fullbattery != undefined)
  {
    cmd = "fullbattery";
    FullBattery();
    var eve = InitEvent(5003,0,0);
    while(events.length>=maxevent)
    {
      events.splice(0,1);
    }
    events.push(eve);
  }
  if(url.enablegatewaysirenevent != undefined)
  {
    cmd = "enablegatewaysirenevent";
    if(gatewaysireneventflag)
    {
      gatewaysireneventflag = false;
      clearInterval(gatewaysirentimer);
    }
    else
    {
      gatewaysireneventflag = true;
      GatewaySiren();
      gatewaysirentimer = setInterval(GatewaySiren,timertime);
    }
  }
  if(url.enableappupdateevent != undefined)
  {
    cmd = "enableappupdateevent";
    if(appupdateeventflag)
    {
      appupdateeventflag = false;
      clearInterval(appupdatetimer);
    }
    else
    {
      appupdateeventflag = true;
      APPUpdateTimer();
      appupdatetimer = setInterval(APPUpdateTimer,timertime);
    }
  }
  if(url.enableexcludeevent != undefined)
  {
    cmd = "enableexcludeevent";
    if(exludeeventflag)
    {
      exludeeventflag = false;
      clearInterval(exludetimer);
    }
    else
    {
      exludeeventflag = true;
      ExcludeTimer();
      exludetimer = setInterval(ExcludeTimer,timertime);
    }
  }
  if(url.checkupdate != undefined)
  {
    cmd = "checkupdate";
    response = 1;
  }
  if(url.getupdatestatus != undefined)
  {
    cmd = "getupdatestatus";
    response = 10;
  }
  if(url.senderrormessage != undefined)
  {
    cmd = "senderrormessage";
    error.SaveData(url.senderrormessage);
  }
  if(url.jsonrename != undefined)
  {
    cmd = "jsonrename";
    var json = JSON.parse(decodeURI(url.jsonrename));
    appdata.JsonRename(json);
  }
  if(url.jsongetupdate != undefined)
	{
		cmd = "jsongetupdate";
		response = 
		{
		 "AP_SSID" : "PSC03-18:cc:23:00:4b:69",
		 "Orbweb_UUID" : "",
		 "PLATFORM_MODEL" : "PSC03",
		 "STA_SSID" : "",
		 "SU_PASSWORD" : "",
		 "TUTK_UUID" : "",
		 "TZ" : 31,
		 "WifiMode" : "AP",
		 "enablelock" : "",
		 "eth:" : "18:cc:23:00:4b:68",
		 "get_sunrise_time" : "1569880020",
		 "get_sunset_time" : "1569923040",
		 "jsongetuserdata_number" : 1569204346,
		 "jsonsetall_number" : 1569556488,
		 "jsonsetcheckbox" : 64,
		 "language" : -1,
		 "setastclock_lat" : "21",
		 "setastclock_lon" : "121",
		 "swversion" : "2.12:Sep 24 2019 18:58:06",
		 "use_buildin_siren" : "0",
		 "wifi:" : "18:cc:23:00:4b:69"
		};
	}
	if(cmd == "")
  {
    console.log(url);  
  }
  switch(cmd)
  {
    case "getplatform":
    case "getp2ppwd":
    case "getp2pusername":
    case "getbuildinsiren":
    case "getsocketaddr":
    case "getsocketport":
    case "getsocketport":
    case "getMAC":
    {
      response = response;
      break;
    }
    default :
    {
      response = JSON.stringify(response);
      break;
    }
  }
  res.send(response+"<br>"+cmd+" done");
};
function GetCurrentTimestamp()
{
  var result = 0;
  var today = new Date();
  var today_year = today.getFullYear();
  var today_month = today.getMonth()+1;
  var today_date = today.getDate();
  var today_hours = today.getHours();
  var today_minutes = today.getMinutes();
  var today_seconds = today.getSeconds();
  var current = today_year+"-"+today_month+"-"+today_date+"  "+today_hours+":"+today_minutes+":"+today_seconds;
  return (Date.parse(current)).valueOf()/1000;
};
function InitEvent(code,chid,uid)
{
  var eventdevice = device.GetOneDeviceChannel(uid,chid);
  var result = new Object();
  if(Object.keys(eventdevice).length != 0)
  {
    result.Dim_ON_Value = eventdevice.channel[0].Dim_ON_Value;
    result.basicValue = eventdevice.channel[0].basicvalue;
    result.channelID = eventdevice.channel[0].chid;
    // result.dataUnit = eventdevice.channel[0].sensorunit;
    result.dataUnit = 9;
    result.eventCode = code;
    result.funcType = eventdevice.channel[0].functype;
    result.sensorValue = eventdevice.channel[0].sensorvalue;
    result.sequence = sequence++;
    result.timeStamp = GetCurrentTimestamp();
    result.uid = eventdevice.uid;
    result.home_id = eventdevice.home_id;
    if(eventdevice.channel[0].meter != undefined)
    {
      result.meter = eventdevice.channel[0].meter;
      result.meter.kwh = kwh;
      kwh++;
    }
    if(eventdevice.channel[0].switch_color != undefined)
    {
      result.switch_color = eventdevice.channel[0].switch_color;
    }
  }
  else
  {
    result.basicValue = 0;
    result.channelID = chid;
    if(code == 4001 || code == 4002 || code == 5006 || code == 5007)
    {
      result.channelID = 0;
    }
    result.dataUnit = 0;
    result.eventCode = code;
    result.funcType = 0;
    result.sensorValue = 0;
    result.sequence = sequence++;
    result.home_id = eventdevice.home_id;
    if(eventdevice.home_id == undefined)
    {
      var interfaces =  ifaces.GetInterface();
      result.home_id = global.homeid;
    } 
    result.timeStamp = GetCurrentTimestamp();   
    result.uid = uid;
  }
  if(code == 5003)
  {
    console.log(5003);
  }
  return result;
};
function GetCurrentEvent(seq)
{
  var currentevents = new Array();
  for(var i=0;i<events.length;i++)
  {
    if(events[i].sequence >= seq)
    {
      currentevents.push(events[i]);
    }
  }
  return currentevents;
};

/*event block*/

/*need device information*/
//var sunset = setInterval(SunsetTimer,10000);
//var sunrise = setInterval(SunriseTimer,8000);


/*no need device information*/
// var failedevent = setInterval(Failed,10000);
// var brokenevent = setInterval(Broken,1000);
// var adddeviceevent = setInterval(AddDeviceTimer,10000);

function AddDeviceTimer()
{
  var eve = InitEvent(1002,0,270);
  while(events.length>=maxevent)
  {
    events.splice(0,1);
  }
  events.push(eve);
}
function SunsetTimer()
{
  var val = Math.floor((Math.random() * 8) + 1);
  device.UpdateDevice(val,0,508);
  var eve = InitEvent(5002,0,508);
  while(events.length>=maxevent)
  {
    events.splice(0,1);
  }
  events.push(eve);
}
function SunriseTimer()
{
  var val = Math.floor((Math.random() * 8) + 1);
  device.UpdateDevice(val,0,509);
  var eve = InitEvent(5002,0,509);
  while(events.length>=maxevent)
  {
    events.splice(0,1);
  }
  events.push(eve);
}
function APPUpdateTimer()
{
  var eve = InitEvent(5003,0,0);
  while(events.length>=maxevent)
  {
    events.splice(0,1);
  }
  events.push(eve);
  console.log("APP Update Triggered");
};
function DeviceEvent()
{
  var devices = device.GetDevice(256);
  for(var i=0;i<devices.length;i++)
  {
    var uid = devices[i].uid
    if(devices[i].channel != undefined)
    {
      for(var j=0;j<devices[i].channel.length;j++)
      {
        var chid = devices[i].channel[j].chid;
        switch(devices[i].channel[j].functype)
        {
          /*Meter Switch*/
          case 22:
          {
            var random = Math.floor((Math.random() * 2));
            var val = 0;
            if(random == 0)
            {
              val = 255;
            }
            device.UpdateDevice(val,chid,uid);
            var eve = InitEvent(5002,chid,uid);
            while(events.length>=maxevent)
            {
              events.splice(0,1);
            }
            events.push(eve);
            var eve = InitEvent(4804,chid,uid);
            while(events.length>=maxevent)
            {
              events.splice(0,1);
            }
            events.push(eve);
            break;
          }
          /*PIR*/
          case 14:
          {
            device.UpdateDevice(0,chid,uid);
            var eve = InitEvent(4101,chid,uid);
            while(events.length>=maxevent)
            {
              events.splice(0,1);
            }
            events.push(eve);
            break;
          }
          /*Door*/
          case 13:
          {
            var random = Math.floor((Math.random() * 2));
            var val = 0;
            if(random == 0)
            {
              val = 255;
            }
            device.UpdateDevice(val,chid,uid);
            var eve = InitEvent(4103,chid,uid);
            if(random == 0)
            {
              eve = InitEvent(4102,chid,uid);
            }
            while(events.length>=maxevent)
            {
              events.splice(0,1);
            }
            events.push(eve);
            break;
          }
          /*Lux*/
          case 12:
          {
            var val = 255;
            device.UpdateDevice(val,chid,uid);
            var eve = InitEvent(5002,chid,uid);
            while(events.length>=maxevent)
            {
              events.splice(0,1);
            }
            events.push(eve);
            break;
          }
          /*Temperature*/
          case 11:
          {
            var val = 255;
            device.UpdateDevice(val,chid,uid);
            var eve = InitEvent(4801,chid,uid);
            while(events.length>=maxevent)
            {
              events.splice(0,1);
            }
            events.push(eve);
            break;
          }
          /*Humidity*/
          case 15:
          {
            var val = 255;
            device.UpdateDevice(val,chid,uid);
            var eve = InitEvent(4803,chid,uid);
            while(events.length>=maxevent)
            {
              events.splice(0,1);
            }
            events.push(eve);
            break;
          }
          /*Smoke*/
          case 17:
          {
            var random = Math.floor((Math.random() * 2));
            var val = 0;
            if(random == 0)
            {
              val = 255;
            }
            device.UpdateDevice(val,chid,uid);
            var eve = InitEvent(5002,chid,uid);
            while(events.length>=maxevent)
            {
              events.splice(0,1);
            }
            events.push(eve);
            break;
          }
          /*Flood*/
          case 20:
          {
            var random = Math.floor((Math.random() * 2));
            var val = 0;
            if(random == 0)
            {
              val = 255;
            }
            device.UpdateDevice(val,chid,uid);
            var eve = InitEvent(5002,chid,uid);
            while(events.length>=maxevent)
            {
              events.splice(0,1);
            }
            events.push(eve);
            break;
          }
          /*Switch*/
          case 23:
          {
            var random = Math.floor((Math.random() * 2));
            var val = 0;
            if(random == 0)
            {
              val = 255;
            }
            device.UpdateDevice(val,chid,uid);
            var eve = InitEvent(5002,chid,uid);
            while(events.length>=maxevent)
            {
              events.splice(0,1);
            }
            events.push(eve);
            break;
          }
          /*Dimmer*/
          case 24:
          {
            var random = Math.floor((Math.random() * 4));
            var val = 0;
            if(random == 0)
            {
              val = 0;
            }
            else if(random == 1)
            {
              val = 50;
            }
            else
            {
              val = 99;
            }
            device.UpdateDevice(val,chid,uid);
            var eve = InitEvent(5002,chid,uid);
            while(events.length>=maxevent)
            {
              events.splice(0,1);
            }
            events.push(eve);
            break;
          }
          /*Siren*/
          case 25:
          {
            var random = Math.floor((Math.random() * 2));
            var val = 0;
            if(random == 0)
            {
              val = 255;
            }
            device.UpdateDevice(val,chid,uid);
            var eve = InitEvent(5002,chid,uid);
            while(events.length>=maxevent)
            {
              events.splice(0,1);
            }
            events.push(eve);
            break;
          }
          /*Curtain*/
          case 26:
          {
            var random = Math.floor((Math.random() * 3));
            var val = 0;
            if(random == 0)
            {
              val = 0;
            }
            else if(random == 1)
            {
              val = 50;
            }
            else
            {
              val = 99;
            }
            device.UpdateDevice(val,chid,uid);
            var eve = InitEvent(5002,chid,uid);
            while(events.length>=maxevent)
            {
              events.splice(0,1);
            }
            events.push(eve);
            break;
          }
          /*Remote*/
          case 27:
          {
            var val = Math.floor((Math.random() * 9));
            device.UpdateDevice(val,chid,uid);
            var eve = InitEvent(4400+val,chid,uid);
            if(val == 0)
            {
              eve = InitEvent(4122,chid,uid);
            }
            while(events.length>=maxevent)
            {
              events.splice(0,1);
            }
            events.push(eve);
            break;
          }
          /*Smart Button*/
          case 28:
          {
            var val = Math.floor((Math.random() * 100));
            device.UpdateDevice(val,chid,uid);
            var eve = InitEvent(5002,chid,uid);
            if(val == 0)
            {
              eve = InitEvent(4122,chid,uid);
            }
            while(events.length>=maxevent)
            {
              events.splice(0,1);
            }
            events.push(eve);
            break;
          }
          /*Meter Sensor*/
          case 29:
          {
            device.UpdateDevice(255,chid,uid);
            var eve = InitEvent(4804,chid,uid);
            while(events.length>=maxevent)
            {
              events.splice(0,1);
            }
            events.push(eve);
            break;
          }
          /*Door Lock*/
          case 31:
          {
            var random = Math.floor((Math.random() * 2));
            var val = 0;
            if(random == 0)
            {
              val = 255;
            }
            device.UpdateDevice(val,chid,uid);
            var eve = InitEvent(5002,chid,uid);
            while(events.length>=maxevent)
            {
              events.splice(0,1);
            }
            events.push(eve);
            break;
          }
          /*Color Dimmer*/
          case 41:
          {
            var random = Math.floor((Math.random() * 4));
            var val = 0;
            if(random == 0)
            {
              val = 0;
            }
            else if(random == 1)
            {
              val = 50;
            }
            else
            {
              val = 99;
            }
            device.UpdateDevice(val,chid,uid);
            var eve = InitEvent(5002,chid,uid);
            while(events.length>=maxevent)
            {
              events.splice(0,1);
            }
            events.push(eve);
            break;
          }
        }
      }
    }
  }
  console.log("Device Event Triggered");
};
function TamperEvent()
{
  var devices = device.GetDevice(256);
  for(var i=0;i<devices.length;i++)
  {
    var uid = devices[i].uid
    if(devices[i].channel != undefined)
    {
      for(var j=0;j<devices[i].channel.length;j++)
      {
        var chid = devices[i].channel[j].chid;
        switch(devices[i].channel[j].functype)
        {
          /*
          PIR , Dooe , Lux , Temperature , Humidity , Smoke , Flood , Siren
          */
          case 14:
          case 13:
          case 12:
          case 11:
          case 15:
          case 17:
          case 20:
          case 25:
          {
            var eve = InitEvent(4001,chid,uid);
            while(events.length>=maxevent)
            {
              events.splice(0,1);
            }
            events.push(eve);
            break;
          }
        }
      }
    }
  }
  console.log("Tamper Event Triggered");
};
function LowBettery()
{
  var devices = device.GetDevice(256);
  for(var i=0;i<devices.length;i++)
  {
    var uid = devices[i].uid
    if(devices[i].channel != undefined)
    {
      for(var j=0;j<devices[i].channel.length;j++)
      {
        var chid = devices[i].channel[j].chid;
        switch(devices[i].channel[j].functype)
        {
          /*
          PIR , Dooe , Lux , Temperature , Humidity , Smoke , Flood , Siren
          */
          case 11:
          case 12:
          case 13:
          case 14:
          case 15:
          case 17:
          case 20:
          case 27:
          case 28:
          {
            device.UpdateLowBattery(255,uid);
            var eve = InitEvent(4002,chid,uid);
            while(events.length>=maxevent)
            {
              events.splice(0,1);
            }
            events.push(eve);
            break;
          }
        }
      }
    }
  }
  console.log("Low Bettery Triggered");
};
function FullBattery()
{
  var devices = device.GetDevice(256);
  for(var i=0;i<devices.length;i++)
  {
    var uid = devices[i].uid
    if(devices[i].channel != undefined)
    {
      for(var j=0;j<devices[i].channel.length;j++)
      {
        var chid = devices[i].channel[j].chid;
        switch(devices[i].channel[j].functype)
        {
          /*
          PIR , Dooe , Lux , Temperature , Humidity , Smoke , Flood , Siren
          */
          case 11:
          case 12:
          case 13:
          case 14:
          case 15:
          case 17:
          case 20:
          case 27:
          case 28:
          {
            device.UpdateLowBattery(100,uid);
            break;
          }
        }
      }
    }
  }
};
function GatewaySiren()
{
  var code = 0;
  if(gateway_siren)
  {
    gateway_siren = false;
    code = 5006;
  }
  else
  {
    gateway_siren = true;
    code = 5005;
  }
  var eve = InitEvent(code,0,0);
  while(events.length>=maxevent)
  {
    events.splice(0,1);
  }
  events.push(eve);
  console.log("Gateway Siren Triggered");
};
function ExcludeTimer()
{
  var eve = InitEvent(1003,0,0);
  while(events.length>=maxevent)
  {
    events.splice(0,1);
  }
  events.push(eve);
  console.log("Exclude Triggered");
};
function Failed()
{
  var code = 4208;
  var eve = InitEvent(code,0,0);
  while(events.length>=maxevent)
  {
    events.splice(0,1);
  }
  events.push(eve);
  console.log("Failed Triggered");
};
function Broken()
{
  var code = 4209;
  var eve = InitEvent(code,0,0);
  while(events.length>=maxevent)
  {
    events.splice(0,1);
  }
  events.push(eve);
  console.log("Broken Triggered");
};
