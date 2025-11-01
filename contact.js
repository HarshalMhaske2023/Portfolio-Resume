(function(){
  angular.module('portfolioApp',[])
    .controller('ContactCtrl', ['$window', '$scope', function($window, $scope){
      const STORAGE_KEY = 'contactMessages';
      const vm = this;
      vm.showComposer = false;
      vm.showMessages = true;
      vm.origin = 'email';
      vm.form = { name:'', contact:'', message:'' };
      vm.messages = [];

      function loadMessages(){
        try{ const raw = $window.localStorage.getItem(STORAGE_KEY); vm.messages = raw ? JSON.parse(raw) : []; }catch(e){ vm.messages = []; }
      }

      function saveMessages(){
        try{ $window.localStorage.setItem(STORAGE_KEY, JSON.stringify(vm.messages)); }catch(e){}
      }

      vm.openComposer = function(origin, contactValue){
        vm.origin = origin;
        vm.form.contact = contactValue || '';
        vm.form.name = '';
        vm.form.message = '';
        vm.showComposer = true;
      };

      vm.toggleMessages = function(){ vm.showMessages = !vm.showMessages; };

      vm.addSample = function(){
        const sample = { name:'Demo User', contact:'demo@example.com', message:'This is a sample saved message.\nYou can toggle visibility with the Show/Hide button.', origin:'email', date: new Date().toISOString() };
        vm.messages.unshift(sample);
        saveMessages();
        vm.showMessages = true;
        $scope.$applyAsync();
      };

      vm.openMail = function(){
        const to = vm.form.contact || (vm.origin === 'email' ? 'harshalmhaske09@gmail.com' : '');
        const subject = encodeURIComponent('Message from portfolio site');
        const body = encodeURIComponent((vm.form.name? (vm.form.name + '\n\n') : '') + (vm.form.message || ''));
        $window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
      };

      vm.saveMsg = function(){
        const entry = { name: vm.form.name || 'Anonymous', contact: vm.form.contact || '', message: vm.form.message || '', origin: vm.origin, date: new Date().toISOString() };
        vm.messages.unshift(entry);
        saveMessages();
        vm.showComposer = false;
      };

      vm.clearMessages = function(){
        if(!$window.confirm('Clear all saved messages?')) return;
        vm.messages = [];
        saveMessages();
      };

      vm.cancel = function(){ vm.showComposer = false; };

      // init
      loadMessages();
    }]);
})();

