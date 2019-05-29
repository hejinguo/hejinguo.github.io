requirejs.config({
        //urlArgs: "bust=" + (new Date()).getTime(),
        baseUrl: 'resources/js',
        paths: {
            // the left side is the module ID,
            // the right side is the path to
            // the jQuery file, relative to baseUrl.
            // Also, the path should NOT include
            // the '.js' file extension. This example
            // is using jQuery 1.9.0 located at
            // js/lib/jquery-1.9.0.js, relative to
            // the HTML page.
            'jquery': 'lib/jquery/jquery.min',
            'jquery.bootstrap': 'lib/bootstrap/bootstrap.min',
            'san': 'lib/san/san.min',
            'text': 'lib/require/text',
            'tool': 'agile/tool',
            'common.components': 'agile/common.components'
        },
        shim: {
            "jquery.bootstrap": {
                deps: ["jquery"]
            }
        }
    }
);

requirejs(['jquery', 'text', 'jquery.bootstrap'], function ($) {
	var page = null;//路由Hash转场前的Page
	
    function _changeHashEvent() {
        //page && page.detach();//开发者在合适的时机手动去调用实例的 attach、detach 等方法。【动态子组件时:this.layer.dispose();】
        if (window.location.hash) {//如果通过Hash路由访问的时候
            var _target_script = '../../pages/' + window.location.hash.substr(1);
            var _target_template = 'text!../../pages/' + window.location.hash.substr(1) + '.tpl';

            requirejs([_target_script, _target_template, 'common.components'], function (defineComponent, templates, components) {
				page && page.detach();//开发者在合适的时机手动去调用实例的 attach、detach 等方法。
				//在这里清理page避免页面卡白
                var pageComponent = defineComponent.init(templates, components);
                page = new pageComponent();
                page.attach(document.body);

            });
        } else {//如果通过非Hash路由访问的时候
            var _target_script = '../../pages/error/404';
            var _target_template = 'text!../../pages/error/404.tpl';

            requirejs([_target_script, _target_template, 'common.components'], function (defineComponent, templates, components) {
				page && page.detach();//开发者在合适的时机手动去调用实例的 attach、detach 等方法。
				//在这里清理page避免页面卡白
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