// Libraries
import React from 'react'
import PropTypes from 'prop-types'
import {Row, Col} from 'antd';
import moment from 'moment'

// Config
import { colorStatus } from "../../Machine.config";

// Styles
import {CustomDetailWrapper} from './TopicDetailDiagnostic.styles';

// Icons
import {CaretRightOutlined, StopOutlined} from '@ant-design/icons';

const statusColor = (status) => {
    switch (status) {
      case 1:
        return colorStatus.stopped;
      case 2:
        return colorStatus.running;
      case 3:
        return colorStatus.alarm;
      case 4:
        return colorStatus.plannedStop;
      case 9:
        return colorStatus.comError;
      default:
        return colorStatus.default;
    }
  }

function TopicDetailDiagnostic(props) {
    const {topic = {}, status} = props;

    return (
        <CustomDetailWrapper style={{padding: '10px 0px'}}>
            <div style={{padding: '0px 20px'}}>
                <Row style={{width: '100%'}}>
                    <Col span={8} className='text-center'></Col>
                    <Col span={8} className='text-center'>Count</Col>
                    <Col span={8} className='text-center'>Times</Col>
                </Row>
                <Row style={{width: '100%', color: '#f5222d'}}>
                    <Col span={8} className='flex-row'><strong>Errors</strong></Col>
                    <Col span={8} className='text-center'>{topic.template[0].length}</Col>
                    <Col span={8} className='text-center'>Times</Col>
                </Row>
                <Row style={{width: '100%', color: '#fadb14'}}>
                    <Col span={8} className='flex-row'><strong>Alarms</strong></Col>
                    <Col span={8} className='text-center'>{topic.template[1].length}</Col>
                    <Col span={8} className='text-center'>Times</Col>
                </Row>
                <Row style={{width: '100%', color: '#13c2c2'}}>
                    <Col span={8} className='flex-row'><strong>Warnings</strong></Col>
                    <Col span={8} className='text-center'>{topic.template[2].length}</Col>
                    <Col span={8} className='text-center'>Times</Col>
                </Row>
            </div>
            <div style={{fontSize: 11}} className='footer'>
                Last Seen: {moment(topic.updatedAt).format('YYYY/MM/DD, h:mm:ss a')}
            </div>
        </CustomDetailWrapper>
    )
}

TopicDetailDiagnostic.propTypes = {
    topic: PropTypes.object
}

export default TopicDetailDiagnostic
