function starPattern(n){
  for (var i=n; i>0; i--)
  {
    var str = '';
    for (var j=0; j<i; j++){
      str = str + '*';
      }
      console.log(str);
      
      var para = document.createElement("p");
      para.innerHTML = str;
      document.body.appendChild(para);
  }
}

starPattern(10);