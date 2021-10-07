import { useState, useEffect } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import { Image, Table, Breadcrumb, Descriptions, Input, Tag, Tabs, Row, Col, Spin, Form, Modal, Button, PageHeader } from 'antd';
import { LinkOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import toastr from 'toastr';
import 'toastr/build/toastr.css';

export default function admin() {

    // Allocation for Data
    const [data, setData] = useState([]);
    const [allData, setAllData] = useState([])

    const { TabPane } = Tabs;

    // Show Spin while loading is true
    const [loading, setLoading] = useState(true);

    // Fetch Database Data onLoad
    const axios = require("axios");
    axios.defaults.baseURL = 'http://localhost:8080'
    var config = {
            method: 'get',
            url: 'http://localhost:8080/participant/pending-verification',
        };

    // Fetch data onLoad
    axios(config)
        .then(function (response) {
            setLoading(false);
            for (const obj in response.data) {
                response.data[obj].key = response.data[obj].id;
                delete response.data[obj].id;
            }
            setData(response.data)
        })
        .catch(function (error) {
            setLoading(false);
            toastr.error('An error has occurred')
        });

    // Modal Dialog
    const { TextArea } = Input;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isTextAreaVisible, setTextAreaVisible] = useState(false);
    const [modalInfo, setModalInfo] = useState([]);
    const [comment, setComment] = useState();

    const showModal = () => {
        console.log(name);
        setIsModalVisible(true);
      };

    const handleApprove = () => {
      var config = {
          method: 'put',
          url: 'http://localhost:8080/participant/accepted-verification/' + modalInfo.id,
      };
      axios(config)
          .then(function (response) {
              toastr.success(modalInfo.name + 'is now verified!', 'Successfully Verified')
              console.log(response.data)
          })
          .catch(function (error) {
              toastr.options.preventDuplicates = true;
              toastr.error('An error has occurred')
          });
      setIsModalVisible(false);
      window.location.reload()
    };

    const handleReject = () => {
      var config = {
          method: 'put',
          url: 'http://localhost:8080/participant/rejected-verification/' + modalInfo.id,
      };
      axios(config)
            .then(function (response) {
                toastr.warning(modalInfo.name + ' application is rejected.', 'Application Rejected')
                console.log(response.data)
            })
            .catch(function (error) {
                toastr.options.preventDuplicates = true;
                toastr.error('An error has occurred')
            });
        setIsModalVisible(false);
        window.location.reload()
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const columns = [
      { title: 'ID', dataIndex: 'key', key: 'key' },
      { title: 'Name', dataIndex: 'name', key: 'name' },
      { title: 'Verification Statuses',
        children: [
          { title: 'Email', dataIndex: 'emailStatus', key: 'emailStatus',
                render: emailStatus => <Tag color={emailStatus ? 'green' : 'volcano'} key={emailStatus}>{emailStatus ? 'Verified' : 'Unverified'}</Tag>,
          },
          { title: 'Mobile', dataIndex: 'Mobile', key: 'Mobile',
                render: Organisation => <Tag color={Organisation ? 'green' : 'volcano'} key={Organisation}>{Organisation ? 'Verified' : 'Unverified'}</Tag>,
          },
          { title: 'Identity', dataIndex: 'idStatus', key: 'idStatus',
                render: idStatus => <Tag color={idStatus ? 'green' : 'volcano'} key={idStatus}>{idStatus ? 'Verified' : 'Unverified'}</Tag>,
          },
          { title: 'Organisation', dataIndex: 'Organisation', key: 'Organisation',
                render: Organisation => <Tag color={Organisation ? 'green' : 'volcano'} key={Organisation}>{Organisation ? 'Verified' : 'Unverified'}</Tag>,
          },
          { title: 'Vaccination', dataIndex: 'vaxStatus', key: 'vaxStatus',
              render: vaccination => <Tag color={vaccination ? 'green' : 'volcano'} key={vaccination}>{vaccination ? 'Verified' : 'Unverified'}</Tag>,
          },
          { title: 'Pre-Event Tests', dataIndex: 'pet', key: 'pet',
             render: pet => <Tag color={pet ? 'green' : 'volcano'} key={pet}>{pet ? 'Verified' : 'Unverified'}</Tag>,
          },
        ],
      },
      {
        title: 'Action',
        dataIndex: 'vaxGcsUrl',
        key: 'vaxGcsUrl',
        render: (text, record, index) => <><Button type="primary">Approve</Button><Button type="primary" danger onClick={(e) => {setModalInfo(record);showModal();}}>Reject</Button></>,
      },
    ];

    function onChange(pagination, filters, sorter, extra) {
      console.log('params', pagination, filters, sorter, extra);
    }

    return (
        <>
        {loading ? <div style={{backgroundColor: "white", position: "unset", height: "100vh" ,width: "100vh", marginRight: 0,}}><img src="/logo-spinner.gif" height={30} width={250} style={{position: "absolute", top: 0, left: 0, right: 0, bottom: 0, margin: "auto"}}/></div> :
            <>
            <AdminNavbar />
            <Row>
                <Col flex="100px"></Col>
                <Col flex="auto">
                <Breadcrumb style={{paddingTop: 20}}>
                    <Breadcrumb.Item href="/admin">
                        <HomeOutlined style={{display: 'inline-flex'}} />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <span>Verification</span>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <PageHeader
                    className="site-page-header"
                    title="Verification"
                    subTitle="Verify User Vaccination Status"
                    style={{paddingTop: 0, paddingBottom: 30, paddingLeft: 0}}
                />
                <Tabs defaultActiveKey="1">
                    <TabPane tab="View Pending Verification" key="1">
                        <Table columns={columns} dataSource={data}
                            expandable={{
                                expandedRowRender: record => <Row><Col span={6}> <img src={record.vaxGcsUrl} /></Col>
                                <Col span={18}>
                                    <Descriptions title="User Account Info" bordered>
                                        <Descriptions.Item label="ID No.">{record.key}</Descriptions.Item>
                                        <Descriptions.Item label="Full Name">{record.name}</Descriptions.Item>
                                        <Descriptions.Item label="Email Address" span={2}>{record.email}</Descriptions.Item>
                                        <Descriptions.Item label="Date Created">2018-04-24 18:00:00</Descriptions.Item>
                                        <Descriptions.Item label="Last Updated" >2019-04-24 18:00:00</Descriptions.Item>
                                        <Descriptions.Item label="Account Status" >2019-04-24 18:00:00</Descriptions.Item>
                                        <Descriptions.Item label="Email Verification">{record.emailStatus}</Descriptions.Item>
                                        <Descriptions.Item label="Mobile Verification">{record.emailStatus}</Descriptions.Item>
                                        <Descriptions.Item label="ID Verification"></Descriptions.Item>
                                        <Descriptions.Item label="Organisation Verification"></Descriptions.Item>
                                        <Descriptions.Item label="ACRA No.">{record.emailStatus}</Descriptions.Item>
                                        <Descriptions.Item label="Organisation Information">{record.emailStatus}</Descriptions.Item>
                                        <Descriptions.Item label="Vaccination Status" span={3}>{record.vaxStatus}</Descriptions.Item>
                                        <Descriptions.Item label="PET Status (if any)" span={3}>{record.pet}</Descriptions.Item>
                                        <Descriptions.Item label="Event Tags" span={3}>Hobby, Doge Party, Recreation</Descriptions.Item>
                                        <Descriptions.Item label="News Tags" span={3}>Hobby, Doge Party, Recreation</Descriptions.Item>
                                    </Descriptions>
                                    </Col>
                                </Row>
                                ,
                                rowExpandable: record => record.vaxGcsUrl !== "",
                        }}/>

                    </TabPane>
                    <TabPane tab="View All" key="2">
                      Content of Tab Pane 2
                    </TabPane>
                </Tabs>
                </Col>
                <Col flex="100px"></Col>
            </Row>
            </>
        }
        </>
    );
}
