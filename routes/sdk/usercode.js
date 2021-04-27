var fs = require('fs');
var path = "./routes/sdk/usercode.json";
var usercode = new Array();

if(fs.existsSync(path))
{
	usercode = JSON.parse(fs.readFileSync(path, "utf8"));
}
else
{
	usercode = new Array();
}

module.exports = 
{
  GetUserCode: function(uid,key)
	{
		var result = "";
    var findusercode = false;
    for(var i=0;i<usercode.length;i++)
    {
      if(usercode[i].uid == uid)
      {
        findusercode = true;
        var findpair = false;     
        for(var j=0;j<usercode[i].pair.length;j++)
        {
          if(usercode[i].pair[j].key == key)
          {
            findpair = true;
            result = usercode[i].pair[j];
          }
        }
        if(!findpair)
        {
          var newpair = InitPair(key,"");
          usercode[i].pair.push(newpair);
          result = InitPair(key,"");
        }
      }
    }
    if(!findusercode)
    {
      var newusercode = InitUserCode(uid,key,"");
      usercode.push(newusercode);
      result = InitPair(key,"");
    }
    this.SaveData();
    if(result.code.length == 0)
    {
      result = new Array();
    }
    else
    {
      var temp = new Array();
      for(var i=0;i<result.code.length;i++)
      {
        var pair = InitPair(i+"",result.code[i].charCodeAt(0)+"");
        temp.push(pair);
      }
      result = temp;
    }
    return result;
	},
  SaveData: function()
	{
		fs.writeFileSync(path, JSON.stringify(usercode, null, 2));
	},
  SetUserCode: function(uid,key,val)
  {
    var result = "";
    var findusercode = false;
    for(var i=0;i<usercode.length;i++)
    {
      if(usercode[i].uid == uid)
      {
        findusercode = true;
        var findpair = false;     
        for(var j=0;j<usercode[i].pair.length;j++)
        {
          if(usercode[i].pair[j].key == key)
          {
            findpair = true;
            usercode[i].pair[j].code = val;
          }
        }
        if(!findpair)
        {
          var newpair = InitPair(key,val);
          usercode[i].pair.push(newpair);
          result = InitPair(key,val);
        }
      }
    }
    if(!findusercode)
    {
      var newusercode = InitUserCode(uid,key,val);
      usercode.push(newusercode);
    }
    this.SaveData();
  }
};
function InitUserCode(uid,key,val)
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
  result.code = val;
  return result;
};
