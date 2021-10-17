import {Fragment, useEffect} from "react";
import AdminNavbar from "../../components/AdminNavbar";
import {Row, Col, Card, Divider, Button, Meta, Breadcrumb, PageHeader} from 'antd';
import {
    AlertOutlined,
    HomeOutlined,
    SlidersTwoTone,
    CheckCircleTwoTone,
    NotificationTwoTone,
    MessageTwoTone,
    ScheduleTwoTone,
    SmileTwoTone
} from '@ant-design/icons';
import Cookies from 'js-cookie';

export default function admin() {
    const {Meta} = Card;
    useEffect(() => {
        document.title = 'Locus | System Administrator';
    }, []);
    return (
        <>
            <AdminNavbar user = {Cookies.get('username')}/>
            <Row>
                <Col flex="200px"></Col>
                <Col flex="auto">
                    <PageHeader
                        className="site-page-header"
                        title="System Administrative Tools"
                        style={{paddingTop: 20, paddingBottom: 0, paddingLeft: 0}}
                    />
                    <p style={{paddingBottom: 30}}>{"Hi " + Cookies.get('username') + ", start managing Locus with the tools below."}</p>
                    <Row justify="space-around" gutter={[16, 24]}>
                        <Card hoverable style={{width: 300}} onClick={(e) => {
                            window.location.href = '/admin/cms';
                        }}>
                            <Meta title={<Fragment><NotificationTwoTone
                                style={{display: 'inline-flex'}}/><br/> {"Content Management System"}</Fragment>}
                                  description="Add, edit or delete announcements shown on Locus Website"/>
                        </Card>
                        <Card hoverable style={{width: 300}}onClick={(e) => {
                            window.location.href = '/admin/manage-events';
                        }}>
                            <Meta title={<Fragment><ScheduleTwoTone
                                style={{display: 'inline-flex'}}/><br/> {"Manage Events"}</Fragment>}
                                  description="Review and manage all existing Locus Event Listings"/>
                        </Card>
                        <Card hoverable style={{width: 300}} onClick={(e) => {
                            window.location.href = '/admin/manage-users';
                        }}>
                            <Meta
                                title={<Fragment><SmileTwoTone style={{display: 'inline-flex'}}/><br/> {"Manage users"}
                                </Fragment>}
                                description="View User activities and manage their profiles"/>
                        </Card>
                    </Row>
                    <Row justify="space-around" gutter={[16, 24]} style={{paddingTop: 50}}>
                        <Card hoverable style={{width: 300}}>
                            <Meta title={<Fragment><MessageTwoTone
                                style={{display: 'inline-flex'}}/><br/> {"Send mass emails"}</Fragment>}
                                  description="Send mass emails to Locus Users based on criterion"/>
                        </Card>
                        <Card hoverable style={{width: 300}} onClick={(e) => {
                            window.location.href = '/admin/verify';
                        }}>
                            <Meta title={<Fragment><CheckCircleTwoTone
                                style={{display: 'inline-flex'}}/><br/> {"Verify statuses"}</Fragment>}
                                  description="View and grant verification badges to users based on their proofs"/>
                        </Card>
                        <Card hoverable style={{width: 300}}>
                            <Meta title={<Fragment><SlidersTwoTone
                                style={{display: 'inline-flex'}}/><br/> {"Global settings"}</Fragment>}
                                  description="Manage global settings on Locus Webpage"/>
                        </Card>
                    </Row>
                </Col>
                <Col flex="200px"></Col>
            </Row>
        </>
    );
}