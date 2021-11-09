import {useEffect, useState} from "react";
import AdminNavbar from "../../components/AdminNavbar";
import Spinner from "../../components/Spinner";
import {Breadcrumb, Button, Col, Descriptions, Divider, Image, Input, PageHeader, Row, Space, Table, Tabs} from 'antd';
import {EditOutlined, HomeOutlined} from '@ant-design/icons';
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import Cookies from 'js-cookie';
import axios from "axios";

export default function Cms() {
    // Show Spin while loading is true
    const [loading, setLoading] = useState(true);

    // Allocation for Data
    const [govPressData, setGovPressData] = useState([]);
    const [dailyData, setDailyData] = useState([]);
    const {TabPane} = Tabs;
    const {TextArea} = Input;

    // Fetch Database Data onLoad
    const axios = require("axios");
    var config = {
        method: 'get',
        url: 'https://locus-dev.herokuapp.com/v1/govpress',
    };

    var config2 = {
        method: 'get',
        url: 'https://locus-dev.herokuapp.com/v1/daily',
    };

    // Fetch data onLoad
    useEffect(() => {
        dailyData.length === 0 || govPressData.length === 0 ?
            axios(config)
                .then(function (response) {
                    for (const obj in response.data) {
                        response.data[obj].key = obj;
                    }
                    setGovPressData(response.data)
                    axios(config2)
                        .then(function (response2) {
                            for (const obj in response2.data) {
                                response2.data[obj].key = obj;
                            }
                            setDailyData(response2.data)
                        })
                    setLoading(false);
                })
                .catch(function (error) {
                    setLoading(false);
                    toastr.error('An error has occurred')
                }) : null;
    })

    const gp_columns = [
        {title: 'Key', dataIndex: 'key', key: 'key'},
        {title: 'Publish Date', dataIndex: 'datePublished', key: 'datePublished'},
        {title: 'Minutes to Read', dataIndex: 'minutesToRead', key: 'minutesToRead'},
        {title: 'Article Title', dataIndex: 'articleTitle', key: 'articleTitle'},
        {title: 'Description', dataIndex: 'articleDescription', key: 'articleDescription'},
        {
            title: 'Edit', dataIndex: 'edit', key: 'edit',
            render: edit => <EditOutlined/>,
        },
    ];

    const daily_columns = [
        {title: 'Key', dataIndex: 'key', key: 'key'},
        {title: 'Title', dataIndex: 'title', key: 'title'},
        {title: 'Article Url', dataIndex: 'articleUrl', key: 'articleUrl'},
        {title: 'Publish Date', dataIndex: 'datePublished', key: 'datePublished'},
        {
            title: 'Edit', dataIndex: 'edit', key: 'edit',
            render: edit => <EditOutlined/>,
        },
    ];

    return (
        <>
            {loading ? <Spinner/> :
                <>
                    <AdminNavbar user={Cookies.get('username')} userID={Cookies.get('id')}/>
                    <div className="px-16">
                        <Col flex="100px"></Col>
                        <Col flex="auto">
                            <Breadcrumb style={{paddingTop: 20}}>
                                <Breadcrumb.Item href="/admin">
                                    <HomeOutlined style={{display: 'inline-flex'}}/>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    <span>CMS</span>
                                </Breadcrumb.Item>
                            </Breadcrumb>
                            <PageHeader
                                className="site-page-header"
                                title="Content Management System"
                                subTitle="Manage Locus announcement content"
                                style={{paddingTop: 0, paddingBottom: 30, paddingLeft: 0}}
                            />
                            <Tabs defaultActiveKey="1">
                                <TabPane tab="Government Press" key="1">
                                    <Table columns={gp_columns} dataSource={govPressData}
                                           expandable={{
                                               expandedRowRender: record => <>
                                                   <Row>
                                                       <Col span={6} style={{paddingRight: 20}}>
                                                           <Image src={record.imgUrl} alt=" "/>
                                                       </Col>
                                                       <Col span={16}>
                                                           <Descriptions title="Article Information" bordered>
                                                               <Descriptions.Item
                                                                   label="Article ID">{record.articleID}</Descriptions.Item>
                                                               <Descriptions.Item label="Minutes to Read"
                                                                                  span={2}>{record.minutesToRead}</Descriptions.Item>

                                                               <Descriptions.Item label="Date Published"
                                                                                  span={3}>{record.datePublished}</Descriptions.Item>

                                                               <Descriptions.Item
                                                                   label="Title"
                                                                   span={3}>{record.articleTitle}</Descriptions.Item>

                                                               <Descriptions.Item
                                                                   label="Summary"
                                                                   span={3}>{record.articleSummarized}</Descriptions.Item>

                                                               <Descriptions.Item label="Description"
                                                                                  span={3}>{record.articleDescription}</Descriptions.Item>

                                                               <Descriptions.Item
                                                                   label="Article URL"
                                                                   span={3}>{record.articleUrl}</Descriptions.Item>
                                                           </Descriptions>
                                                       </Col>
                                                   </Row>
                                               </>
                                           }}/>

                                </TabPane>
                                <TabPane tab="Daily Reports" key="2">
                                    <Table columns={daily_columns} dataSource={dailyData}
                                           expandable={{
                                               expandedRowRender: record => <>
                                                   <Row>
                                                       <Col span={24}>
                                                           <Descriptions title="User Account Info" bordered>
                                                               <Descriptions.Item
                                                                   label="Title"
                                                                   span={3}>{record.title}</Descriptions.Item>

                                                               <Descriptions.Item
                                                                   label="Date Published"
                                                                   span={3}>{record.date_published}</Descriptions.Item>

                                                               <Descriptions.Item
                                                                   label="Description"
                                                                   span={3}>{record.body_text}</Descriptions.Item>

                                                               <Descriptions.Item
                                                                   label="Article LInk"
                                                                   span={3}>{record.article_link}</Descriptions.Item>
                                                           </Descriptions>
                                                       </Col>
                                                   </Row>

                                                   {/*<Row>*/}
                                                   {/*    <Col span={6}>*/}
                                                   {/*    </Col>*/}
                                                   {/*    <Col span={18}>*/}
                                                   {/*        <Divider orientation="left" plain>*/}
                                                   {/*            Adminstrative Actions*/}
                                                   {/*        </Divider>*/}
                                                   {/*        <TextArea rows={4} style={{marginTop: 10}}*/}
                                                   {/*                  placeholder="Please input your justifications (if any)"/>*/}
                                                   {/*        <Space wrap style={{marginTop: 10}}>*/}
                                                   {/*            <Button onClick={showConfirm}*/}
                                                   {/*                    type="primary">Verify</Button>*/}
                                                   {/*            <Button onClick={showPromiseConfirm} type="primary"*/}
                                                   {/*                    danger>Reject</Button>*/}
                                                   {/*            <Button onClick={showPropsConfirm} danger>Revoke*/}
                                                   {/*                Verification</Button>*/}
                                                   {/*        </Space>*/}
                                                   {/*    </Col>*/}
                                                   {/*</Row>*/}
                                               </>
                                           }}/>
                                </TabPane>
                            </Tabs>
                        </Col>
                        <Col flex="100px"></Col>
                    </div>
                </>
            }
        </>
    );
}
