import {useState} from "react";
import AdminNavbar from "../../components/AdminNavbar";
import Spinner from "../../components/Spinner";
import {Breadcrumb, Col, Input, PageHeader, Row, Tabs} from 'antd';
import {HomeOutlined} from '@ant-design/icons';
import 'toastr/build/toastr.css';
import Cookies from 'js-cookie';

export default function ManageEvents() {
    // Show Spin while loading is true
    const [loading, setLoading] = useState(true);

    // Allocation for Data
    const [allEvents, setAllEvents] = useState([]);
    const {TabPane} = Tabs;
    const {TextArea} = Input;

    // Fetch Database Data onLoad
    const axios = require("axios");
    var config = {
        method: 'get',
        url: 'https://locus-g3gtexqeba-uc.a.run.app/admin/manage-events',
        withCredentials: true,
    };

    // Fetch data onLoad
    // allEvents.length === 0 ?
    //     axios(config)
    //         .then(function (response) {
    //             for (const obj in response.data) {
    //                 response.data[obj].key = obj;
    //             }
    //             setAllEvents(response.data)
    //             setLoading(false);
    //         })
    //         .catch(function (error) {
    //             setLoading(false);
    //             toastr.error('An error has occurred')
    //         }) : null;

    const columns = [
        // {title: 'Key', dataIndex: 'key', key: 'key'},
        // {title: 'Publish Date', dataIndex: 'datePublished', key: 'datePublished'},
        // {title: 'Minutes to Read', dataIndex: 'minutesToRead', key: 'minutesToRead'},
        // {title: 'Article Title', dataIndex: 'articleTitle', key: 'articleTitle'},
        // {title: 'Description', dataIndex: 'articleDescription', key: 'articleDescription'},
    ];

    return (
        <>
            {loading ? <Spinner/> :
                <>
                    <AdminNavbar user={Cookies.get('username')}  userID={Cookies.get('id')}/>
                    <Row>
                        <Col flex="100px"></Col>
                        <Col flex="auto">
                            <Breadcrumb style={{paddingTop: 20}}>
                                <Breadcrumb.Item href="/admin">
                                    <HomeOutlined style={{display: 'inline-flex'}}/>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    <span>Manage Events</span>
                                </Breadcrumb.Item>
                            </Breadcrumb>
                            <PageHeader
                                className="site-page-header"
                                title="Manage Events"
                                style={{paddingTop: 0, paddingBottom: 0, paddingLeft: 0}}
                            />
                            <p style={{paddingBottom: 30}}>View and modify all events on Locus</p>
                            <Tabs defaultActiveKey="1">
                                {/*<TabPane tab="Upcoming Events" key="1">*/}
                                {/*    <Table columns={columns} dataSource={allEvents}*/}
                                {/*           expandable={{*/}
                                {/*               expandedRowRender: record => <>*/}
                                {/*                   <Row>*/}
                                {/*                       <Col span={6} style={{paddingRight: 20}}>*/}
                                {/*                           <Image src={record.imgUrl}/>*/}
                                {/*                       </Col>*/}
                                {/*                       <Col span={16}>*/}
                                {/*                           <Descriptions title="Article Information" bordered>*/}
                                {/*                               <Descriptions.Item*/}
                                {/*                                   label="Article ID">{record.articleID}</Descriptions.Item>*/}
                                {/*                               <Descriptions.Item label="Minutes to Read"*/}
                                {/*                                                  span={2}>{record.minutesToRead}</Descriptions.Item>*/}

                                {/*                               <Descriptions.Item label="Date Published"*/}
                                {/*                                                  span={3}>{record.datePublished}</Descriptions.Item>*/}

                                {/*                               <Descriptions.Item*/}
                                {/*                                   label="Title"*/}
                                {/*                                   span={3}>{record.articleTitle}</Descriptions.Item>*/}

                                {/*                               <Descriptions.Item*/}
                                {/*                                   label="Summary"*/}
                                {/*                                   span={3}>{record.articleSummarized}</Descriptions.Item>*/}

                                {/*                               <Descriptions.Item label="Description"*/}
                                {/*                                                  span={3}>{record.articleDescription}</Descriptions.Item>*/}

                                {/*                               <Descriptions.Item*/}
                                {/*                                   label="Article URL"*/}
                                {/*                                   span={3}>{record.articleUrl}</Descriptions.Item>*/}
                                {/*                           </Descriptions>*/}
                                {/*                       </Col>*/}
                                {/*                   </Row>*/}
                                {/*               </>*/}
                                {/*           }}/>*/}

                                {/*</TabPane>*/}
                                {/*<TabPane tab="Past Events" key="2">*/}
                                {/*    <Table columns={daily_columns} dataSource={daily_data}*/}
                                {/*           expandable={{*/}
                                {/*               expandedRowRender: record => <>*/}
                                {/*                   <Row>*/}
                                {/*                       <Col span={24}>*/}
                                {/*                           <Descriptions title="User Account Info" bordered>*/}
                                {/*                               <Descriptions.Item*/}
                                {/*                                   label="Title"*/}
                                {/*                                   span={3}>{record.title}</Descriptions.Item>*/}

                                {/*                               <Descriptions.Item*/}
                                {/*                                   label="Date Published"*/}
                                {/*                                   span={3}>{record.date_published}</Descriptions.Item>*/}

                                {/*                               <Descriptions.Item*/}
                                {/*                                   label="Description"*/}
                                {/*                                   span={3}>{record.body_text}</Descriptions.Item>*/}

                                {/*                               <Descriptions.Item*/}
                                {/*                                   label="Article LInk"*/}
                                {/*                                   span={3}>{record.article_link}</Descriptions.Item>*/}
                                {/*                           </Descriptions>*/}
                                {/*                       </Col>*/}
                                {/*                   </Row>*/}

                                {/*                   <Row>*/}
                                {/*                       <Col span={6}>*/}
                                {/*                       </Col>*/}
                                {/*                       <Col span={18}>*/}
                                {/*                           <Divider orientation="left" plain>*/}
                                {/*                               Adminstrative Actions*/}
                                {/*                           </Divider>*/}
                                {/*                           <TextArea rows={4} style={{marginTop: 10}}*/}
                                {/*                                     placeholder="Please input your justifications (if any)"/>*/}
                                {/*                           <Space wrap style={{marginTop: 10}}>*/}
                                {/*                               <Button onClick={showConfirm}*/}
                                {/*                                       type="primary">Verify</Button>*/}
                                {/*                               <Button onClick={showPromiseConfirm} type="primary"*/}
                                {/*                                       danger>Reject</Button>*/}
                                {/*                               <Button onClick={showPropsConfirm} danger>Revoke*/}
                                {/*                                   Verification</Button>*/}
                                {/*                           </Space>*/}
                                {/*                       </Col>*/}
                                {/*                   </Row>*/}
                                {/*               </>*/}
                                {/*           }}/>*/}
                                {/*</TabPane>*/}
                            </Tabs>
                        </Col>
                        <Col flex="100px"></Col>
                    </Row>
                </>
            }
        </>
    );
}
