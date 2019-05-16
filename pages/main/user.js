define(['san', 'tool'], function (san, tool) {

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
                    name: '哈哈哈！'
                };
            },
            attached: function () {
                // tool.agileRoute('login/login');
                console.log('user attached0');
                this.data.set('name', '332211')
            },
            detached: function () {
                console.log('user detached1');
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