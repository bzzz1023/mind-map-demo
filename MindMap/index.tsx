import React, { useEffect, useRef, useState } from "react"
import { Button, message } from "antd"
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { mockNodeData, mockEdgeData } from './Mock'

import { v1 as uuid } from 'uuid'

import './index.css'

import { calculateDragInMap } from './utils'

import useX6Hook from './useX6Hook'

import ElementBox from './ElementBox'

import TempDrawArea from './TempDrawArea'

import { useAddNodeHook, useDoubleClickNodeHook, useUpdateNodeHook, useDoubleClickBlank } from './useHooks/useControlHook'

import { PropertyBox } from './PropertyBox'

import { CSSTransition } from 'react-transition-group';

const MindMap = (props: any) => {
    const urlParam = useParams()

    const ContainerEl = useRef<any>(null)
    const MiniMapContainerEl = useRef<any>(null)
    // graph 实例
    const GraphRef = useRef<any>(null)

    const [tempState, setTempState] = useState<any>({
        tempClientLeft: null,
        tempClientTop: null,
        tempClientWidth: null,
        tempClientHeight: null,
    })

    const [mapState, setMapState] = useState<any>({
        currentSelectNodeData: null,
    })

    const loadMap = () => {
        GraphRef.current = new useX6Hook(ContainerEl.current, MiniMapContainerEl.current)
        GraphRef.current.eventController.registerEvent([
            {
                eventName: "node:dblclick", handler: (node: any) => {
                    useDoubleClickNodeHook({ node, GraphRef, mapState, setMapState })
                }
            },
            {
                eventName: "edge:dblclick", handler: (node: any) => {
                    console.log(1111, node);
                }
            },
            {
                eventName: "blank:dblclick", handler: (node: any) => {
                    useDoubleClickBlank({ GraphRef, mapState, setMapState })
                }
            },
            {
                eventName: "edge:connected", handler: (param: any) => {
                    const source = param.edge.store.data.source.cell
                    const target = param.edge.store.data.target.cell
                    GraphRef.current.addEdge({ id: uuid(), source, target })
                }
            }
        ])

        GraphRef.current.addBatchNodes(mockNodeData)
        GraphRef.current.addBatchEdges(mockEdgeData)
    }

    // 图案拖拽上去，画临时区域
    const drawTempArea = (flag: boolean) => {
        if (flag) {
            const node: any = document.getElementsByClassName('x6-graph-scroller')[0]
            // 视窗 左上角
            const containerSetLeft = node.offsetLeft
            const containerSetTop = node.offsetTop
            // 画布 视窗 尺寸
            const containerClientWidth = node.clientWidth
            const containerClientHeight = node.clientHeight
            tempState.tempClientLeft = containerSetLeft
            tempState.tempClientTop = containerSetTop
            tempState.tempClientWidth = containerClientWidth
            tempState.tempClientHeight = containerClientHeight
            setTempState({ ...tempState })
        } else {
            tempState.tempClientLeft = null
            tempState.tempClientTop = null
            tempState.tempClientWidth = null
            tempState.tempClientHeight = null
            setTempState({ ...tempState })
        }

    }

    const dragEnd = (e: any, type: number) => {
        const { flag } = calculateDragInMap(e)
        if (flag) {
            useAddNodeHook({ type, state: mapState, setState: setMapState, GraphRef })
        }
    }

    const dragNow = (e: any) => {
        const { flag } = calculateDragInMap(e)
        if (flag) {
            drawTempArea(true)
        } else {
            drawTempArea(false)
        }
    }

    const onUpdateNode = (updateItem: any) => {
        useUpdateNodeHook({ GraphRef, mapState, updateItem })
    }

    useEffect(() => {
        // 拿到路由id
        console.log(222, urlParam);

        // 拿 urlParam 获取画布信息
        
        loadMap()
    }, [])

    return (
        <div className="mind-map-container">
            <div className="mind-map-tool-container">
                <Button
                    onClick={() => {
                        message.info('开发中')
                    }}
                >保存</Button>
                <ElementBox
                    onEleDragEnd={dragEnd}
                    onEleDragNow={dragNow}
                />
            </div>
            <div className="graph-container" ref={ContainerEl}></div>
            <div className="mini-map-container" ref={MiniMapContainerEl}></div>
            {
                tempState.tempClientLeft && (
                    <div
                        style={{
                            position: "absolute",
                            left: tempState.tempClientLeft,
                            top: tempState.tempClientTop,
                            width: tempState.tempClientWidth,
                            height: tempState.tempClientHeight
                        }}
                    >
                        <TempDrawArea />
                    </div>
                )
            }

            <CSSTransition
                in={mapState.currentSelectNodeData ? true : false}
                timeout={300}
                unmountOnExit
                classNames="propertyBox"
            >
                {
                    <div className="mind-map-property-box-container">
                        <PropertyBox
                            currentSelectNodeData={mapState.currentSelectNodeData}
                            onUpdateNode={onUpdateNode}
                        />
                    </div>
                }
            </CSSTransition>

        </div>
    )
}

export default MindMap