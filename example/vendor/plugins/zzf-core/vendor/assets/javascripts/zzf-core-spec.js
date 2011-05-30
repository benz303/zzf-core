module('Init');

test('jQuery', function(){
  ok($ === jQuery, '$ === jQuery');
});

module('module');

asyncTest('success load', function(){
  
  ok($.module('underscore') === 404, 'underscore is not loaded');
  
  var i = 0;
  
  $.module('underscore', function(){
    ok($.isFunction(_), '_ is loaded');
    ok($.module('underscore') === 200, 'underscore loaded');
    i++;
    ok(i === 1, 'success func is loaded');
  });
  $.module('underscore', function(){
    i++;
    ok(i === 2, 'twice success func is loaded');
    start();
  });
  
  ok($.module('underscore') === 202, 'underscore is loading');
  
  
});

asyncTest('error load', function(){
  
  ok($.module('null') === 404, 'null is not loaded');
  
  $.module('null', null, function(){
    ok($.module('null') === 500, 'module null is error');
    start();
  });
  
  ok($.module('null') === 202, 'null is loading');
  
});

asyncTest('load remote module', function(){

  var remote = {
    name: 'ui',
    url: 'https://ajax.googleapis.com/ajax/libs/jqueryui/1/jquery-ui.min.js'
  };
  
  ok($.module(remote) === 404, 'remote is not loaded');
  
  $.module(remote, function(){
    ok((typeof $.ui === 'object'), '$.ui is loaded');
    ok($.module(remote) === 200, 'remote loaded');
    ok($.module('ui') === 200, 'ui is loaded');
    start();
  });
  
  ok($.module(remote) === 202, 'remote is loading');

});
