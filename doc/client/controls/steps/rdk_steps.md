<rdk_switch></rdk_switch>

# 简介 #
`rdk_steps` 是引导用户通过任务步骤的导航栏。当任务复杂或具有子任务系列的序列，我们可以将它分解成几个步骤，让事情变得更容易。

---
# 属性 #

## steps <binding></binding>##
> 支持类型：数组或数据源id

  `steps` 是所有步骤的集合，可以是某个`数据源`的id。

    <rdk_steps
        steps="[{ title: "register", status: 'process' },
                { title: "login", status: 'wait' }, ...]">
    </rdk_steps>

>`steps`集合中每个对象的`title`属性是必须的，`status`属性枚举值有 enum:'wait','process','finish','error',除了`error` `status`需要根据实际情况手动设置，其余状态会根据步骤索引自动更新

## active_step ##
> 支持类型：字符串

`active_step` 属性设置活动步骤,索引从0开始，默认值为0。


## steps_content ##

`rdk_steps_content` 设置对应rdk_steps活动步骤的内容

这是一个综合的 `rdk_steps` 例子：

<live_demo example="controls/steps/basic" width="900"></live_demo>



