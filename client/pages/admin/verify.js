import { useState, useEffect } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import { Table, Input, Tag, Row, Col, Divider, Spin, Form, Modal, Button } from 'antd';
import { LinkOutlined } from '@ant-design/icons';
import toastr from 'toastr';
import 'toastr/build/toastr.css';

export default function Admin() {

    // Allocation for Data
    const [data, setData] = useState([]);

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
      { title: 'ID', dataIndex: 'id', key: 'id' },
      { title: 'Name', dataIndex: 'name', key: 'name' },
      { title: 'Vaccination', dataIndex: 'vaxStatus', key: 'vaxStatus',
          render: vaccination => <Tag color={vaccination ? 'green' : 'volcano'} key={vaccination}>{vaccination ? 'Verified' : 'Unverified'}</Tag>,
      },
      { title: 'Pre-Event Tests', dataIndex: 'pet', key: 'pet',
         render: pet => <Tag color={pet ? 'green' : 'volcano'} key={pet}>{pet ? 'Verified' : 'Unverified'}</Tag>,
      },
      {
        title: 'Action',
        dataIndex: 'vaxGcsUrl',
        key: 'vaxGcsUrl',
        render: (text, record, index) => <LinkOutlined style={{verticalAlign: 'baseline'}} onClick={(e) => {setModalInfo(record);showModal();}} />,
      },
    ];

    function onChange(pagination, filters, sorter, extra) {
      console.log('params', pagination, filters, sorter, extra);
    }

    return (
        <>
        <AdminNavbar />
          <Modal title={"Review Vaccination Proof: " + modalInfo.name } visible={isModalVisible} onCancel={() => {handleCancel(); setModalInfo([]); setComment();}}
              footer={[
                 <Button key="cancel" onClick={() => {handleCancel(); setModalInfo([]); setComment();}}>
                   Cancel
                 </Button>,
                 <Button key="reject" type="danger" onClick={handleReject}>
                    Reject
                 </Button>,
                 <Button key="approve" type="primary" onClick={handleApprove}>
                    Approve
                 </Button>
                 ]}>
                 <img src={modalInfo.vaxGcsUrl} style={{marginBottom: 20}}/>
            <Form >
                <Form.Item >
                    <TextArea placeholder="Please enter reasons for accepting/rejecting." rows={4} />
                </Form.Item>
            </Form>
          </Modal>
        <Row>
          <Col flex="100px"></Col>
          <Col flex="auto">
              <Divider orientation="left">Verify User Status</Divider>
              {loading ? <Spin tip="Loading data from database..." style={{display: 'block'}}/> : <Table columns={columns} dataSource={data}/>}

          </Col>
          <Col flex="100px"></Col>
        </Row>
        </>
    );
}
