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
					showLargeDialog: false,
					showSmallDialog: false
				};
			},
			_doOpenLargeModalDialog:function(){				
				this.data.set('showLargeDialog',true);
			},
			_doOpenSmallModalDialog:function(){
				this.data.set('showSmallDialog',true);
			}
        });
        return pageComponent;
    }

    return {
        init: _init
    };

});