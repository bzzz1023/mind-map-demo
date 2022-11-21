import { Button, Checkbox, Form, Input } from 'antd';
import { useEffect, useState, useRef } from 'react'

export const PropertyOne = (props: any) => {
    const FormRef = useRef<any>(null)

    useEffect(() => {
        FormRef && FormRef.current && FormRef.current.resetFields()
    }, [props.currentSelectNodeData])

    return (
        <div>
            <Form
                ref={FormRef}
                name="basic"
                colon={false}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
                initialValues={props.currentSelectNodeData}
                onValuesChange={(e: any) => {
                    props.onUpdateNode(e)
                }}
            >
                <Form.Item
                    label="高度"
                    name="height"
                >
                    <Input suffix="px" />
                </Form.Item>

                <Form.Item
                    label="宽度"
                    name="width"
                >
                    <Input suffix="px" />
                </Form.Item>
                <Form.Item
                    label="标题"
                    name="titleText"
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    label="内容"
                    name="contentText"
                >
                    <Input.TextArea
                        style={{
                            height:"200px"
                        }} 
                    />
                </Form.Item>
            </Form>
        </div>
    )
}