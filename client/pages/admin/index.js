import { useState, useEffect } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import { Row, Col, Card, Divider } from 'antd';

export default function admin() {
    return (
        <>
        <AdminNavbar />
        <Divider orientation="left">sub-element align full</Divider>
        <Row justify="space-around">
          <Col span={6} >col-4</Col>
          <Col span={6}>col-4</Col>
          <Col span={6}>col-4</Col>
        </Row>
        </>
    );
}