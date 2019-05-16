<template>
    <sino-agile-message type="success" icon="fa-comments" closeable>
        默认的提示信息
    </sino-agile-message>
    <sino-agile-message type="info" icon="fa-info-circle" closeable>
        默认的提示信息
    </sino-agile-message>
    <sino-agile-message type="warning" icon="fa-volume-up" closeable>
        默认的提示信息
    </sino-agile-message>
    <sino-agile-message type="danger" icon="fa-warning" closeable>
        默认的提示信息
    </sino-agile-message>

    <sino-agile-message type="success" icon="fa-clock-o">
        用户不能手动关闭的提示信息
    </sino-agile-message>
    <sino-agile-message type="success" icon="fa-clock-o">
        按倒计时自动关闭的提示信息<div class="pull-right">3s后自动关闭</div>
    </sino-agile-message>
</template>