import React from "react"
import './index.css'
import { Button, Checkbox, Form, Input } from 'antd';
import { EditOne, Triangle, RectangleOne,Round } from '@icon-park/react'
const elementArr: any = [
    {
        com: EditOne,
        theme: "filled",
        type: 1
    },
    {
        com: Triangle,
        theme: "outline",
        type: 2
    },
    {
        com: RectangleOne,
        theme: "outline",
        type: 3
    },
    {
        com: Round,
        theme: "outline",
        type: 4
    }
]

const ElementBox = (props: any) => {
    return (
        <div className="mindmap-element-box-container">
            {
                elementArr.map((Item: any, index: number) => {
                    return (
                        <div
                            draggable
                            key={index}
                            className="mindmap-element-box-item"
                            onDragEnd={(e: any) => {
                                props.onEleDragEnd(e, Item.type)
                            }}
                            onDrag={(e: any) => {
                                props.onEleDragNow(e)
                            }}
                        >
                            <Item.com theme={Item.theme || "outline"} size="42" fill="blue" />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ElementBox