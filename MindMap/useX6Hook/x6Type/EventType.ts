export type EventType =
  | 'scale' // 画布缩放
  | 'graph:mouseenter' // 鼠标进入画布事件
  | 'graph:mouseleave' // 鼠标离开画布事件
  | 'blank:mouseDown' // 鼠标在画布空白区域按下事件
  | 'blank:mouseUp' // 鼠标在画布空白区域抬起事件
  | 'node:added' // 节点在画布中添加完成事件
  | 'node:removed' // 节点在画布中删除完成事件
  | 'edge:added' // 连线在画布中添加完成事件
  | 'edge:removed' // 连线在画布中删除完成事件
  | 'node:mousedown' // 节点在画布中开始随鼠标移动
  | 'node:mousemove' // 节点在画布中随鼠标移动
  | 'node:mouseup' // 节点在画布中随鼠标移动结束
  | 'node:mouseleave' // 鼠标离开节点事件
  | 'node:moved' // 节点移动后事件
  | 'node:moving' // 节点移动后事件
  | 'node:click' // 节点点击事件
  | 'node:dblclick' // 节点双击事件
  | 'edge:connected' // 节点之间连线完成
  | 'edge:dblclick' // 连线点击事件
  | 'edge:mousemove' // 连线在画布中随鼠标移动
  | 'edge:mousedown' // 连线在画布中随鼠标移动
  | 'selection:changed' // 当前画布选中的节点/连线变化
  | "blank:dblclick"

export interface EventArg {
  eventName: EventType;
  handler: Function;
}