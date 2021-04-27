var fs = require('fs');
var path = "./routes/sdk/time.json";
var time = new Object();

if(fs.existsSync(path))
{
	time = JSON.parse(fs.readFileSync(path, "utf8"));
}
else
{
	time.synctime = 11;
  time.timezone = 47;
  time.ntpsever = "uk.pool.ntp.org";
}

module.exports = 
{
	GetTimzone: function() 
	{
		this.SaveData();
    return time.timezone;
	},
  GetSynctime: function() 
	{
		this.SaveData();
    return time.synctime;
	},
  GetNTPSever: function() 
	{
		this.SaveData();
    return time.ntpsever;
	},
  SaveData: function()
	{
		fs.writeFileSync(path, JSON.stringify(time, null, 2));
	}
};