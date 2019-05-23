/**
 * 基于Bootstrap的常用UI组件(agile敏捷的)
 */
define(['san'], function (san) {

    /**
     * 提示信息
     * @type {Function|*}
     */
    var agileMessage = san.defineComponent({
        template:
        '<div s-if="!close" class="alert alert-{{type}}" role="alert">' +
        '<a s-if="closeable" class="close" on-click="_doClickCloseBtn"><i class="fa fa-close"></i></a>' +
        // '<a s-if="closeable" class="pull-right" on-click="_doClickCloseBtn" href="javascript:void(0);"><i class="fa fa-close"></i></a>' +
        '<i s-if="icon" class="fa {{icon}}"></i>' +
        '<slot></slot></div>',
        initData: function () {
            return {
                closeable: false,
                type: 'success',
                close: false,
                icon: null
            };
        },
        _doClickCloseBtn: function () {
            this.data.set('close', true);
        }
        /*attached: function () {
            this.data.set('title',this.slot()[0].children.length > 0 ? '':'默认提示信息');
        }*/
    });

    /**
     * 按钮组件
     * @type {Function|*}
     */
    var agileButton = san.defineComponent({
        template:
        '<button type="{{scene}}" class="btn btn-{{size}} btn-{{type}}" disabled="{{disabled}}" on-click="_doClickButton">' +
        '<i s-if="{{icon}}" class="fa {{icon}}"></i> {{realTitle}}' +
        '</button>',
        initData: function () {
            return {
                type: 'info',//btn-primary
                size: 'sm',
                scene: 'button',//button submit reset
                icon: null,//fa-info
                title: null,
                disabled: false,
                loading: false
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
            var _this = this;
            this.nextTick(function () {
                _this.fire('checked', {checked: _this.data.get('checked')});
            });
        }
    });

    /**
     * 分页组件
     * @type {Function|*}
     */
    var agilePagination = san.defineComponent({
        template:
        '<nav class="text-center">' +
        '<ul class="pagination">' +
        '<template s-if="pageNum > 1">' +
        '<li><a href="javascript:void(0);" on-click="_changePageNum(1)">首页</a></li>' +
        '<li><a href="javascript:void(0);" on-click="_changePageNum(prePage)">上一页</a></li>' +
        '</template>' +
        '<template s-else>' +
        '<li class="disabled"><a href="javascript:void(0);">首页</a></li>' +
        '<li class="disabled"><a href="javascript:void(0);">上一页</a></li>' +
        '</template>' +
        '<li s-for="number,index in pageNumbers" class="{{pageNum == number ? \'active\' : \'\'}}">' +
        '<a href="javascript:void(0);" on-click="_changePageNum(number)">{{number}}</a>' +
        '</li>' +
        '<template s-if="pageNum < pages">' +
        '<li><a href="javascript:void(0);" on-click="_changePageNum(nextPage)">下一页</a></li>' +
        '<li><a href="javascript:void(0);" on-click="_changePageNum(pages)">尾页</a></li>' +
        '</template>' +
        '<template s-else>' +
        '<li class="disabled"><a href="javascript:void(0);">下一页</a></li>' +
        '<li class="disabled"><a href="javascript:void(0);">尾页</a></li>' +
        '</template>' +
        '</ul>' +
        '<ul class="pagination-msg">' +
        '<span>共 {{pages}} 页，当前是第 {{pageNum}} 页，跳转至：</span>' +
        '<input type="text" style="width:50px;" class="form-control input-sm" value="{{pageNum}}" on-keyup="_inputPageNum($event)" title="输入页码后请按回车键跳转">' +
        '<span>页</span>' +
        '</ul>' +
        '</nav>',
        initData: function () {
            return {
                pageNum: 1,//当前页
                pages: 0,//总页数
                total: null,//总记录数
                pageSize: null,//每页的条数
                size: null,//当前页的条数
            }
        },
        computed: {
            pageNumbers: function () {
                var _pageNum = parseInt(this.data.get('pageNum'));
                var _pages = parseInt(this.data.get('pages'));
                var result = new Array();
                for (var i = 1; i <= _pages; i++) {
                    if (i >= _pageNum - 2 && i <= _pageNum + 2) {
                        result.push(i);
                    } else if (i >= _pageNum - 2 && result.length < 5) {
                        result.push(i);
                    }
                }
                return result;
            },
            prePage: function () {
                var _pageNum = parseInt(this.data.get('pageNum'));
                return _pageNum - 1;
            },
            nextPage: function () {
                var _pageNum = parseInt(this.data.get('pageNum'));
                return _pageNum + 1;
            }
        },
        _changePageNum: function (pageNum) {
            this.data.set('pageNum', pageNum);
            this.fire('change', {
                pageNum: this.data.get('pageNum'),
                pageSize: this.data.get('pageSize')
            });
        },
        _inputPageNum: function (e) {
            if (e.keyCode == 13) {
                var _pages = parseInt(this.data.get('pages'));
                var _targetPageNum = e.srcElement.value;
                if (isNaN(_targetPageNum) || isNaN(parseInt(_targetPageNum)) || parseInt(_targetPageNum) < 1) {
                    _targetPageNum = 1;
                } else if (parseInt(_targetPageNum) > _pages) {
                    _targetPageNum = _pages;
                }
                this._changePageNum(_targetPageNum);
            }
        }
    });

    /**
     * 模态窗口
     * @type {Function|*}
     */
    var agileModalDialog = san.defineComponent({
        template:
        '<template><div class="modal fade" s-ref="agile-modal-dialog"' +
        '   tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static">' +
        '<div class="modal-dialog modal-{{size}}" role="document">' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<button s-if="cancelBtnFlag" type="button" class="close" data-dismiss="modal" aria-label="Close" style="margin-top:0px;">' +
        '<i class="fa fa-close"></i>' +
        '</button>' +
        '<h5 class="modal-title"><i class="fa {{icon}}"></i> {{title}}</h5>' +
        '</div>' +
        '<div class="modal-body">' +
        '<div class="san-modal-content">' +
        '<slot></slot>' +
        '</div>' +
        '<div class="text-center san-modal-buttons">' +
        '<slot name="buttons"></slot>' +
        '<button type="button" s-if="cancelBtnFlag" class="btn btn-default btn-sm" data-dismiss="modal">' +
        '<i class="fa fa-close"></i>关闭' +
        '</button>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div></template>',
        initData: function () {
            return {
                title: '模态窗口的标题',
                show: false,
                icon: 'fa-windows',
                size: 'lg',//lg 和 sm
                // _san_bs_dialog_id: '_san_bs_dialog_' + Math.random().toString().substring(2),
                cancelBtnFlag: true//默认是否显示关闭按钮
            };
        },
        attached: function () {
            var _this = this;
            // $('#' + this.data.get('_san_bs_dialog_id')).on('hide.bs.modal', function (e) {
            $(_this.ref('agile-modal-dialog')).on('hide.bs.modal', function (e) {
                _this.data.set('show', false);
            })
            this._doDialogModal();
            this.watch('show', function (value) {
                this._doDialogModal();
            });
        },
        _doDialogModal: function () {
            if (this.data.get('show')) {
                // $('#' + this.data.get('_san_bs_dialog_id')).modal({backdrop: 'static', keyboard: false});
                $(this.ref('agile-modal-dialog')).modal({backdrop: 'static', keyboard: false});
            } else {
                // $('#' + this.data.get('_san_bs_dialog_id')).modal('hide');
                $(this.ref('agile-modal-dialog')).modal('hide');
            }
        }
    });

    /**
     * 输入框组件
     * @type {Function|*}
     */
    var agileInput = san.defineComponent({
        template:
            '<input type="{{text}}" class="form-control input-{{size}}" readonly="{{readonly}}" disabled="{{disabled}}" placeholder="{{placeholder}}" value="{= value =}">',
        initData: function () {
            return {
                type: 'text',//text 和 password 等原生支持的输入类型
                placeholder: '',
                readonly: false,
                disabled: false,
                size: 'default',//lg 和 sm
                value: ''
            };
        }
    });

    /**
     * 输入框组
     * @type {Function|*}
     */
    var agileInputGroup = san.defineComponent({
        template:
        // '<input type="{{text}}" class="form-control input-{{size}}" readonly="{{readonly}}" disabled="{{disabled}}" placeholder="{{placeholder}}" value="{= value =}">',
        '<div class="input-group">' +
        '<span class="input-group-addon">￥</span>' +
        '<input type="text" class="form-control">' +
        '<span class="input-group-addon">.00</span>' +
        '</div>',
        initData: function () {
            return {
                prefix: '',
                suffix: '',
                type: 'text',//text 和 password 等原生支持的输入类型
                placeholder: '',
                readonly: false,
                disabled: false,
                size: 'default',//lg 和 sm
                value: ''
            };
        }
    });

    return {
        'sino-agile-message': agileMessage,
        'sino-agile-button': agileButton,
        'sino-agile-table': agileTable,
        'sino-agile-pagination': agilePagination,
        'sino-agile-modal-dialog': agileModalDialog,
        'sino-agile-input': agileInput,
        'sino-agile-input-group': agileInputGroup
    };

});