<template>
    <div class="table-responsive">
        <sino-agile-table rows="{{rows}}" columns="{{columns}}" checked="{= checkeds =}"><!-- on-checked="_doClickCheckedEvent" -->
            <span s-if="index%2 == 0" slot="grade-slot" class="glyphicon glyphicon-ok text-success" aria-hidden="true"/>
            <span s-if="index%2 != 0" slot="grade-slot" class="glyphicon glyphicon-remove text-danger" aria-hidden="true"/>
        </sino-agile-table>
    </div>

    <sino-agile-message type="info">
        <p>有选择时启用按钮：<sino-agile-button type="danger" disabled="{{checkeds.length ==0 }}" title="适用于删除按钮" /></p>
        <p>当前选择的行下标：[{{checkeds}}]</p>
    </sino-agile-message>
</template>