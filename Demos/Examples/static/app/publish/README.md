发布系统核心开发规范
====

• Don’t override methods.
• Don’t add new methods.
• Don’t remove existing methods.



样式规范：

本系统分为三大模块：
核心分区： L（layout)
插件：P(plugin)
公共配置：C(config)

相应模块样式 命名举例：
插件->新闻列表插件->一个手动按钮样式 ： <input class= 'p-nl-manual'>
其中p为插件缩写，nl为新闻列表插件缩写，manual为相应按钮命名