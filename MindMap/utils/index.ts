export const calculateDragInMap = (e: any) => {
    // 这是鼠标的位置
    const dragX = e.clientX
    const dragY = e.clientY
    const node: any = document.getElementsByClassName('x6-graph-scroller')[0]

    // 视窗 左上角
    const containerClientLeft = node.getBoundingClientRect().left
    const containerClientTop = node.getBoundingClientRect().top
    // 画布 视窗 尺寸
    const containerClientWidth = node.clientWidth
    const containerClientHeight = node.clientHeight
    // 视窗 右下角
    const containerEndX = containerClientLeft + containerClientWidth
    const containerEndY = containerClientTop + containerClientHeight

    const flag = containerClientLeft < dragX && dragX < containerEndX && containerClientTop < dragY && dragY < containerEndY
    return { flag }
}