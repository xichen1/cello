import React from 'react';
import { injectIntl, useIntl } from 'umi';
import { Modal, message, Select, Form, Tag } from 'antd';
import styles from '../styles.less';

const FormItem = Form.Item;
const nodes = [
  { label: 'peer0.org1.cello.com', value: 'peer0.org1.cello.com', disabled: true },
  { label: 'peer1.org1.cello.com', value: 'peer1.org1.cello.com' },
  { label: 'peer2.org1.cello.com', value: 'peer2.org1.cello.com' },
];

const InstallForm = props => {
  const [form] = Form.useForm();
  const intl = useIntl();
  const {
    installModalVisible,
    handleInstall,
    handleInstallModalVisible,
    installing,
    fetchChainCodes,
  } = props;

  const installCallback = response => {
    if (response.status !== 'successful') {
      message.error(
        intl.formatMessage({
          id: 'app.operator.chainCode.form.install.fail',
          defaultMessage: 'Install chaincode failed',
        })
      );
    } else {
      message.success(
        intl.formatMessage({
          id: 'app.operator.chainCode.form.install.success',
          defaultMessage: 'Install chaincode succeed',
        })
      );
      form.resetFields();
      handleInstallModalVisible();
      fetchChainCodes();
    }
  };

  const onSubmit = () => {
    form.submit();
  };

  const onFinish = values => {
    handleInstall(values, installCallback);
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 7 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
      md: { span: 10 },
    },
  };

  // eslint-disable-next-line no-shadow
  const tagRender = props => {
    const { label, closable, onClose } = props;
    const onPreventMouseDown = event => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color="cyan"
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    );
  };

  return (
    <Modal
      destroyOnClose
      title={intl.formatMessage({
        id: 'app.operator.chainCode.form.install.header.title',
        defaultMessage: 'Install Chaincode',
      })}
      confirmLoading={installing}
      visible={installModalVisible}
      onOk={onSubmit}
      onCancel={() => handleInstallModalVisible(false)}
    >
      <Form onFinish={onFinish} form={form} preserve={false}>
        <FormItem
          {...formItemLayout}
          label={intl.formatMessage({
            id: 'app.operator.chaincode.form.install.nodes',
            defaultMessage: 'Please select nodes',
          })}
          name="nodes"
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'app.operator.channel.form.create.checkOrderer',
                defaultMessage: 'Please select orderer',
              }),
            },
          ]}
        >
          <Select
            mode="multiple"
            options={nodes}
            tagRender={tagRender}
            defaultValue={['peer0.org1.cello.com']}
            dropdownClassName={styles.dropdownClassName}
          />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default injectIntl(InstallForm);
