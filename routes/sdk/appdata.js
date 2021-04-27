var fs = require('fs');
var path = "./routes/sdk/appdata.json";
var appdata = new Object();

if(fs.existsSync(path))
{
	appdata = JSON.parse(fs.readFileSync(path, "utf8"));
  if(appdata.alarm == undefined)
  {
    appdata.alarm = new Object();
    appdata.alarm.duration = 5;
    appdata.alarm.enabled = 0;
    appdata.alarm.siren_type = 1;
    appdata.alarm.trigger_duration = 3;
  }
  fs.writeFileSync(path, JSON.stringify(appdata, null, 2));
}
else
{
	appdata = 
  {
    "alarm": {
      "duration": 5,
      "enabled": 0,
      "siren_type": 1,
      "trigger_duration": 3
    },
    "cameras": [],
    "macros": [],
    "registeredDevices": [],
    "rooms": [],
    "scenes": [],
    "schedules": [],
    "targetNames": {},
    "eventFilter":[]
  }
}

module.exports = 
{
	JsonGetAll: function() 
	{
    this.SaveData();
    return appdata;
	},
  SaveData: function()
	{
		fs.writeFileSync(path, JSON.stringify(appdata, null, 2));
	},
  JsonSetAll: function(newdata)
	{
    if(newdata.targetNames != undefined)
    {
      var newtargetNames = newdata.targetNames;
      for (var newkey in newtargetNames) 
      { 
        var findkey = false;
        for(var key in appdata.targetNames)
        {
          if(newkey == key)
          {
            findkey = true;
            appdata.targetNames[key] = newtargetNames[newkey];
          }
        }
        if(!findkey)
        {
          appdata.targetNames[newkey] = newtargetNames[newkey];
        }
      }
    }
    if(newdata.rooms != undefined)
    {
      var newrooms = newdata.rooms;
      for(var i=0;i<newrooms.length;i++)
      {
        var findroom = false;
        for(var j=0;j<appdata.rooms.length;j++)
        {
          if(newrooms[i].title == appdata.rooms[j].title)
          {
            findroom = true;
            if(newrooms[i].camera_password != undefined)
            {
              appdata.rooms[j].camera_password = newrooms[i].camera_password;
            }
            if(newrooms[i].icon_name != undefined)
            {
              appdata.rooms[j].icon_name = newrooms[i].icon_name;
            }
            if(newrooms[i].camera != undefined)
            {
              appdata.rooms[j].camera = newrooms[i].camera;
            }
            if(newrooms[i].targets != undefined)
            {
              for(var k=0;k<newrooms[i].targets.length;k++)
              {
                var findtarget = false;
                if(appdata.rooms[j].targets==undefined)
                {
                  appdata.rooms[j].targets = new Array();
                }
                for(var l=0;l<appdata.rooms[j].targets.length;l++)
                {
                   if(appdata.rooms[j].targets[l].dev == newrooms[i].targets[k].dev && appdata.rooms[j].targets[l].home_id == newrooms[i].targets[k].home_id && appdata.rooms[j].targets[l].ch == newrooms[i].targets[k].ch)
                   {
                     findtarget = true;
                   }
                }
                if(!findtarget)
                {
                  appdata.rooms[j].targets.push(newrooms[i].targets[k]);
                }
              }
            }
          }
        }
        if(!findroom)
        {
          var room = CreateRoom(newrooms[i]);
          appdata.rooms.push(room);
        }
      }
    }
    if(newdata.alarm != undefined)
    {
      var newalarm = newdata.alarm;
      if(newalarm.enabled != undefined)
      {
        appdata.alarm.enabled = newalarm.enabled;
      }
      if(newalarm.trigger_duration != undefined)
      {
        appdata.alarm.trigger_duration = newalarm.trigger_duration;
      }
      if(newalarm.siren_type != undefined)
      {
        appdata.alarm.siren_type = newalarm.siren_type;
      }
      if(newalarm.duration != undefined)
      {
        appdata.alarm.duration = newalarm.duration;
      }
    }
    if(newdata.scenes != undefined)
    {
      var newscenes = newdata.scenes;
      for(var i=0;i<newscenes.length;i++)
      {
        var findscene = false;
        for(var j=0;j<appdata.scenes.length;j++)
        {
          if(newscenes[i].title == appdata.scenes[j].title)
          {
            findscene = true;
            if(newscenes[i].icon_name != undefined)
            {
              appdata.scenes[j].icon_name = newscenes[i].icon_name;
            }
            if(newscenes[i].buildinSiren != undefined)
            {
              appdata.scenes[j].buildinSiren = newscenes[i].buildinSiren;
            }
            if(newscenes[i].comps != undefined)
            {
              for(var k=0;k<newscenes[i].comps.length;k++)
              {
                var findcomp = false;
                if(appdata.scenes[j].comps==undefined)
                {
                  appdata.scenes[j].comps = new Array();
                }
                for(var l=0;l<appdata.scenes[j].comps.length;l++)
                {
                   if(appdata.scenes[j].comps[l].target.dev == newscenes[i].comps[k].target.dev && appdata.scenes[j].comps[l].target.home_id == newscenes[i].comps[k].target.home_id && appdata.scenes[j].comps[l].target.ch == newscenes[i].comps[k].target.ch)
                   {
                     findcomp = true;
                     appdata.scenes[j].comps[l].value = newscenes[i].comps[k].value;
                   }
                }
                if(!findcomp)
                {
                  appdata.scenes[j].comps.push(newscenes[i].comps[k]);
                }
              }
            }
          }
        }
        if(!findscene)
        {
          var scene = CreateScene(newscenes[i]);
          appdata.scenes.push(scene);
        }
      }
    }
    if(newdata.macros != undefined)
    {
      var newmacros = newdata.macros;
      for(var i=0;i<newmacros.length;i++)
      {
        var findmacro = false;
        for(var j=0;j<appdata.macros.length;j++)
        {
          if(newmacros[i].title == appdata.macros[j].title)
          {
            findmacro = true;
            if(newmacros[i].duration != undefined)
            {
              appdata.macros[j].duration = newmacros[i].duration;
            }
            if(newmacros[i].enabled != undefined)
            {
              appdata.macros[j].enabled = newmacros[i].enabled;
            }
            if(newmacros[i].enabled_notifications != undefined)
            {
              appdata.macros[j].enabled_notifications = newmacros[i].enabled_notifications;
            }
            if(newmacros[i].icon_name != undefined)
            {
              appdata.macros[j].icon_name = newmacros[i].icon_name;
            }
            if(newmacros[i].scene != undefined && newmacros[i].scene.comps != undefined)
            {
              if(newmacros[i].scene.title != "" && newmacros[i].scene.title != undefined)
              {
                appdata.macros[j].scene.title = newmacros[i].scene.title;
                appdata.macros[j].scene.icon_name = newmacros[i].scene.icon_name;
              }
              for(var k=0;k<newmacros[i].scene.comps.length;k++)
              {
                var findcomp = false;
                if(appdata.macros[j].scene == undefined)
                {
                  appdata.macros[j].scene = new Object();
                }
                if(appdata.macros[j].scene.comps==undefined)
                {
                  appdata.macros[j].scene.comps = new Array();
                }
                for(var l=0;l<appdata.macros[j].scene.comps.length;l++)
                {
                   if(appdata.macros[j].scene.comps[l].target.dev == newmacros[i].scene.comps[k].target.dev && appdata.macros[j].scene.comps[l].target.home_id == newmacros[i].scene.comps[k].target.home_id && appdata.macros[j].scene.comps[l].target.ch == newmacros[i].scene.comps[k].target.ch)
                   {
                     findcomp = true;
                     appdata.macros[j].scene.comps[l].value = newmacros[i].scene.comps[k].value;
                   }
                }
                if(!findcomp)
                {
                  appdata.macros[j].scene.comps.push(newmacros[i].scene.comps[k]);
                }
              }
            }
            if(newmacros[i].scene != undefined)
            {
              if(newmacros[i].scene.buildinSiren != undefined)
              {
                if(appdata.macros[j].scene == undefined)
                {
                  appdata.macros[j].scene = new Object();
                }
                appdata.macros[j].scene.buildinSiren = newmacros[i].scene.buildinSiren;
              }
            }
            if(newmacros[i].triggers != undefined)
            {
              for(var k=0;k<newmacros[i].triggers.length;k++)
              {
                var findtrigger = false;
                if(appdata.macros[j].triggers == undefined)
                {
                  appdata.macros[j].triggers = new Array();
                }
                for(var l=0;l<appdata.macros[j].triggers.length;l++)
                {
                   if(appdata.macros[j].triggers[l].target.dev == newmacros[i].triggers[k].target.dev && appdata.macros[j].triggers[l].target.home_id == newmacros[i].triggers[k].target.home_id && appdata.macros[j].triggers[l].target.ch == newmacros[i].triggers[k].target.ch)
                   {
                     findtrigger = true;
                     if(newmacros[i].triggers[k].dataunit != undefined)
                     {
                       appdata.macros[j].triggers[l].dataunit = newmacros[i].triggers[k].dataunit;
                     }
                     if(newmacros[i].triggers[k].duration != undefined)
                     {
                       appdata.macros[j].triggers[l].duration = newmacros[i].triggers[k].duration;
                     }
                     if(newmacros[i].triggers[k].field != undefined)
                     {
                       appdata.macros[j].triggers[l].field = newmacros[i].triggers[k].field;
                     }
                     if(newmacros[i].triggers[k].op != undefined)
                     {
                       appdata.macros[j].triggers[l].op = newmacros[i].triggers[k].op;
                     }
                     if(newmacros[i].triggers[k].threshold != undefined)
                     {
                       appdata.macros[j].triggers[l].threshold = newmacros[i].triggers[k].threshold;
                     }
                   }
                }
                if(!findtrigger)
                {
                  appdata.macros[j].triggers.push(newmacros[i].triggers[k]);
                }
              }
            }
          }
        }
        if(!findmacro)
        {
          var macro = CreateMacro(newmacros[i]);
          appdata.macros.push(macro);
        }
      }
    }
    if(newdata.schedules != undefined)
    {
      var newschedules = newdata.schedules;
      for(var i=0;i<newschedules.length;i++)
      {
        var findschedule = false;
        for(var j=0;j<appdata.schedules.length;j++)
        {
          if(newschedules[i].title == appdata.schedules[j].title)
          {
            findschedule = true;
            if(newschedules[i].enabled != undefined)
            {
              appdata.schedules[j].enabled = newschedules[i].enabled;
            }
            if(newschedules[i].end_day != undefined)
            {
              appdata.schedules[j].end_day = newschedules[i].end_day;
            }        
            if(newschedules[i].end_hour != undefined)
            {
              appdata.schedules[j].end_hour = newschedules[i].end_hour;
            }
            if(newschedules[i].end_minute != undefined)
            {
              appdata.schedules[j].end_minute = newschedules[i].end_minute;
            }   
            if(newschedules[i].end_month != undefined)
            {
              appdata.schedules[j].end_month = newschedules[i].end_month;
            }        
            if(newschedules[i].home_security_alarm != undefined)
            {
              appdata.schedules[j].home_security_alarm = newschedules[i].home_security_alarm;
            }
            if(newschedules[i].icon_name != undefined)
            {
              appdata.schedules[j].icon_name = newschedules[i].icon_name;
            }
            if(newschedules[i].repeat_type != undefined)
            {
              appdata.schedules[j].repeat_type = newschedules[i].repeat_type;
            }
            if(newschedules[i].start_day != undefined)
            {
              appdata.schedules[j].start_day = newschedules[i].start_day;
            }
            if(newschedules[i].start_hour != undefined)
            {
              appdata.schedules[j].start_hour = newschedules[i].start_hour;
            }
            if(newschedules[i].start_minute != undefined)
            {
              appdata.schedules[j].start_minute = newschedules[i].start_minute;
            }
            if(newschedules[i].start_month != undefined)
            {
              appdata.schedules[j].start_month = newschedules[i].start_month;
            }
            if(newschedules[i].title != undefined)
            {
              appdata.schedules[j].title = newschedules[i].title;
            }
            if(newschedules[i].weekdays != undefined)
            {
              appdata.schedules[j].weekdays = newschedules[i].weekdays;
            }
            if(newschedules[i].macro != undefined)
            {
              /*use macro*/
              if(newschedules[i].macro.scene == undefined)
              {
                appdata.schedules[j].macro = newschedules[i].macro;
              }
              /*device or scene*/
              else
              {
                /*device*/
                if(newschedules[i].macro.scene.title == "" || newschedules[i].macro.scene.title == undefined)
                {
                  if(appdata.schedules[j].macro.scene == undefined)
                  {
                    appdata.schedules[j].macro = new Object();
                    appdata.schedules[j].macro.scene = new Object();
                    appdata.schedules[j].macro.scene.title = "";
                    appdata.schedules[j].macro.scene.icon_name = "";
                  }
                  if(appdata.schedules[j].macro.scene.comps == undefined)
                  {
                    appdata.schedules[j].macro.scene.comps = new Array();
                  }
                  if(newschedules[i].macro.scene.buildinSiren != undefined)
                  {
                    if(appdata.schedules[j].macro.scene == undefined)
                    {
                      appdata.schedules[j].macro.scene = new Object();
                    }
                    appdata.schedules[j].macro.scene.buildinSiren = newschedules[i].macro.scene.buildinSiren;
                  }
                  if(newschedules[i].macro.scene.comps != undefined)
                  {
                    for(var k=0;k<newschedules[i].macro.scene.comps.length;k++)
                    {
                      var findcomp = false;
                      for(var l=0;l<appdata.schedules[j].macro.scene.comps.length;l++)
                      {
                        if(appdata.schedules[j].macro.scene.comps[l].target.dev == newschedules[i].macro.scene.comps[k].target.dev && appdata.schedules[j].macro.scene.comps[l].target.home_id == newschedules[i].macro.scene.comps[k].target.home_id && appdata.schedules[j].macro.scene.comps[l].target.ch == newschedules[i].macro.scene.comps[k].target.ch)
                        {
                          findcomp = true;
                          appdata.schedules[j].macro.scene.comps[l].value = newschedules[i].macro.scene.comps[k].value;
                        }
                      }
                      if(!findcomp)
                      {
                        appdata.schedules[j].macro.scene.comps.push(newschedules[i].macro.scene.comps[k]);
                      }
                    }
                  }
                }
                /*scene*/
                else
                {
                  if(appdata.schedules[j].macro.scene == undefined)
                  {
                    appdata.schedules[j].macro = new Object();
                    appdata.schedules[j].macro.scene = new Object();
                  }
                  appdata.schedules[j].macro.scene = newschedules[i].macro.scene;
                }
              }
            }  
          }
        }
        if(!findschedule)
        {
          var schedule = CreateSchedule(newschedules[i]);
          appdata.schedules.push(schedule);
        }
      }
    }
    if(newdata.cameras != undefined)
    {
      var newcameras = newdata.cameras;
      for(var i=0;i<newcameras.length;i++)
      {
        var findcamera = false;
        for(var j=0;j<appdata.cameras.length;j++)
        {
          if(newcameras[i].uid == appdata.cameras[j].uid)
          {
            findcamera = true;
            if(newcameras[i].display != undefined)
            {
              appdata.cameras[j].display= newcameras[i].display;
            }
            if(newcameras[i].password != undefined)
            {
              appdata.cameras[j].password= newcameras[i].password;
            }
          }
        }
        if(!findcamera)
        {
          var camera = CreateCamera(newcameras[i]);
          appdata.cameras.push(camera);
        }
      }
    }
    if(newdata.registeredDevices != undefined)
    {
      var registeredDevices = newdata.registeredDevices;
      for(var i=0;i<registeredDevices.length;i++)
      {
        var findregisteredDevices = false;
        for(var j=0;j<appdata.registeredDevices.length;j++)
        {
          if(registeredDevices[i].token == appdata.registeredDevices[j].token)
          {
            findregisteredDevices = true;
            if(registeredDevices[i].app_id != undefined)
            {
              appdata.registeredDevices[j].app_id = registeredDevices[i].app_id;
            }
            if(registeredDevices[i].disable_notifications != undefined)
            {
              appdata.registeredDevices[j].disable_notifications = registeredDevices[i].disable_notifications;
            }
            if(registeredDevices[i].platform != undefined)
            {
              appdata.registeredDevices[j].platform = registeredDevices[i].platform;
            }
            if(registeredDevices[i].sound != undefined)
            {
              appdata.registeredDevices[j].sound = registeredDevices[i].sound;
            }
            if(registeredDevices[i].update_ts != undefined)
            {
              appdata.registeredDevices[j].update_ts = registeredDevices[i].update_ts;
            }
            if(registeredDevices[i].email !=undefined)
            {
              appdata.registeredDevices[j].email = registeredDevices[i].email;
            }
            if(registeredDevices[i].password !=undefined)
            {
              appdata.registeredDevices[j].password = registeredDevices[i].password;
            }
            if(registeredDevices[i].username !=undefined)
            {
              appdata.registeredDevices[j].username = registeredDevices[i].username;
            }
          }
        }
        if(!findregisteredDevices)
        {
          var registeredDevice = CreateRegisteredDevice(registeredDevices[i]);
          appdata.registeredDevices.push(registeredDevice);
        }
      }
    }
    console.log(appdata.targetNames);
    this.SaveData();
	},
  JsonDel: function(newdata)
	{
    if(newdata.rooms != undefined)
    {
      var newrooms = newdata.rooms;
      for(var i=0;i<newrooms.length;i++)
      {
        for(var j=0;j<appdata.rooms.length;j++)
        {
          if(newrooms[i].title == appdata.rooms[j].title)
          {
            var deleteroom = true;
            if(newrooms[i].camera != undefined)
            {
              deleteroom = false;
              appdata.rooms[j].camera = "";
            }
            if(newrooms[i].targets != undefined)
            {
              deleteroom = false;
              for(var k=0;k<newrooms[i].targets.length;k++)
              {
                for(var l=0;l<appdata.rooms[j].targets.length;l++)
                {
                  if(appdata.rooms[j].targets[l].dev == newrooms[i].targets[k].dev && appdata.rooms[j].targets[l].if == newrooms[i].targets[k].if && appdata.rooms[j].targets[l].ch == newrooms[i].targets[k].ch)
                  {
                    appdata.rooms[j].targets.splice(l,1);
                  }
                }
              }
            }
            if(deleteroom)
            {
              appdata.rooms.splice(j,1);
            }
          }
        }
      }
    }
    if(newdata.scenes != undefined)
    {
      var newscenes = newdata.scenes;
      for(var i=0;i<newscenes.length;i++)
      {
        for(var j=0;j<appdata.scenes.length;j++)
        {
          if(newscenes[i].title == appdata.scenes[j].title)
          {
            var deletescene = true;
            if(newscenes[i].comps != undefined)
            {
              deletescene = false;
              for(var k=0;k<newscenes[i].comps.length;k++)
              {
                for(var l=0;l<appdata.scenes[j].comps.length;l++)
                {
                  if(appdata.scenes[j].comps[l].target.dev == newscenes[i].comps[k].target.dev && appdata.scenes[j].comps[l].target.if == newscenes[i].comps[k].target.if && appdata.scenes[j].comps[l].target.ch == newscenes[i].comps[k].target.ch)
                  {
                    appdata.scenes[j].comps.splice(l,1);
                  }
                }
              }
            }
            if(newscenes[i].buildinSiren != undefined)
            {
              deletescene = false;
              appdata.scenes[j].buildinSiren = undefined;
            }
            if(deletescene)
            {
              appdata.scenes.splice(j,1);
            }
          }
        }
      }
    }
    if(newdata.macros != undefined)
    {
      var newmacros = newdata.macros;
      for(var i=0;i<newmacros.length;i++)
      {
        for(var j=0;j<appdata.macros.length;j++)
        {
          if(newmacros[i].title == appdata.macros[j].title)
          {
            var deletesmacro = true;
            if(newmacros[i].scene != undefined)
            {
              deletesmacro = false;
              if(newmacros[i].scene.title != undefined && newmacros[i].scene.title != "")
              {
                appdata.macros[j].scene.title = "";
                appdata.macros[j].scene.icon_name = "";
                appdata.macros[j].scene.comps = new Array();
              }
              else
              {
                if(newmacros[i].scene.comps != undefined)
                {
                  for(var k=0;k<newmacros[i].scene.comps.length;k++)
                  {
                    for(var l=0;l<appdata.macros[j].scene.comps.length;l++)
                    {
                      if(appdata.macros[j].scene.comps[l].target.dev == newmacros[i].scene.comps[k].target.dev && appdata.macros[j].scene.comps[l].target.if == newmacros[i].scene.comps[k].target.if && appdata.macros[j].scene.comps[l].target.ch == newmacros[i].scene.comps[k].target.ch)
                      {
                        appdata.macros[j].scene.comps.splice(l,1);
                      }
                    }
                  }          
                }
              }
              if(newmacros[i].scene.buildinSiren != undefined)
              {
                deletesmacro = false;
                delete appdata.macros[j].scene.buildinSiren;
              }
            }
            if(newmacros[i].triggers != undefined)
            {
              deletesmacro = false;
              appdata.macros[j].triggers = new Array();
            }
            if(deletesmacro)
            {
              appdata.macros.splice(j,1);
            }
          }
        }
      }
    }
    if(newdata.schedules != undefined)
    {
      var newschedules = newdata.schedules;
      for(var i=0;i<newschedules.length;i++)
      {
        for(var j=0;j<appdata.schedules.length;j++)
        {
          if(newschedules[i].title == appdata.schedules[j].title)
          {
            var deleteschedule= true;
            if(newschedules[i].macro != undefined)
            {
              deleteschedule= false;
              /*delete macro*/
              if(newschedules[i].macro.scene == undefined)
              {
                appdata.schedules[j].macro = "";
              }
              /*delete scene or device*/
              else
              {
                /*delete device*/
                if(newschedules[i].macro.scene.title == "" || newschedules[i].macro.scene.title == undefined)
                {
                  if(newschedules[i].macro.scene.comps != undefined)
                  {

                    for(var k=0;k<newschedules[i].macro.scene.comps.length;k++)
                    {
                      for(var l=0;l<appdata.schedules[j].macro.scene.comps.length;l++)
                      {
                        if(appdata.schedules[j].macro.scene.comps[l].target.dev == newschedules[i].macro.scene.comps[k].target.dev && appdata.schedules[j].macro.scene.comps[l].target.if == newschedules[i].macro.scene.comps[k].target.if && appdata.schedules[j].macro.scene.comps[l].target.ch == newschedules[i].macro.scene.comps[k].target.ch)
                        {
                          appdata.schedules[j].macro.scene.comps.splice(l,1);
                        }
                      }
                    }
                  }
                  if(newschedules[i].macro.scene.buildinSiren != undefined)
                  {
                    delete appdata.schedules[j].macro.scene.buildinSiren;
                  }
                }
                /*delete scene*/
                else
                {
                  appdata.schedules[j].macro.scene.title = "";
                  appdata.schedules[j].macro.scene.icon_name = "";
                  appdata.schedules[j].macro.scene.comps = new Array();
                }
              }
            }
            if(deleteschedule)
            {
              appdata.schedules.splice(j,1);
            }
          }
        }
      }
    }
    if(newdata.cameras != undefined)
    {
      var newcameras = newdata.cameras;
      for(var i=0;i<newcameras.length;i++)
      {
        for(var j=0;j<appdata.cameras.length;j++)
        {
          if(newcameras[i].uid == appdata.cameras[j].uid)
          {
            appdata.cameras.splice(j,1);
          }
        }
      }
    }
    if(newdata.targetNames != undefined)
    {
      var newtargetNames = newdata.targetNames;
      for (var newkey in newtargetNames) 
      { 
        for(var key in appdata.targetNames)
        {
          if(newkey == key)
          {
            delete appdata.targetNames[key]; 
          }
        }
      }
    }
    this.SaveData();
	},
  JsonRename: function(newdata)
	{
    var type = newdata[0];
    var oldtitle = newdata[1];
    var newtitle = newdata[2];
    for(var key in appdata)
    {
      if(key == type)
      {
        for(var i=0;i<appdata[key].length;i++)
        {
          if(appdata[key][i].title == oldtitle)
          {
            appdata[key][i].title = newtitle;
            i=0;
          }
        }
      }
    }
    this.SaveData();
	}
};
function CreateRoom(newroom)
{
  var result = new Object();
  if(newroom.title != undefined)
  {
    result.title = newroom.title;
  }
  if(newroom.camera_password != undefined)
  {
    result.camera_password = newroom.camera_password;
  }
  else
  {
    result.camera_password = "";
  }
  if(newroom.icon_name != undefined)
  {
    result.icon_name = newroom.icon_name;
  }
  else
  {
    result.icon_name = "";
  }
  if(newroom.camera != undefined)
  {
    result.camera = newroom.camera;
  }
  else
  {
    result.camera = "";
  }
  if(newroom.targets != undefined)
  {
    result.targets = newroom.targets;
  }
  else
  {
    result.targets = new Array();
  }
  return result;
};
function CreateScene(newscene)
{
  var result = new Object();
  if(newscene.title != undefined)
  {
    result.title = newscene.title;
  }
  if(newscene.icon_name != undefined)
  {
    result.icon_name = newscene.icon_name;
  }
  else
  {
    result.icon_name = "";
  }
  if(newscene.comps != undefined)
  {
    result.comps = newscene.comps;
  }
  else
  {
    result.comps = new Array();
  }
  if(newscene.buildinSiren != undefined)
  {
    result.buildinSiren = newscene.buildinSiren;
  }
  return result;
};
function CreateMacro(newmacro)
{
  var result = new Object();
  if(newmacro.title != undefined)
  {
    result.title = newmacro.title;
  }
  if(newmacro.icon_name != undefined)
  {
    result.icon_name = newmacro.icon_name;
  }
  else
  {
    result.icon_name = "";
  }
  if(newmacro.scene != undefined)
  {
    result.scene = newmacro.scene;
  }
  if(newmacro.duration != undefined)
  {
    result.duration = newmacro.duration;
  }
  else
  {
    result.duration = 0;
  }
  if(newmacro.enabled != undefined)
  {
    result.enabled = newmacro.enabled;
  }
  else
  {
    result.enabled = 0;
  }
  if(newmacro.enabled_notifications != undefined)
  {
    result.enabled_notifications = newmacro.enabled_notifications;
  }
  else
  {
    result.enabled_notifications = new Array();
  }
  if(newmacro.priority != undefined)
  {
    result.priority = newmacro.priority;
  }
  else
  {
    result.priority = 0;
  }
  if(newmacro.trigger_timeout != undefined)
  {
    result.trigger_timeout = newmacro.trigger_timeout;
  }
  else
  {
    result.trigger_timeout = 0;
  }
  if(newmacro.triggers != undefined)
  {
    result.triggers = newmacro.triggers;
  }
  else
  {
    result.triggers = new Array();;
  }
  return result;
};
function CreateSchedule(newschedule)
{
  var result = new Object();
  if(newschedule.enabled != undefined)
  {
    result.enabled = newschedule.enabled;
  }
  else
  {
    result.enabled = 0;
  }
  if(newschedule.end_day != undefined)
  {
    result.end_day = newschedule.end_day;
  }
  else
  {
    result.end_day = 0;
  }  
  if(newschedule.end_hour != undefined)
  {
    result.end_hour = newschedule.end_hour;
  }
  else
  {
    result.end_hour = 0;
  } 
  if(newschedule.end_minute != undefined)
  {
    result.end_minute = newschedule.end_minute;
  }
  else
  {
    result.end_minute = 0;
  }   
  if(newschedule.end_month != undefined)
  {
    result.end_month = newschedule.end_month;
  }
  else
  {
    result.end_month = 0;
  } 
  if(newschedule.home_security_alarm != undefined)
  {
    result.home_security_alarm = newschedule.home_security_alarm;
  }
  else
  {
    result.home_security_alarm = 0;
  }
  if(newschedule.icon_name != undefined)
  {
    result.icon_name = newschedule.icon_name;
  }
  else
  {
    result.icon_name = "";
  }
  if(newschedule.repeat_type != undefined)
  {
    result.repeat_type = newschedule.repeat_type;
  }
  else
  {
    result.repeat_type = 2;
  }
  if(newschedule.start_day != undefined)
  {
    result.start_day = newschedule.start_day;
  }
  else
  {
    result.start_day = 0;
  }
  if(newschedule.start_hour != undefined)
  {
    result.start_hour = newschedule.start_hour;
  }
  else
  {
    result.start_hour = 0;
  }
  if(newschedule.start_minute != undefined)
  {
    result.start_minute = newschedule.start_minute;
  }
  else
  {
    result.start_minute = 0;
  }
  if(newschedule.start_month != undefined)
  {
    result.start_month = newschedule.start_month;
  }
  else
  {
    result.start_month = 0;
  }
  if(newschedule.title != undefined)
  {
    result.title = newschedule.title;
  }
  if(newschedule.weekdays != undefined)
  {
    result.weekdays = newschedule.weekdays;
  }
  else
  {
    result.weekdays = 127;
  }
  if(newschedule.macro != undefined)
  {
    result.macro = newschedule.macro;
  }
  else
  {
    result.macro = "";
  }
  return result;
};
function CreateCamera(newcamera)
{
  var result = new Object();
  if(newcamera.display != undefined)
  {
    result.display = newcamera.display;
  }
  if(newcamera.password != undefined)
  {
    result.password = newcamera.password;
  }
  if(newcamera.uid != undefined)
  {
    result.uid = newcamera.uid;
  }
  return result;
};
function CreateRegisteredDevice(newregisteredDevice)
{
  var result = new Object();
  if(newregisteredDevice.app_id !=undefined)
  {
    result.app_id = newregisteredDevice.app_id;
  }
  else
  {
    result.app_id = "";
  }
  if(newregisteredDevice.disable_notifications !=undefined)
  {
    result.disable_notifications = newregisteredDevice.disable_notifications;
  }
  else
  {
    result.disable_notifications = 0;
  }
  if(newregisteredDevice.platform !=undefined)
  {
    result.platform = newregisteredDevice.platform;
  }
  else
  {
    result.platform = "";
  }
  if(newregisteredDevice.sound !=undefined)
  {
    result.sound = newregisteredDevice.sound;
  }
  else
  {
    result.sound = 0;
  }
  if(newregisteredDevice.token !=undefined)
  {
    result.token = newregisteredDevice.token;
  }
  else
  {
    result.token = "default-somebody null";
  }
  if(newregisteredDevice.update_ts !=undefined)
  {
    result.update_ts = newregisteredDevice.update_ts;
  }
  else
  {
    result.update_ts = 0;
  }
  if(newregisteredDevice.password !=undefined)
  {
    result.password = newregisteredDevice.password;
  }
  else
  {
    result.password = 0;
  }
  if(newregisteredDevice.gateway_name !=undefined)
  {
    result.gateway_name = newregisteredDevice.gateway_name;
  }
  else
  {
    result.gateway_name = "";
  }
  if(newregisteredDevice.ver !=undefined)
  {
    result.ver = newregisteredDevice.ver;
  }
  else
  {
    result.ver = "";
  }
  if(newregisteredDevice.username !=undefined)
  {
    result.username = newregisteredDevice.username;
  }
  else
  {
    result.username = "";
  }
  if(newregisteredDevice.email !=undefined)
  {
    result.email = newregisteredDevice.email;
  }
  else
  {
    result.email = "";
  }
  return result;
};








