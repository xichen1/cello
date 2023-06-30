/*
 SPDX-License-Identifier: Apache-2.0
*/
import React, { PureComponent } from 'react';
import { connect, injectIntl } from 'umi';
import { Card, Descriptions, Divider, List, Typography } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const { Title } = Typography;

@connect(({ chainCode, loading }) => ({
  chainCode,
  loadingChainCodeDetail: loading.effects['chainCode/getChainCode'],
}))
class ChainCodeDetail extends PureComponent {
  componentDidMount() {
    this.fetchChainCodeDetail();
  }

  componentWillUnmount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'chainCode/clear',
    });
  }

  fetchChainCodeDetail = () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'chainCode/getChainCode',
      // Comment following lines for demo, uncomment for production
      // payload: {
      //   id: this.props.match.params.id,
      // },
    });
  };

  render() {
    // console.log("hello "+ this.props.match.params.id)
    const data = [
      { title: 'peer 1', des: 'description 1' },
      { title: 'peer 2', des: 'description 2' },
      { title: 'peer 3', des: 'description 3' },
    ];

    const {
      // chainCode: { chaincodeDetail },
      intl,
    } = this.props;

    return (
      <PageHeaderWrapper
        title={intl.formatMessage({
          id: 'app.operator.chainCodeDetail.title',
          defaultMessage: 'Chaincode Detail',
        })}
      >
        <Card bordered={false}>
          <Descriptions title="Chaincode cc1" column={2}>
            <Descriptions.Item label="Name">cc1</Descriptions.Item>
            <Descriptions.Item label="Version">v1</Descriptions.Item>
            <Descriptions.Item label="Language">golang</Descriptions.Item>
            <Descriptions.Item label="sha256sum">
              a971e147ef8f411b4a2476bba1de26b9a9a84553c43a90204f662ca72ee93910
            </Descriptions.Item>
            <Descriptions.Item label="Description">This is the description</Descriptions.Item>
          </Descriptions>
          <Divider />
          <Title level={5}>Installed Nodes</Title>
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta title={item.title} description={item.des} />
              </List.Item>
            )}
          />
          {/* // <StandardTable
            //   selectedRows={selectedRows}
            //   loading={loadingChainCodes}
            //   rowKey="id"
            //   data={{
            //     list: chainCodes,
            //     pagination,
            //   }}
            //   columns={columns}
            //   onSelectRow={this.handleSelectRows}
            //   onChange={this.handleTableChange}
            // />  */}
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default injectIntl(ChainCodeDetail);
