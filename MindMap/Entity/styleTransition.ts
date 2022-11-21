const containerStyle: any = {
    containerBackgroundColor: "backgroundColor"
}
const titleStyle: any = {
    titleFontSize: "fontSize",
    titleColor: "color"
}
const contentStyle: any = {
    contentFontSize: "fontSize",
    contentColor: "color"
}

const transitionMap: any = {
    containerStyle,
    titleStyle,
    contentStyle
}

export const styleTransition = (data: any, type: string) => {
    const obj: any = {}
    Object.keys(transitionMap[type]).forEach((item: any) => {
        const newKey = transitionMap[type][item]
        obj[newKey] = data[item]
    })
    return obj
}