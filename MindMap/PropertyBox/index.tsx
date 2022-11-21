import { PropertyOne } from './PropertyOne'
import { PropertyTwo } from './PropertyTwo'

import './index.css'


export const PropertyBox = (props: any) => {
    return (
        <div>
            <div className='property-box-title'>编辑栏</div>
            {
                props.currentSelectNodeData?.comType === 1 && (
                    <PropertyOne {...props} />
                )
            }
            {
                props.currentSelectNodeData?.comType === 2 && (
                    <PropertyTwo {...props} />
                )
            }
        </div>
    )
}