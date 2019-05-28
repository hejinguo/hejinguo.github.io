<template>
	<sino-agile-row>
		<sino-agile-col>
			<sino-agile-input placeholder='普通输入框' /><br/>
			<sino-agile-input type="password" placeholder='请输入密码' /><br/>
			<sino-agile-input maxlength="10" placeholder='最多10个字符' /><br/>
			<sino-agile-input-group prefix="￥" suffix=".00" placeholder="两端输入框组" /><br/>
			<sino-agile-input-group prefix="￥" placeholder="左端输入框组" /><br/>
			<sino-agile-input-group suffix="元" placeholder="右端输入框组" /><br/>
		</sino-agile-col>
		<sino-agile-col>
			<sino-agile-select options="{{[{value:'01',text:'选项一'},{value:'02',text:'选项二'}]}}" /><br/>
			<sino-agile-checkbox options="{{[{value:'01',text:'选项一'},{value:'02',text:'选项二(禁用)',disabled:true}]}}" /><br/>
			<sino-agile-checkbox disabled options="{{[{value:'01',text:'选项一(禁用)'},{value:'02',text:'选项二(禁用)'}]}}" /><br/>
			<sino-agile-checkbox inline="{{true}}" options="{{[{value:'01',text:'选项一'},{value:'02',text:'选项二'}]}}" />
			
			<sino-agile-radio options="{{[{value:'01',text:'选项一'},{value:'02',text:'选项二(禁用)',disabled:true}]}}" /><br/>			
			<sino-agile-radio disabled options="{{[{value:'01',text:'选项一(禁用)'},{value:'02',text:'选项二(禁用)'}]}}" /><br/>			
			<sino-agile-radio inline="{{true}}" options="{{[{value:'01',text:'选项一'},{value:'02',text:'选项二'}]}}" />
		</sino-agile-col>
		
		<sino-agile-col>
			<sino-agile-textarea /><br/>
			<sino-agile-textarea maxlength="2" disabled value="禁用的文本域" />
		</sino-agile-col>	
	</sino-agile-row>
</template>