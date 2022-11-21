import './index.css'
import { Input } from 'antd'
import { styleTransition } from '../styleTransition'

export const ComponentOne = (props: any) => {

    return (
        <div
            style={{
                height: `${props.height}px`,
                width: `${props.width}px`,
                ...styleTransition(props, "containerStyle"),
                border: props.isSelect ? "2px solid blue" : ""
            }}
            className="map-node-component-one-container"
        >
            <div
                style={{ ...styleTransition(props, "titleStyle") }}
                className='map-node-component-one-title'
            >{props.titleText}</div>
            <div
                style={{ 
                    wordWrap:'break-word',
                    ...styleTransition(props, "contentStyle") 
                }}
            >{props.contentText}</div>
        </div >
    )
}