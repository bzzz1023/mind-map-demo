import { v1 as uuid } from 'uuid'
import { message } from 'antd'
const getDemoNode = () => {
    const id = uuid()
    return {
        id,
        isSelect: false,
        x: 300,
        y: 200,
        height: 80,
        width: 200,
        comType: 1,
        titleText: '第一章节',
        contentText: '介绍了主人公',
        containerBackgroundColor: "rgba(243,243,243,1)",
        titleFontSize: 16,
        titleColor: "rgba(50,50,50,1)",
        contentFontSize: 12,
        contentColor: "rgba(100,100,100,1)"
    }
}

export const useAddNodeHook = ({ type, state, setState, GraphRef }: any) => {

    switch (type) {
        case 1:
            GraphRef.current.addNode(getDemoNode())
            break

        default:
            message.info("under developing~~~")
    }

}

export const useDoubleClickNodeHook = ({ node, GraphRef, mapState, setMapState }: any) => {
    const nodeData = {
        ...node.cell.store.data.component.props,
        ...node.cell.store.data.position
    }

    // 两次点击的是同一个
    if (mapState.currentSelectNodeData && nodeData.id === mapState.currentSelectNodeData.id) return

    // 先清空 上一次 选中
    if (mapState.currentSelectNodeData) {
        const oldNode = GraphRef.current.graph.getCellById(mapState.currentSelectNodeData.id)
        const oldNodeData = {
            ...oldNode.store.data.component.props,
            ...oldNode.store.data.position,
        }
        GraphRef.current.selectNode(oldNodeData, false)
    }

    // 选中当前
    GraphRef.current.selectNode(nodeData, true)
    mapState.currentSelectNodeData = nodeData
    setMapState({ ...mapState })
}

export const useUpdateNodeHook = ({ GraphRef, mapState, updateItem }: any) => {
    if (!mapState.currentSelectNodeData) return

    const node = GraphRef.current.graph.getCellById(mapState.currentSelectNodeData.id)

    const nodeData = {
        ...node.store.data.component.props,
        ...node.store.data.position,
        ...updateItem
    }

    GraphRef.current.selectNode(nodeData, true)
}

export const useDoubleClickBlank = ({ GraphRef, mapState, setMapState }: any) => {
    if (!mapState.currentSelectNodeData) return
    const node = GraphRef.current.graph.getCellById(mapState.currentSelectNodeData.id)

    const nodeData = {
        ...node.store.data.component.props,
        ...node.store.data.position,
    }

    GraphRef.current.selectNode(nodeData, false)
    mapState.currentSelectNodeData = null
    setMapState({ ...mapState })
}