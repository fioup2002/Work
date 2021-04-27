var fs = require('fs');
var path = "./routes/sdk/device.json";
var device = new Array();
var maxlength = 250
var comparearray = new Array();
var define = require("./define.js");
var ifaces = require("./interface.js");

if(fs.existsSync(path))
{
	device = JSON.parse(fs.readFileSync(path, "utf8"));
  /*reannange device without duplicate*/
  // for(var i=0;i<device.length;i++)
  // {
    // if(device[i].channel != undefined)
    // {
      // for(var j=0;j<device[i].channel.length;j++)
      // {
        // device[i].channel[j].lastbeattime = "2018-1-1 0:0:0";
        // if(IsDuplicateChannel(device[i].channel[j].functype,device[i].channel[j].ctrltype))
        // {
          // device[i].channel.splice(j,1);
          // j--;
        // }
      // }
      // if(device[i].channel.length == 0)
      // {
        // device.splice(i,1);
        // i--;
      // }
    // }
    // else
    // {
      // device.splice(i,1);
      // i--;
    // }
    // device[i].uid = 257+i;
    // if(device[i].uid == 257)
    // {
      // device[i].home_id = GetInterface(3);
      // device[i].pan27_info = new Object();
      // device[i].pan27_info.modbus_is_slave = 0;
      // device[i].pan27_info.modbus_addr = 1;
    // }
    // else
    // {
      // if(i<=1)
      // {
        // device[i].home_id = GetInterface(3);
      // }
      // else
      // {
        // device[i].home_id = GetInterface(1);
      // }
    // }
    // /*foece zwave homeid*/
    // device[i].home_id = GetInterface(1);
  // }
  fs.writeFileSync(path, JSON.stringify(device, null, 2));
}
else
{
	device = new Array();
}

