var fs = require('fs');
var path = "./routes/sdk/config.json";
var config = new Array();

if(fs.existsSync(path))
{
	config = JSON.parse(fs.readFileSync(path, "utf8"));
}
else
{
	config = new Array();
}

module.exports = 
{
  GetConfig: function(uid,key)
	{
		var findconfig = false;
    var result = 0;
    for(var i=0;i<config.length;i++)
    {
      if(config[i].uid == uid)
      {
        findconfig = true;
        var findpair = false;
        for(var j=0;j<config[i].pair.length;j++)
        {
          if(config[i].pair[j].key == key)
          {
            result = config[i].pair[j];
            findpair = true;
          }
        }
        if(!findpair)
        {
          var newpair = InitPair(key,"0");
          config[i].pair.push(newpair);
          result = InitPair(key,"0");
        }
      }
    }
    if(!findconfig)
    {
      var newconfig = InitConfig(uid,key,"0");
      config.push(newconfig);
      result = InitPair(key,"0");
    }
    this.SaveData();
    return result;
	},
  SaveData: function()
	{
		fs.writeFileSync(path, JSON.stringify(config, null, 2));
	},
  SetConfig: function(uid,key,val)
  {
    var findconfig = false;
    for(var i=0;i<config.length;i++)
    {
      if(config[i].uid == uid)
      {
        findconfig = true;
        var findpair = false;
        for(var j=0;j<config[i].pair.length;j++)
        {
          if(config[i].pair[j].key == key)
          {
            config[i].pair[j].val = val;
            findpair = true;
          }
        }
        if(!findpair)
        {
          var newpair = InitPair(key,val);
          config[i].pair.push(newpair);
        }
      }
    }
    if(!findconfig)
    {
      var newconfig = InitConfig(uid,key,val);
      config.push(newconfig);
    }
    this.SaveData();
  }
};
function InitConfig(uid,key,val)
{
  var result = new Object();
  result.uid = uid;
  result.pair = new Array();
  var pair = InitPair(key,val);
  result.pair.push(pair);
  return result;
};
function InitPair(key,val)
{
  var result = new Object();
  result.key = key;
  result.val = val;
  return result;
};


