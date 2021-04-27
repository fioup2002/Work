var fs = require('fs');
var path = "./routes/sdk/userdata.json";
var userdata = new Object();

if(fs.existsSync(path))
{
	userdata = JSON.parse(fs.readFileSync(path, "utf8"));
}
else
{
	userdata.targetDatas = new Array();
  userdata.targetScenes = new Array();
}

module.exports = 
{
	GetUserData: function() 
	{
		this.SaveData();
    return userdata;
	},
  SaveData: function()
	{
		fs.writeFileSync(path, JSON.stringify(userdata, null, 2));
	},
  SetUserData: function(val) 
	{
    userdata = val;
		this.SaveData();
	}
};