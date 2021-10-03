import React, { useState } from 'react';
import { Form, Image, Modal, Button, Checkbox } from 'antd';
import { LinkOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import toastr from 'toastr';
import 'toastr/build/toastr.css';

export default function VerificationModal(link, name) {
  const { TextArea } = Input;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isTextAreaVisible, setTextAreaVisible] = useState(false);

  const axios = require("axios");
  axios.defaults.baseURL = 'http://localhost:8080'

  const showModal = () => {
    console.log(name);
    setIsModalVisible(true);
  };

  const handleApprove = () => {
      var config = {
          method: 'put',
          url: 'http://localhost:8080/participant/accepted-verification/12',
          data: {
            id : "12",
            name : "Hello wolrd",
            vaxStatus : true,
            vaxGcsUrl : "www.facebook.com"
          }
      };
      axios(config)
          .then(function (response) {
              console.log(response.data)
          })
          .catch(function (error) {
              toastr.error('An error has occurred')
          });
      setIsModalVisible(false);
  };

  const handleReject = () => {
      var config = {
          method: 'put',
          url: 'http://localhost:8080/participant/12',
          data: form
      };
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <LinkOutlined style={{verticalAlign: 'baseline'}} onClick={showModal} />
      <Modal title="Verify Vaccination Certificate" visible={isModalVisible} onCancel={handleCancel}
          footer={[
             <Button key="cancel" onClick={handleCancel}>
               Cancel
             </Button>,
             <Button key="reject" type="danger" onClick={handleReject}>
                Reject
             </Button>,
             <Button key="approve" type="primary" onClick={handleApprove}>
                Approve
             </Button>
             ]}>
        <img src={link.vaxGcsUrl} />
        <Form >
            <Form.Item >
                <TextArea placeholder="Please enter reasons for accepting/rejecting." rows={4} />
            </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
