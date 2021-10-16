import {useEffect, useState} from "react";
import AdminNavbar from "../../components/AdminNavbar";
import Spinner from "../../components/Spinner";
import {
    Badge,
    Breadcrumb,
    Button,
    Col,
    Descriptions,
    Divider,
    Image,
    Input,
    Modal,
    PageHeader,
    Row,
    Space,
    Table,
    Tabs,
    Tag
} from 'antd';
import {ExclamationCircleOutlined, HomeOutlined} from '@ant-design/icons';
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import Cookies from 'js-cookie';


export default function Verify() {
    // Show Spin while loading is true
    const [loading, setLoading] = useState(true);

    // Allocation for Data
    const [data, setData] = useState([]);
    const [allData, setAllData] = useState([]);
    const {TabPane} = Tabs;
    const {TextArea} = Input;

    // Fetch Database Data onLoad
    const axios = require("axios");
    axios.defaults.baseURL = 'https://locus-g3gtexqeba-uc.a.run.app'
    var config = {
        method: 'get',
        url: 'https://locus-g3gtexqeba-uc.a.run.app/admin/pending-verification',
    };

    var config2 = {
        method: 'get',
        url: 'https://locus-g3gtexqeba-uc.a.run.app/admin/all-verification',
    };

    useEffect(() => {
        document.title = 'Locus | Verify Vaccination';
    }, []);

    // Fetch data onLoad
    allData.length === 0 || data.length === 0 ?
        axios(config)
            .then(function (response) {

                for (const obj in response.data) {
                    response.data[obj].key = response.data[obj].id;
                    delete response.data[obj].id;
                }
                setData(response.data)
                axios(config2)
                    .then(function (response2) {
                        for (const obj in response2.data) {
                            response2.data[obj].key = response2.data[obj].id;
                            delete response2.data[obj].id;
                        }
                        setAllData(response2.data)
                    })
                setLoading(false);
            })
            .catch(function (error) {
                setLoading(false);
                toastr.error('An error has occurred')
            }) : null;

    const handleApprove = (id) => {
        const approve = {
            method: 'put',
            url: 'https://locus-g3gtexqeba-uc.a.run.app/admin/accepted-verification/' + id,
        };
        axios(approve)
            .then(function (response) {
                toastr.success('User is now verified!', 'Successfully Verified')
                setData(data.filter(object => object.key !== id));
            })
            .catch(function (error) {
                toastr.options.preventDuplicates = true;
                toastr.error('An error has occurred 1')
            });
    };

    const handleReject = (id) => {
        const reject = {
            method: 'put',
            url: 'https://locus-g3gtexqeba-uc.a.run.app/admin/rejected-verification/' + id,
        };
        axios(reject)
            .then(function (response) {
                setData(data.filter(object => object.key !== id));
                toastr.warning("User's application rejected.", 'Application Rejected')
            })
            .catch(function (error) {
                toastr.options.preventDuplicates = true;
                toastr.error('An error has occurred')
            });
    };

    const columns = [
        {title: 'ID', dataIndex: 'key', key: 'key'},
        {title: 'Name', dataIndex: 'name', key: 'name'},
        {
            title: 'Verification Statuses',
            children: [
                {
                    title: 'Email', dataIndex: 'emailStatus', key: 'emailStatus',
                    render: emailStatus => <Tag color={emailStatus ? 'green' : 'volcano'}
                                                key={emailStatus}>{emailStatus ? 'Verified' : 'Unverified'}</Tag>,
                },
                {
                    title: 'Mobile', dataIndex: 'mobile', key: 'mobile',
                    render: mobile => <Tag color='green' key={mobile}>{'Verified'}</Tag>,
                },
                {
                    title: 'Identity', dataIndex: 'idStatus', key: 'idStatus',
                    render: idStatus => <Tag color={idStatus ? 'green' : 'volcano'}
                                             key={idStatus}>{idStatus ? 'Verified' : 'Unverified'}</Tag>,
                },
                {
                    title: 'Organisation', dataIndex: 'Organisation', key: 'Organisation',
                    render: Organisation => <Tag color={Organisation ? 'green' : 'volcano'}
                                                 key={Organisation}>{Organisation ? 'Verified' : 'Unverified'}</Tag>,
                },
                {
                    title: 'Vaccination', dataIndex: 'vaxStatus', key: 'vaxStatus',
                    render: vaccination => <Tag color={vaccination ? 'green' : 'volcano'}
                                                key={vaccination}>{vaccination ? 'Verified' : 'Unverified'}</Tag>,
                },
                {
                    title: 'Pre-Event Tests', dataIndex: 'pet', key: 'pet',
                    render: pet => <Tag color={pet ? 'green' : 'volcano'}
                                        key={pet}>{pet ? 'Verified' : 'Unverified'}</Tag>,
                },
            ],
        },
    ];

    const showConfirm = (record) => {
        Modal.confirm({
            title: 'Do you want to accept this verification request?',
            icon: <ExclamationCircleOutlined/>,
            content: 'Verification can be revoked subsequently.',
            onOk() {
                handleApprove(record.key);
            },
            onCancel() {
            },
        });
    }

    const showPromiseConfirm = (record) => {
        Modal.confirm({
            title: 'Do you want to reject this verification request?',
            icon: <ExclamationCircleOutlined/>,
            content: 'This action cannot be reverted',
            onOk() {
                handleReject(record.key);
            },
            onCancel() {
            },
        });
    }

    const showPropsConfirm = (record) => {
        Modal.confirm({
            title: 'Are you sure you want to revoke verification?',
            icon: <ExclamationCircleOutlined/>,
            content: 'This action cannot be reverted',
            okText: 'Confirm delete',
            okType: 'danger',
            cancelText: 'Back',
            onOk() {
                handleReject(record.key)
            },
            onCancel() {
            },
        });
    }

    return (
        <>
            {loading ? <Spinner/> :
                <>
                    <AdminNavbar user={Cookies.get('username')}/>
                    <Row>
                        <Col flex="100px"></Col>
                        <Col flex="auto">
                            <Breadcrumb style={{paddingTop: 20}}>
                                <Breadcrumb.Item href="/admin">
                                    <HomeOutlined style={{display: 'inline-flex'}}/>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    <span>Verification</span>
                                </Breadcrumb.Item>
                            </Breadcrumb>
                            <PageHeader
                                className="site-page-header"
                                title="Verification"
                                style={{paddingTop: 0, paddingBottom: 0, paddingLeft: 0}}
                            />
                            <p style={{paddingBottom: 30}}>Verify User Vaccination Status</p>
                            <Tabs defaultActiveKey="1">
                                <TabPane tab="View Pending Verification" key="1">
                                    <Table columns={columns} dataSource={data}
                                           expandable={{
                                               expandedRowRender: record => <>
                                                   <Row>
                                                       <Col span={6} style={{paddingRight: 20}}>
                                                           <Image alt=" "
                                                               src={record.vaxGcsUrl == undefined ? "https://lh3.googleusercontent.com/proxy/52OY-oNJwYh9u5iyJlvznbNdefajaTxIU746WmoPYJWdGBQQjpAJimAc3cM78aoTonSt6aGMfw6bEWac5qKuK_3zJYjidT9uLRe5wEP1Ig" : record.vaxGcsUrl}/>
                                                       </Col>
                                                       <Col span={16}>
                                                           <Descriptions title="User Account Info" bordered>
                                                               <Descriptions.Item
                                                                   label="ID No.">{record.key}</Descriptions.Item>
                                                               <Descriptions.Item label="Account Status" span={2}><Badge
                                                                   status="success" text="Active"/></Descriptions.Item>

                                                               <Descriptions.Item
                                                                   label="Date Created"
                                                                   span={3}>{new Date(record.createdAt).toUTCString()}</Descriptions.Item>
                                                               <Descriptions.Item
                                                                   label="Last Updated"
                                                                   span={3}>{new Date(record.updatedAt).toUTCString()}</Descriptions.Item>

                                                               <Descriptions.Item
                                                                   label="Full Name"
                                                                   span={3}>{record.name}</Descriptions.Item>

                                                               <Descriptions.Item label="Email Address"
                                                                                  span={3}>{record.email}</Descriptions.Item>


                                                               <Descriptions.Item
                                                                   label="Email Verification">{record.emailStatus ?
                                                                   <Badge status="success" text="Verified"/> :
                                                                   <Badge status="error"
                                                                          text="Unverified"/>}</Descriptions.Item>
                                                               <Descriptions.Item
                                                                   label="Mobile Verification" span={2}><Badge
                                                                   status="success"
                                                                   text="Verified"/></Descriptions.Item>

                                                               <Descriptions.Item
                                                                   label="ID Verification"><Badge status="processing"
                                                                                                  text="Processing"/></Descriptions.Item>
                                                               <Descriptions.Item
                                                                   label="Organisation Verification" span={2}><Badge
                                                                   status="default"
                                                                   text="Not Applicable"/></Descriptions.Item>

                                                               <Descriptions.Item
                                                                   label="ACRA No.">N/A</Descriptions.Item>
                                                               <Descriptions.Item
                                                                   label="Organisation Information"
                                                                   span={2}>N/A</Descriptions.Item>

                                                               <Descriptions.Item label="Vaccination Status"
                                                                                  span={3}>{record.vaxStatus === true ?
                                                                   <Badge status="success" text="Verified"/> :
                                                                   <Badge status="processing"
                                                                          text="Processing"/>}</Descriptions.Item>
                                                               <Descriptions.Item label="PET Status (if any)"
                                                                                  span={3}><Badge status="default"
                                                                                                  text="Not Applicable"/></Descriptions.Item>
                                                               <Descriptions.Item label="Event Tags" span={3}>Hobby,
                                                                   Doge
                                                                   Party, Recreation</Descriptions.Item>
                                                               <Descriptions.Item label="News Tags" span={3}>Health,
                                                                   COVID-19, Weddings</Descriptions.Item>
                                                           </Descriptions>
                                                       </Col>
                                                   </Row>

                                                   <Row>
                                                       <Col span={6}>
                                                       </Col>
                                                       <Col span={18}>
                                                           <Divider orientation="left" plain>
                                                               Adminstrative Actions (Verify Vaccination Status)
                                                           </Divider>
                                                           <TextArea rows={4} style={{marginTop: 10}} id={record.key}
                                                                     placeholder="Please input your comments for authorising / rejecting vaccination certification (if any)"/>
                                                           <Space wrap style={{marginTop: 10}}>
                                                               <Button onClick={() => showConfirm(record)}
                                                                       type="primary">Authorise</Button>
                                                               <Button onClick={() => showPromiseConfirm(record)}
                                                                       type="primary" danger>Reject</Button>
                                                           </Space>
                                                       </Col>
                                                   </Row>
                                               </>
                                           }}/>

                                </TabPane>
                                <TabPane tab="View All" key="2">
                                    <Table columns={columns} dataSource={allData}
                                           expandable={{
                                               expandedRowRender: record => <>
                                                   <Row>
                                                       <Col span={6} style={{paddingRight: 20}}>
                                                           <Image alt=" "
                                                               src={record.vaxGcsUrl == undefined ? "https://lh3.googleusercontent.com/proxy/52OY-oNJwYh9u5iyJlvznbNdefajaTxIU746WmoPYJWdGBQQjpAJimAc3cM78aoTonSt6aGMfw6bEWac5qKuK_3zJYjidT9uLRe5wEP1Ig" : record.vaxGcsUrl}/>
                                                       </Col>
                                                       <Col span={18}>
                                                           <Descriptions title="User Account Info" bordered>
                                                               <Descriptions.Item
                                                                   label="ID No.">{record.key}</Descriptions.Item>
                                                               <Descriptions.Item label="Account Status" span={2}><Badge
                                                                   status="success" text="Active"/></Descriptions.Item>

                                                               <Descriptions.Item
                                                                   label="Date Created"
                                                                   span={3}>{new Date(record.createdAt).toUTCString()}</Descriptions.Item>
                                                               <Descriptions.Item
                                                                   label="Last Updated"
                                                                   span={3}>{new Date(record.updatedAt).toUTCString()}</Descriptions.Item>

                                                               <Descriptions.Item
                                                                   label="Full Name"
                                                                   span={3}>{record.name}</Descriptions.Item>

                                                               <Descriptions.Item label="Email Address"
                                                                                  span={3}>{record.email}</Descriptions.Item>


                                                               <Descriptions.Item
                                                                   label="Email Verification">{record.emailStatus ?
                                                                   <Badge status="success" text="Verified"/> :
                                                                   <Badge status="error"
                                                                          text="Unverified"/>}</Descriptions.Item>
                                                               <Descriptions.Item
                                                                   label="Mobile Verification" span={2}><Badge
                                                                   status="success"
                                                                   text="Verified"/></Descriptions.Item>

                                                               <Descriptions.Item
                                                                   label="ID Verification"><Badge status="processing"
                                                                                                  text="Processing"/></Descriptions.Item>
                                                               <Descriptions.Item
                                                                   label="Organisation Verification" span={2}><Badge
                                                                   status="default"
                                                                   text="Not Applicable"/></Descriptions.Item>

                                                               <Descriptions.Item
                                                                   label="ACRA No.">N/A</Descriptions.Item>
                                                               <Descriptions.Item
                                                                   label="Organisation Information"
                                                                   span={2}>N/A</Descriptions.Item>

                                                               <Descriptions.Item label="Vaccination Status"
                                                                                  span={3}>{record.vaxStatus === true ?
                                                                   <Badge status="success" text="Verified"/> :
                                                                   <Badge status="processing"
                                                                          text="Processing"/>}</Descriptions.Item>
                                                               <Descriptions.Item label="PET Status (if any)"
                                                                                  span={3}><Badge status="default"
                                                                                                  text="Not Applicable"/></Descriptions.Item>
                                                               <Descriptions.Item label="Event Tags" span={3}>Hobby,
                                                                   Doge
                                                                   Party, Recreation</Descriptions.Item>
                                                               <Descriptions.Item label="News Tags" span={3}>Health,
                                                                   COVID-19, Weddings</Descriptions.Item>
                                                           </Descriptions>
                                                       </Col>
                                                   </Row>

                                                   <Row>
                                                       <Col span={6}>
                                                       </Col>
                                                       { record.vaxStatus == true ?
                                                       <Col span={18}>
                                                           <Divider orientation="left" plain>
                                                               Adminstrative Actions
                                                           </Divider>
                                                           <TextArea rows={4} style={{marginTop: 10}}
                                                                     placeholder="Please input your justifications (if any)"/>
                                                           <Space wrap style={{marginTop: 10}}>
                                                               <Button onClick={() => showPropsConfirm(record)} danger>Revoke
                                                                   Verification</Button>
                                                           </Space>
                                                       </Col>:<></>}
                                                   </Row>
                                               </>
                                           }}/>
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
