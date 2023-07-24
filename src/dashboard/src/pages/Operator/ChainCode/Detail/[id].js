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
            <Descriptions.Item label="PackageID">
              cc1v1:Cc7bb5f50a53c207f68d37e9423c32f968083282e5ffac00d41ffc5768dc1873
            </Descriptions.Item>
            <Descriptions.Item label="Version">v1</Descriptions.Item>
            <Descriptions.Item label="Chaincode Language">golang</Descriptions.Item>
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
