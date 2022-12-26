import React from 'react';
import { Button, Form, Input, Modal } from 'antd';
import axios from 'axios';

const LoginComponent: React.FC = () => {

    const onFinish = (values: any) => {
        console.log(values);
        window.location.href = '/clan';
    };
    
    const onFinishFailed = (errorInfo: any) => {
        console.log(errorInfo);
    };

    return (
        <>
            <Modal title="Login" open={true} footer={ null } closable={ false } >
                <Form
                    name='Login'
                    autoComplete='off'
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        name='clanID'
                        label='Clan ID: '
                        rules={[{ required: true, message: 'This field is required!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name='playerID'
                        label='Player ID: '
                        rules={[{ required: true, message: 'This field is required!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name='apiKey'
                        label='API Key: '
                        rules={[{ required: true, message: 'This field is required!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default LoginComponent;