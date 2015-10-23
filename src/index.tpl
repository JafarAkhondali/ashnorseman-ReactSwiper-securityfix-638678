<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="apple-touch-icon" href="">
    <link rel="shortcut icon" href="">
    <title>Swipe</title>
  </head>
  <body>
    <div id="app"></div>
    {% for (var chunk in o.htmlWebpackPlugin.files.chunks) { %}
    <script src="{%= o.htmlWebpackPlugin.files.chunks[chunk].entry %}"></script>
    {% } %}
  </body>
</html>