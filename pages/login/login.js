define(['san'], function (san) {

    /**
     * 初始化页面的方法
     * @param templates
     * @param components
     * @private
     */
    function _init(templates, components) {
        var pageComponent = san.defineComponent({
            template: templates,
            components: components,
            initData: function () {
                return {
                    name: '000000'
                };
            },
            attached: function () {
                $('body').css('background','#DDD');
                console.log('login attached2');
            },
            detached: function () {
                $('body').css('background','#FFF');
                console.log('login detached3');

            }
        });

        return pageComponent;
        // var page = new pageComponent();
        // page.attach(document.body);
    }

    return {
        init: _init
    };

});