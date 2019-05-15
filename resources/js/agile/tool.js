/**
 * 常用的简化方法封装(agile敏捷的)
 */
define(function () {

    /**
     * 路由到目标组件页面
     * @param _targetHash
     */
    var agileRoute = function (_targetHash) {
        window.location.hash = _targetHash;//'login/login';
    }

    return {
        agileRoute: agileRoute
    };
})