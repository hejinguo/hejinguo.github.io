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
                    columns: [
                        {title: '选择', name: '$check', width: 50, align: 'center'},//$check 代表生成选择框
                        {title: '序号', name: '$index', width: 60, align: 'center'},//$index 代表生成序号列
                        {title: '用户姓名', name: 'userName', width: 120},
                        {title: '登录工号', name: 'loginName', width: 120},
                        {title: '电话号码', name: 'mobilePhone', width: 120},
                        {title: '电子邮箱', name: 'email'},
                        {title: '签到次数', name: 'times', width: 100},
                        {title: '是否合格', name: '$slot', width: 100, align: 'center', slot: 'grade-slot'}
                    ],
                    rows: [
                        {userName: '张三', loginName: 'oa_chandao_1', mobilePhone: '13188888888', email: 'oa_chandao_1@sinoprof.com', times: '5'},
                        {userName: '李四', loginName: 'oa_chandao_2', mobilePhone: '13288888888', email: 'oa_chandao_2@sinoprof.com', times: '4'},
                        {userName: '王五', loginName: 'oa_chandao_3', mobilePhone: '13388888888', email: 'oa_chandao_3@sinoprof.com', times: '6'},
                        {userName: '赵六', loginName: 'oa_chandao_4', mobilePhone: '13488888888', email: 'oa_chandao_4@sinoprof.com', times: '3'},
                        {userName: '斯诺', loginName: 'oa_chandao_5', mobilePhone: '13588888888', email: 'oa_chandao_5@sinoprof.com', times: '7'}
                    ],
                    checkeds:[]
                }
            }
        });
        return pageComponent;
    }

    return {
        init: _init
    };

});