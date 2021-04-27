var fs = require('fs');
var path = "./routes/sdk/checkbox.json";
var checkbox = 0;

if(fs.existsSync(path))
{
	checkbox = JSON.parse(fs.readFileSync(path, "utf8"));
}
else
{
	checkbox = 0;
}


module.exports = 
{
	GetCheckbox: function() 
	{
		this.SaveData();
    return checkbox;
	},
  SaveData: function()
	{
		fs.writeFileSync(path, JSON.stringify(checkbox, null, 2));
	},
  SetCheckbox: function(val) 
	{
    checkbox = val;
		this.SaveData();
	}
};