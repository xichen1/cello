import React from 'react';
import { injectIntl, useIntl } from 'umi';
import { Modal, message, Select, Form, Tag, Input, Checkbox } from 'antd';
import styles from '../styles.less';

const FormItem = Form.Item;

const channels = [
  { label: 'mychannel1', value: 'mychannel1', disabled: true },
  { label: 'mychannel2', value: 'mychannel2' },
  { label: 'mychannel3', value: 'mychannel3' },
];

const ApproveForm = props => {
  const [form] = Form.useForm();
  const intl = useIntl();
  const {
    approveModalVisible,
    handleApprove,
    handleApproveModalVisible,
    approving,
    fetchChainCodes,
    initFlagChange,
  } = props;

  const approveCallback = response => {
    if (response.status !== 'successful') {
      message.error(
        intl.formatMessage({
          id: 'app.operator.chainCode.form.approve.fail',
          defaultMessage: 'Approve chaincode failed',
        })
      );
    } else {
      message.success(
        intl.formatMessage({
          id: 'app.operator.chainCode.form.approve.success',
          defaultMessage: 'Approve chaincode succeed',
        })
      );
      form.resetFields();
      handleApproveModalVisible();
      fetchChainCodes();
    }
  };

  const onSubmit = () => {
    form.submit();
  };

  const onFinish = values => {
    handleApprove(values, approveCallback);
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
        id: 'app.operator.chainCode.form.approve.header.title',
        defaultMessage: 'Approve Chaincode',
      })}
      confirmLoading={approving}
      visible={approveModalVisible}
      onOk={onSubmit}
      onCancel={() => handleApproveModalVisible(false)}
    >
      <Form onFinish={onFinish} form={form} preserve={false}>
        <FormItem
          {...formItemLayout}
          label={intl.formatMessage({
            id: 'app.operator.chaincode.form.approve.channdel',
            defaultMessage: 'Please select channel',
          })}
          name="channel"
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'app.operator.chaincode.form.approve.checkOrderer',
                defaultMessage: 'Please select channel',
              }),
            },
          ]}
        >
          <Select
            mode="multiple"
            options={channels}
            tagRender={tagRender}
            defaultValue={['mychannel1']}
            dropdownClassName={styles.dropdownClassName}
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={intl.formatMessage({
            id: 'app.operator.chaincode.form.approve.specifyName',
            defaultMessage: 'Name for chaincode',
          })}
          name="name"
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'app.operator.channel.form.approve.specifyName',
                defaultMessage: 'Name for chaincode',
              }),
            },
          ]}
        >
          <Input
            placeholder={intl.formatMessage({
              id: 'app.operator.chainCode.form.approve.name',
              defaultMessage: 'Name',
            })}
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={intl.formatMessage({
            id: 'app.operator.chaincode.form.approve.initFlag',
            defaultMessage: '--init-required flag',
          })}
          name="initFlag"
        >
          <Checkbox onChange={initFlagChange} />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default injectIntl(ApproveForm);
