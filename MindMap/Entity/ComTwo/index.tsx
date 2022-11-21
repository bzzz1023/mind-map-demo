import './index.css'
import { Input } from 'antd'

export const ComponentTwo = (props: any) => {
    console.log(111,props);
    
    return (
        <div
            style={{
                height: `${props.height}px`,
                width: `${props.height}px`,
                borderRadius: `${props.height / 2}px`,
                border: "1px solid red"
            }}
        >
            {/* <div
                style={{
                    ...props.title
                }}
                className='map-node-component-two-title'>{props.title}</div>
            <div
                style={{
                    ...props.content
                }}
            >111</div> */}
        </div>
    )
}