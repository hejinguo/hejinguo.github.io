<template>
	<sino-agile-button title="弹出大窗口" on-click="_doOpenLargeModalDialog" />
	
	<sino-agile-button title="弹出小窗口" on-click="_doOpenSmallModalDialog" />
	
    <sino-agile-modal-dialog show="{= showLargeDialog =}">这是一个大窗口</sino-agile-modal-dialog>
	
	<sino-agile-modal-dialog size='sm' show="{= showSmallDialog =}">这是一个小窗口</sino-agile-modal-dialog>
</template>