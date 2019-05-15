/**
 * 基于Bootstrap的常用UI组件(agile敏捷的)
 */
define(['san'], function (san) {

    /**
     * 提示信息
     * @type {Function|*}
     */
    var agileAlert = san.defineComponent({
        template:
            '<div class="alert alert-{{type}}" role="alert"><slot></slot></div>',
        initData: function () {
            return {
                type: 'success'
            };
        }
    });

    /**
     * 按钮组件
     * @type {Function|*}
     */
    var agileButton = san.defineComponent({
        template:
        '<button type="{{scene}}" class="btn btn-{{type}} btn-{{size}}" disabled="{{disabled}}" on-click="_doClickButton">' +
        '<i s-if="{{icon}}" class="fa {{icon}}"></i> {{realTitle}}' +
        '</button>',
        initData: function () {
            return {
                type: 'info',//btn-primary
                size: 'sm',
                scene: 'button',//button submit reset
                icon: null,//fa-info
                title: null,
                disabled: false
            }
        },
        computed: {
            realTitle: function () {
                var _title = this.data.get('title');
                var _icon = this.data.get('icon');
                return !_title && !_icon ? '默认按钮标题' : _title;
            }
        },
        _doClickButton: function () {
            this.fire('click');
        }
    });

    /**
     * 表格组件
     * @type {Function|*}
     */
    var agileTable = san.defineComponent({
        template:
        '<table class="table {{bordered && \'table-bordered\'}} {{striped && \'table-striped\'}} {{hover && \'table-hover\'}} {{condensed && \'table-condensed\'}}">' +
        '<thead>' +
        '<tr><th s-for="column,hindex in columns" width="{{column.width}}" class="text-{{column.align || \'left\'}}">' +
        '<template s-if="column.name == \'$check\'"><input type="checkbox" on-click="_checkedAll($event)" checked="{{checkedAllFlag}}"/></template>' +
        '<template s-elif="column.name == \'$radio\'">-</template>' +
        '<template s-else>{{column.title}}</template>' +
        '</th></tr>' +
        '</thead>' +
        '<tbody>' +
        '<tr s-for="row,bindex in rows"><td s-for="column,cindex in columns" class="text-{{column.align || \'left\'}}">' +
        '<template s-if="column.name == \'$check\'"><input type="checkbox" value="{{bindex}}" checked="{= checked =}" on-click="_checkedOne()"/></template>' +
        '<template s-elif="column.name == \'$index\'">{{bindex+1}}</template>' +
        '<template s-elif="column.name == \'$slot\'"><slot name="{{column.slot}}" var-row="row" var-column="column" var-index="bindex">{{row[column.name]}}</slot></template>' +
        // '<template s-elif="column.name == \'$render\'">{{column | renderFormat(row) | raw}}</template>' + React风格的Render暂时不启用,采用Vue风格的Slot
        '<template s-else>{{row[column.name] | raw}}</template>' +
        '</td></tr>' +
        '</tbody>' +
        '</table>',
        initData: function () {
            return {
                columns: [],
                rows: [],
                checked: [],
                bordered: true,
                striped: true,
                hover: true,
                condensed: true
            };
        },
        computed: {
            checkedAllFlag: function () {
                return this.data.get('checked').length === this.data.get('rows').length && this.data.get('checked').length > 0;
            }
        },
        _checkedAll: function (e) {
            if (e.srcElement.checked) {
                var _checkeds = [];
                for (var i = 0; i < this.data.get('rows').length; i++) {
                    _checkeds.push(i + '');
                }
                this.data.set('checked', _checkeds);
            } else {
                this.data.set('checked', []);
            }
            this._checkedOne();
        },
        _checkedOne: function () {
            var that = this;
            this.nextTick(function () {
                that.fire('check', {checked: that.data.get('checked')});
            });
        }
    });

    return {
        'sino-agile-alert': agileAlert,
        'sino-agile-button': agileButton,
        'sino-agile-table': agileTable
    };

});