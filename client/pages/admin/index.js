import { useState, useEffect } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import { Row, Col, Card, Divider, Button, Meta } from 'antd';
import { AlertOutlined } from '@ant-design/icons';

export default function admin() {
    return (
        <>
        <AdminNavbar />
        <Row>
          <Col flex="100px"></Col>
          <Col flex="auto">
              <Divider orientation="left">System Administrative Tools</Divider>
              <Row justify="space-around" gutter={[16, 24]}>
                  <Card hoverable title="Content Management System" style={{ width: 300 }}>
                    <p>Add, edit or delete announcements shown on Locus Website</p>
                  </Card>
                  <Card hoverable title="Manage events" style={{ width: 300 }}>
                    <p>Review and manage all existing Locus Event Listings</p>
                  </Card>
                  <Card hoverable title="Manage users" style={{ width: 300 }}>
                    <p>View User activities and manage their profiles</p>
                  </Card>
              </Row>
              <Row justify="space-around" gutter={[16, 24]} style={{paddingTop: 50}}>
                  <Card hoverable title="Send mass emails" style={{ width: 300 }}>
                    <p>Send mass emails to Locus Users based on criterias</p>
                  </Card>
                  <Card hoverable title="Verify statuses" style={{ width: 300 }} onClick={(e) => {window.location.href='/admin/verify';}}>
                    <p>View and grant verification badges to users based on their proofs</p>
                  </Card>
                  <Card hoverable title="Global preferences" style={{ width: 300 }}>
                    <p>Manage global settings on Locus Webpage</p>
                  </Card>
              </Row>
          </Col>
          <Col flex="100px"></Col>
        </Row>
        </>
    );
}