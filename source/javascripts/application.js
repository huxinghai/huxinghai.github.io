$(function(){
	var canvas=document.getElementById("myavatar");
	var g=canvas.getContext("2d");      
	var img=new Image()
	img.src="/images/avatar.jpeg"
  	img.onload = function(){
		g.drawImage(img, 0, 0, 420, 420, 0, 0 ,160, 160);        
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
})