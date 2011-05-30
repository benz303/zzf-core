//= require jquery

// zzf-core v0.0.1
var JS_PATH = '/assets';

// module
(function($){
  var loaded = ['jquery'], loading = [], failed = [], queue = {};
  var info = {
    jquery: {
      status: 200,
      url: JS_PATH + '/jquery.js',
      success: [],
      error: []
    }
  };
  
  function load_status(module){
    if(typeof info[module] !== 'undefined'){
      return info[module].status;
    }else{
      return 404;
    }
  }
  
  function queue_new(module){
    if(typeof module !== 'string'){
      name = module.name;
      url = module.url;
    }else{
      name = module;
      url = JS_PATH + '/' + module + '.js';
    }
    info[name] = {
      status: 202,
      url: url,
      success: [],
      error: []
    };
    return $.getScript(url, function(){
      info[name].status = 200;
    }).error(function(){
      info[name].status = 500;
    }).complete(function(){
      queue_run(name);
    });
  }
  
  function queue_push(module, success, error){
    if(typeof module !== 'string'){
      name = module.name;
    }else{
      name = module;
    }
    if(typeof info[name] === 'undefined'){
      queue_new(module);
    }
    if($.isFunction(success)){
      info[name].success.push(success);
    }
    if($.isFunction(error)){
      info[name].error.push(error);
    }
    return queue_run(name);
  }
  
  function queue_run(module){
    var status = load_status(module);
    if(status === 200 && info[module].success.length > 0){
      $.each(info[module].success, function(i, func){
        func();
      });
      info[module].success = [];
      return true;
    }
    if(status === 500 && info[module].error.length > 0){
      $.each(info[module].error, function(i, func){
        func();
      });
      info[module].error = [];
      return true;
    }
    return false;
  }
  
  $.module = function(module, success, error){
    if(typeof module === 'object'){
      name = module.name;
    }else{
      name = module;
    }
    if($.isFunction(success) || $.isFunction(error)){
      queue_push(module, success, error);
    }
    return load_status(name);
  };
})($);
