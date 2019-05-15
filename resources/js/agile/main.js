define(function (require) {
    var page = null;//路由Hash转场前的Page

    function _changeHashEvent() {
        page && page.detach();//开发者在合适的时机手动去调用实例的 attach、detach 等方法。
        if (window.location.hash) {//如果通过Hash路由访问的时候
            var _target_script = '../../pages/' + window.location.hash.substr(1);
            var _target_template = 'text!../../pages/' + window.location.hash.substr(1) + '.tpl';

            requirejs([_target_script, _target_template, 'common.components'], function (defineComponent, templates, components) {
                var pageComponent = defineComponent.init(templates, components);
                page = new pageComponent();
                page.attach(document.body);

            });
        } else {//如果通过非Hash路由访问的时候
            /*var components = require('./common.components');*/
            var _target_script = '../../pages/error/404';
            var _target_template = 'text!../../pages/error/404.tpl';

            requirejs([_target_script, _target_template, 'common.components'], function (defineComponent, templates, components) {
                var pageComponent = defineComponent.init(templates, components);
                page = new pageComponent();
                page.attach(document.body);
            });
        }
    }

    window.onhashchange = function () {
        _changeHashEvent();
    }

    _changeHashEvent();
});