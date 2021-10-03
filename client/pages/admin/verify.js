import { useState, useEffect } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import VerificationModal from "../../components/VerificationModal";
import { Table, Tag, Row, Col, Divider } from 'antd';
import { Link } from 'react-router-dom'
import toastr from 'toastr';
import 'toastr/build/toastr.css';

export default function admin() {

    const axios = require("axios");
    axios.defaults.baseURL = 'http://localhost:8080'
    const [data, setData] = useState([]);

    var config = {
        method: 'get',
        url: 'http://localhost:8080/participant/pending-verification',
    };

    axios(config)
        .then(function (response) {
            setData(response.data)
        })
        .catch(function (error) {
            toastr.error(error.response.data, 'An error has occurred')
        });

    const columns = [
      { title: 'ID', dataIndex: 'id', key: 'id' },
      { title: 'Name', dataIndex: 'name', key: 'name' },
//      { title: 'Identity', dataIndex: 'identity', key: 'identity',
//          render: identity => <Tag color={identity ? 'green' : 'volcano'} key={identity}>{identity ? 'Verified' : 'Unverified'}</Tag>,},
//      { title: 'Mobile', dataIndex: 'mobile', key: 'mobile',
//          render: mobile => <Tag color={mobile ? 'green' : 'volcano'} key={mobile}>{mobile ? 'Verified' : 'Unverified'}</Tag>,},
//      { title: 'Organisation', dataIndex: 'organisation', key: 'organisation',
//          render: organisation => <Tag color={organisation ? 'green' : 'volcano'} key={organisation}>{organisation ? 'Verified' : 'Unverified'}</Tag>,},
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
        render: vaxGcsUrl => VerificationModal({vaxGcsUrl}),
      },
    ];

    function onChange(pagination, filters, sorter, extra) {
      console.log('params', pagination, filters, sorter, extra);
    }

    return (
        <>
        <AdminNavbar />
        <Row>
          <Col flex="100px"></Col>
          <Col flex="auto">
              <Divider orientation="left">Verify User Status</Divider>
              <Table
                  columns={columns}
                  dataSource={data}
              />
          </Col>
          <Col flex="100px"></Col>
        </Row>
        </>
    );
}