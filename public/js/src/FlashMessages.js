/**
 * Handling flash messages client-side, and add some eye candies too ;).
 */
define('app/FlashMessages',
  ['jquery', 'underscore'],
  function   ($, _) {
  'use strict';

  var FlashMessage = function FlashMessage(options){
    options = options || {};
    return this
      .init(options)
      .bind()
    ;
  };
  FlashMessage.prototype = {
    VERSION: '1.0.0',
    NAME: 'FlashMessage',
    defaultOptions: {
      element: false,
      tpls: {
        closeButton: '<a href="#" class="close">fermer</a>'
      },
      events: {
        root: {
        },
        closeButton: {
          'mouseover' : 'close'
        }
      }
    },

    init: function flashMessageInit(options){
      var self = this;
      this.options = $.extend(true, {}, this.defaultOptions, options);
      this.options.type = $(options.element).attr('type');
      this.$el = $(this.options.element);
      this.$closeButton = $(_.template(self.options.tpls.closeButton)());
      this.$el.append(this.$closeButton);
      return this;
    },

    bind: function flashMessageBind(){
      var self = this;
      var callback = false;
      _.each(this.options.events,function(actions, index){
        if(_.isObject(actions) && _.size(actions) > 0){
          if(index === 'root'){
            _.each(actions, function(actionName, event){
              callback = self.getEventCallback.call(self, actionName);
              if(callback){ self.$el.on(event, callback); }
            });
          }else{
            _.each(actions, function(actionName, event){
              callback = self.getEventCallback.call(self, actionName);
              if(callback){
                self['$'+index].on(event, self.getEventCallback.call(self, actionName));
              }
            });
          }
        }
      });
    },

    getEventCallback: function flashMessageGetEventCallback(actionName){
      var self = this;
      return function(event){
        return self[actionName + self.NAME](event, self);
      };
    },

    closeFlashMessage: function closeFlashMessage(event, root){
      root.$el.slideUp();
    }

  };

  var FlashMessages = function FlashMessages(options){
    console.info('FlashMessages loaded');
    options = options || {};
    return this.init(options);
  };

  FlashMessages.prototype = {
    VERSION: '1.0.0',
    NAME: 'FlashMessages',
    defaultOptions: {
      base: $('.flash-messages'),
      messageElementSelector: '.flash-message'
    },

    init: function flashMessagesInit(options){
      var self = this;
      this.messages = [];
      this.options = $.extend(true, {}, this.defaultOptions, options);
      this.options.base.find(this.options.messageElementSelector).each(
        function(index, element){
          self.messages.push(new FlashMessage({element: element}));
      });
    }

  };

  return FlashMessages;
});