var fs = require('fs');
var path = "./routes/sdk/error.txt";

if(!fs.existsSync(path))
{
  fs.writeFileSync(path, "");
}

module.exports = 
{
	SaveData: function(val) 
	{
    fs.writeFileSync(path, val);
	}
};