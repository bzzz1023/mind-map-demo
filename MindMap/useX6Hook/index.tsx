import React from 'react';
import { Graph, Line, Curve, Path } from '@antv/x6';
import '@antv/x6-react-shape'

import { ComponentOne } from '../Entity/ComOne'
import { ComponentTwo } from '../Entity/ComTwo'

import { eventController } from './eventController'

import { getPortsByType } from './contants'

import { registerEdge, registerConnector } from './resigter'
registerEdge(Graph)
registerConnector(Graph)


export default class useX6Hook {

    public graph: any
    public eventController: any

    constructor(graphContainerRef: any, miniMapContainerRef: any) {
        this.graph = new Graph({
            container: graphContainerRef,
            connecting: {
                snap: {
                    radius: 50
                },
                allowBlank: false,
                allowMulti: true,
                allowLoop: true,
                highlight: true
            },
            grid: {
                size: 10,
                visible: true
            },
            interacting: true,
            scroller: {
                enabled: true,
                pageVisible: false,
                pageBreak: false,
                pannable: true
            },
            snapline: {
                enabled: true
            },
            minimap: {
                enabled: true,
                container: miniMapContainerRef,
            }
        });

        this.eventController = new eventController(this.graph)
    }

    private getComType(type: number, props: any) {
        switch (type) {
            case 1:
                return <ComponentOne {...props} />
            case 2:
                return <ComponentTwo {...props} />
        }
    }

    // 添加单个实体
    public addNode(nodeData?: any) {
        const { id, x, y, height, width, comType } = nodeData
        const Com = this.getComType(comType, nodeData)
        this.graph.addNode({
            id, x, y, height, width,
            ports: getPortsByType(comType),
            shape:"react-shape",
            component: Com
        })
    }

    // 选中单个实体 选中 或者 取消选中
    public selectNode(nodeData: any, flag: boolean) {
        //获取 与节点相连的边
        const edges = this.graph.getConnectedEdges(nodeData.id).map((item: any) => {
            return {
                id: item.id,
                source: item.store.data.source.cell,
                target: item.store.data.target.cell,
            }
        })

        // 重新添加node
        this.graph.removeCell(nodeData.id)
        this.addNode({
            ...nodeData,
            isSelect: flag
        })

        // 重新添加edge
        this.addBatchEdges(edges)
    }

    // 批量添加实体
    public addBatchNodes(nodesArr: any) {
        nodesArr.forEach((e: any) => {
            this.addNode(e)
        });
    }

    // 添加单个连线
    public addEdge(edgeData: any) {
        this.graph.addEdge({
            ...edgeData,
        })
    }


    // 批量添加连线
    public addBatchEdges(edgesArr: any) {
        edgesArr.forEach((e: any) => {
            this.addEdge(e)
        })
    }

}