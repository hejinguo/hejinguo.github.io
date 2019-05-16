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
			_changePaginationEvent:function(data){
				alert("选择翻页后的回调："+JSON.stringify(data));				
			}
        });
        return pageComponent;
    }

    return {
        init: _init
    };

});