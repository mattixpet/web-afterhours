<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <link rel="shortcut icon" href="img/favicon.ico">
    <!-- for search engines/facebook-->
    <link rel="image_src" href="img/aftermidnight.jpg">
    <meta name="description" content="enjoy after hours only">
    <title>after hours</title>
  </head>
  <body><?php include_once("../static/php/analyticstracking.php") ?>
    <div class="wrapper">
      <main role="main">
        <div class="smallwrap notafterhours">
          <h1 id="notafterhours" class="hidden">it's not after hours now is it?</h1>
        </div>
        <div class="pic">
          <figure><img id="afterpic" src="img/notafterhours.jpg" alt="notafterhours"></figure>
        </div>
        <audio id="aftersong">
          <source id="aftersongsource" type="audio/mpeg"> 
          get with the times bro!
        </audio>
      </main>
      <footer class="smallfooter">
        <div class="container"><a href="about.php" target="_blank">about</a><a href="contact.php" target="_blank">contact</a></div>
      </footer>
    </div>
    <script src="js/update.js" type="text/javascript"></script>
  </body>
</html>