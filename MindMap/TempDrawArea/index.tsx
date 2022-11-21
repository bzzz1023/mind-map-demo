import React, { useEffect, useRef, useState } from "react"
import './index.css'

import { AddOne } from '@icon-park/react'

const TempDrawArea = () => {
    return (
        <div className="mind-map-temp-area-container">
            <div className="mind-map-temp-area-container-rect">
                <AddOne theme="filled" size="24" fill="blue" />
                <div>松手添加节点</div>
            </div>
        </div>
    )
}

export default TempDrawArea