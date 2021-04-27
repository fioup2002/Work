var fs = require('fs');
var path = "./routes/sdk/interface.json";
var ifaces = new Object();

if(fs.existsSync(path))
{
	ifaces = JSON.parse(fs.readFileSync(path, "utf8"));
  fs.writeFileSync(path, JSON.stringify(ifaces, null, 2));
}
else
{
	ifaces = new Array();
  fs.writeFileSync(path, JSON.stringify(ifaces, null, 2));
}

module.exports = 
{
	GetInterface: function() 
	{
		this.SaveData();
    return ifaces;
	},
  SaveData: function()
	{
		fs.writeFileSync(path, JSON.stringify(ifaces, null, 2));
	}
};