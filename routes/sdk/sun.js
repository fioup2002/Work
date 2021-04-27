var fs = require('fs');
var path = "./routes/sdk/sun.json";
var sunsetting = new Object();

if(fs.existsSync(path))
{
	sunsetting = JSON.parse(fs.readFileSync(path, "utf8"));
}
else
{
	sunsetting.enable = 0;
  sunsetting.longitude = "";
  sunsetting.latitude = "";
  sunsetting.sunrise = new Array(9);
  sunsetting.sunset = new Array(9);
}


module.exports = 
{
  SaveData: function()
	{
    fs.writeFileSync(path, JSON.stringify(sunsetting, null, 2));
	},
  SetSunEnable: function(val) 
	{
    sunsetting.enable = val;
    this.SaveData();
	},
  GetSunEnable: function() 
	{
    this.SaveData();
    return sunsetting.enable;
	},
  GetSunLongitude: function()
  {
    this.SaveData();
    return sunsetting.longitude;
  },
  SetSunLongitude: function(val) 
	{
    sunsetting.longitude = val;
    this.SaveData();
	},
  GetSunLatitude: function()
  {
    this.SaveData();
    return sunsetting.latitude;
  },
  SetSunLatitude: function(val) 
	{
    sunsetting.latitude = val;
    this.SaveData();
	},
  GetSunriseTime: function(index) 
	{
    if(sunsetting.sunrise[index] == null)
    {
      sunsetting.sunrise[index] = 0;
    }
    this.SaveData();
    return sunsetting.sunrise[index];
	},
  SetSunriseTime: function(index,val) 
	{
    sunsetting.sunrise[index] = val;
    this.SaveData();
	},
  GetSunsetTime: function(index) 
	{
    if(sunsetting.sunset[index] == null)
    {
      sunsetting.sunset[index] = 0;
    }
    this.SaveData();
    return sunsetting.sunset[index];
	},
  SetSunsetTime: function(index,val) 
	{
    sunsetting.sunset[index] = val;
    this.SaveData();
	}
};