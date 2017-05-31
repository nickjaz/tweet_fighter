var totalCount = 10;
function ChangeIt()
{
  var num = Math.ceil( Math.random() * totalCount );
  //grabs random image from source directory as opposed to an array
  document.body.background = 'TFassets/'+num+'.jpg';
// Background norepeat
  document.body.style.backgroundRepeat = 'no-repeat';
  //align image
  document.body.style.backgroundPosition ='top center';
  document.body.style.backgroundSize ='top center';
}
// this line removes linter error
ChangeIt();