module.exports = 
{
	GetDevice: function(uid) 
	{
		this.SaveData();
    if(uid == 256)
    {
      return device;
    }
    else
    {
      var result = new Array();
      for(var i=0;i<device.length;i++)
      {
        if(device[i].uid == uid)
        {
          result.push(device[i]);
        }
      }
      return result;
    }
	},
  SaveData: function()
	{
		fs.writeFileSync(path, JSON.stringify(device, null, 2));
	},
  GetOneDeviceChannel: function(uid,chid)
  {
    var result = new Object();
    for(var i=0;i<device.length;i++)
    {
      if(device[i].uid == uid)
      {
        for(var j=0;j<device[i].channel.length;j++)
        {
          if(device[i].channel[j].chid == chid)
          {
            result = JSON.parse(JSON.stringify(device[i]));
            result.channel.length = 0;
            result.channel.push(JSON.parse(JSON.stringify(device[i].channel[j])))
          }
        }
      }
    }
    return result;
  },
  UpdateDevice: function(val,chid,uid)
  {
    for(var i=0;i<device.length;i++)
    {
      if(device[i].uid == uid)
      {
        for(var j=0;j<device[i].channel.length;j++)
        {
          if(device[i].channel[j].chid == chid)
          {
            /*Update value*/
            if(val != 0)
            {
              device[i].channel[j].Dim_ON_Value = val;
              if(device[i].channel[j].functype == 11 || device[i].channel[j].functype == 22)
              {
                device[i].channel[j].sensorvalue = Math.floor((Math.random() * 1000));
              }
              else if(device[i].channel[j].functype == 27 || device[i].channel[j].functype == 28)
              {
                device[i].channel[j].sensorvalue = val;
              }
              else if(device[i].channel[j].functype == 29)
              {
                if(device[i].channel[j].sensorvalue == 100)
                {
                  device[i].channel[j].sensorvalue = 0;
                }
                else
                {
                  device[i].channel[j].sensorvalue = 100;
                }
              }
              else if(device[i].channel[j].functype == 41)
              {
                device[i].channel[j].switch_color.comp_value[0].value = 0;
                device[i].channel[j].switch_color.comp_value[1].value = 0;
                var random = Math.floor((Math.random() * 3));
                if(random == 0)
                {
                  device[i].channel[j].switch_color.comp_value[2].value = 0;
                  device[i].channel[j].switch_color.comp_value[3].value = 255;
                  device[i].channel[j].switch_color.comp_value[4].value = Math.floor((Math.random() * 255));
                }
                else if(random == 1)
                {
                  device[i].channel[j].switch_color.comp_value[2].value = 0;
                  device[i].channel[j].switch_color.comp_value[3].value = Math.floor((Math.random() * 255));
                  device[i].channel[j].switch_color.comp_value[4].value = 255;
                }
                else if(random == 2)
                {
                  device[i].channel[j].switch_color.comp_value[0].value = Math.floor((Math.random() * 255));
                  device[i].channel[j].switch_color.comp_value[1].value = Math.floor((Math.random() * 255));
                  device[i].channel[j].switch_color.comp_value[2].value = 0;
                  device[i].channel[j].switch_color.comp_value[3].value = 0;
                  device[i].channel[j].switch_color.comp_value[4].value = 0;
                }
                // else if(random == 2)
                // {
                  // device[i].channel[j].switch_color.comp_value[2].value = 255;
                  // device[i].channel[j].switch_color.comp_value[3].value = 0;
                  // device[i].channel[j].switch_color.comp_value[4].value = Math.floor((Math.random() * 255));
                // }
                // else if(random == 3)
                // {
                  // device[i].channel[j].switch_color.comp_value[2].value = Math.floor((Math.random() * 255));
                  // device[i].channel[j].switch_color.comp_value[3].value = 0;
                  // device[i].channel[j].switch_color.comp_value[4].value = 255;
                // }
                // else if(random == 4)
                // {
                  // device[i].channel[j].switch_color.comp_value[2].value = Math.floor((Math.random() * 255));
                  // device[i].channel[j].switch_color.comp_value[3].value = 255;
                  // device[i].channel[j].switch_color.comp_value[4].value = 0;
                // }
                // else if(random == 5)
                // {
                  // device[i].channel[j].switch_color.comp_value[2].value = 255;
                  // device[i].channel[j].switch_color.comp_value[3].value = Math.floor((Math.random() * 255));
                  // device[i].channel[j].switch_color.comp_value[4].value = 0;
                // }
                // else if(random == 6)
                // {
                  // device[i].channel[j].switch_color.comp_value[0].value = Math.floor((Math.random() * 255));
                  // device[i].channel[j].switch_color.comp_value[1].value = Math.floor((Math.random() * 255));
                  // device[i].channel[j].switch_color.comp_value[2].value = 0;
                  // device[i].channel[j].switch_color.comp_value[3].value = 0;
                  // device[i].channel[j].switch_color.comp_value[4].value = 0;
                // }
                
              }
              else
              {
                device[i].channel[j].sensorvalue = Math.floor((Math.random() * 100));
              }     
              if(device[i].channel[j].meter!=undefined)
              {
                device[i].channel[j].meter.watt = device[i].channel[j].sensorvalue;
              }
            }
            else
            {
              device[i].channel[j].sensorvalue = 0;
              if(device[i].channel[j].meter!=undefined)
              {
                device[i].channel[j].meter.watt = device[i].channel[j].sensorvalue;
              }
            }
            device[i].channel[j].basicvalue = val;
            if(device[i].channel[j].functype == 29)
            {
              device[i].channel[j].basicvalue = 0;
            }
            device[i].channel[j].lastbeattime = GetCurrentTime();
            device[i].channel[j].lastbeattime_utc = (Date.parse(GetCurrentTime())).valueOf()/1000;
          }
        }
      }
    }
    this.SaveData();
  },
  UpdateColor: function(val,uid)
  {
    for(var i=0;i<device.length;i++)
    {
      if(device[i].uid == uid)
      {
        if(val[0] == 1)
        {
          if(val[1] == 0)
          {
            device[i].channel[0].switch_color.comp_value[0].value = val[2];
          }
          else
          {
            device[i].channel[0].switch_color.comp_value[1].value = val[2];
          }
        }
        else
        {
          device[i].channel[0].switch_color.comp_value[0].value = val[2];
          device[i].channel[0].switch_color.comp_value[1].value = val[4];
          device[i].channel[0].switch_color.comp_value[2].value = val[6];
          device[i].channel[0].switch_color.comp_value[3].value = val[8];
          device[i].channel[0].switch_color.comp_value[4].value = val[10];
        }
      }
    }
    this.SaveData();
  },
  UpdateSensorValue: function(val,chid,uid,unit)
  {
    for(var i=0;i<device.length;i++)
    {
      if(device[i].uid == uid)
      {
        for(var j=0;j<device[i].channel.length;j++)
        {
          if(device[i].channel[j].chid == chid)
          {
            device[i].channel[j].sensorvalue = val;
            device[i].channel[j].lastbeattime = GetCurrentTime();
            device[i].channel[j].sensorunit = unit;
          }
        }
      }
    }
    this.SaveData();
  },
  UpdateTamperNotify: function(val,chid,uid)
  {
    for(var i=0;i<device.length;i++)
    {
      if(device[i].uid == uid)
      {
        for(var j=0;j<device[i].channel.length;j++)
        {
          if(device[i].channel[j].chid == chid)
          {
            device[i].channel[j].tampernotify = val;
          }
        }
      }
    }
    this.SaveData();
  },
  UpdateBatteryNotify: function(val,chid,uid)
  {
    for(var i=0;i<device.length;i++)
    {
      if(device[i].uid == uid)
      {
        for(var j=0;j<device[i].channel.length;j++)
        {
          if(device[i].channel[j].chid == chid)
          {
            device[i].channel[j].lowbattnotify = val;
          }
        }
      }
    }
    this.SaveData();
  },
  UpdateMainScene: function(val,chid,uid)
  {
    for(var i=0;i<device.length;i++)
    {
      if(device[i].uid == uid)
      {
        for(var j=0;j<device[i].channel.length;j++)
        {
          if(device[i].channel[j].chid == chid)
          {
            device[i].channel[j].mainscene = val;
          }
        }
      }
    }
    this.SaveData();
  },
  UpdateLowBattery: function(val,uid)
  {
    for(var i=0;i<device.length;i++)
    {
      if(device[i].uid == uid)
      {
        device[i].battery = val;
      }
    }
    this.SaveData();
  },
  SetControlType: function(uid,chid,val)
  {
    for(var i=0;i<device.length;i++)
    {
      if(device[i].uid == uid)
      {
        for(var j=0;j<device[i].channel.length;j++)
        {
          if(device[i].channel[j].chid == chid)
          {
            device[i].channel[j].ctrltype = val;
          }
        }
      }
    }
    this.SaveData();
  },
  SetFunctionType: function(uid,chid,val)
  {
    for(var i=0;i<device.length;i++)
    {
      if(device[i].uid == uid)
      {
        for(var j=0;j<device[i].channel.length;j++)
        {
          if(device[i].channel[j].chid == chid)
          {
            device[i].channel[j].functype = val;
          }
        }
      }
    }
    this.SaveData();
  }
};
function CreateChannel(chid)
{
  var channel = new Object();
  channel.basicvalue = 0;
  channel.chid = chid;
  channel.ctrltype = 23;
  channel.functype = 23;
  channel.lastbeattime = GetCurrentTime();
  channel.lastbeattime_utc = 0;
  channel.name = "Wall Switch";
  channel.sensorstate = 0;
  channel.sensorunit = 0;
  channel.sensorvalue = 0;
  return channel;
};
function GetCurrentTime()
{
  var result = 0;
  var today = new Date();
  var today_year = today.getFullYear();
  var today_month = today.getMonth()+1;
  var today_date = today.getDate();
  var today_hours = today.getHours();
  var today_minutes = today.getMinutes();
  var today_seconds = today.getSeconds();
  var current = today_year+"-"+today_month+"-"+today_date+" "+today_hours+":"+today_minutes+":"+today_seconds;
  return current;
};
function IsDuplicateChannel(functype,ctrltype)
{
  var result = false;
  if(comparearray[functype+"_"+ctrltype])
  {
    result = true;
  }
  else
  {
    comparearray[functype+"_"+ctrltype] = true;
  }
  return result;
};
function GetInterface(val)
{
  var homeids = ifaces.GetInterface();
  var result = "";
  for(var i=0;i<homeids.length;i++)
  {
    if(homeids[i].protocol == val)
    {
      result = homeids[i].home_id;
    }
  }
  if(result.length == 0)
  {
    for(var i=0;i<homeids.length;i++)
    {
      if(homeids[i].protocol == 1)
      {
        result = homeids[i].home_id;
      }
    }
  }
  return result;
};













