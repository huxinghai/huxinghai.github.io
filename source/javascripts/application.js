
window.detectmob = function() { 
 if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)
 ){
    return true;
  }
 else {
    return false;
  }
}

$(function(){ 
  var canvas=document.getElementById("myavatar");
  var g=canvas.getContext("2d");      
  var img=new Image()
  img.src="/images/avatar.gif"
  if(!detectmob()){
    img.onload = function(){
      g.drawImage(img, 0, 0, 160, 160, 0, 0 ,160, 160);        
      var i = 0.1
      g.lineWidth = 2           
      g.globalAlpha=0.5;     
      var clear_id = setInterval(function(){            
        g.beginPath();       
        g.strokeStyle = '#'+Math.floor(Math.random()*16777215).toString(16);            
        g.arc(80, 80, 80, Math.PI * (i - 0.1), Math.PI * i)
        g.stroke();
          if(i >= 2) return clearInterval(clear_id);
          i += 0.1
      }, 50)
    }
  }
})