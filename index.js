
  function sleep(miliseconds) {
    var currentTime = new Date().getTime();
 
    while (currentTime + miliseconds >= new Date().getTime()) {
    }
 }

 document.getElementById("firsth6").style.fontSize="60px";
 document.getElementById("firsth6").style.color="#ddd";

$(document).ready(function(){
    $('.ah2').hover(function(){
      
      document.getElementById("firsth6").innerHTML="Are you ready to discover the ultimate secret?";
      },
      function(){
        
        document.getElementById("firsth6").innerHTML="";
        
         
        
      }
      
      
      );
      
      
      ;
  });
  document.getElementById("secoundh6").style.fontSize="60px";
        document.getElementById("secoundh6").style.color="#ddd";
       
  $(document).ready(function(){
    $('.ah3').hover(function(){
      
      document.getElementById("secoundh6").innerHTML="  We stand on the shoulders of our ancestors";
      },
      function(){
        
        document.getElementById("secoundh6").innerHTML="";
        
        
         
      });
      
      
      ;
  });
  document.getElementById("thirdh6").style.fontSize="60px";
  document.getElementById("thirdh6").style.color="#ddd";
  $(document).ready(function(){
      
    $('.ah4').hover(function(){
      
      document.getElementById("thirdh6").innerHTML=" Add a little ... secret to your cooking";
      },
      function(){
        
        document.getElementById("thirdh6").innerHTML="";
       
       
         
      });
      
      
      ;
  });

  $(document).ready(function(){
    $('#navInfo').hover(function(){
      
      document.getElementById("info").style.display=" block";
      },
     );
    
  });


// document.getElementById("firsth6").innerHTML="Hello Dolly";
// document.getElementById("secoundh6").innerHTML="Hello Dolly";
// document.getElementById("thirdh6").innerHTML="Hello Dolly";
