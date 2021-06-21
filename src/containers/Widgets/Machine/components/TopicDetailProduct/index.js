// Libraries
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

// Components
import Progress from "../../../../../components/uielements/progress";

// Config
import { colorStatus } from "../../Machine.config";

// Styles
import {LabelProgress, CustomDetailWrapper} from './TopicDetailProduct.styles';

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

function TopicDetailProduct(props) {
  const {topic = {}, status} = props;

  let prodValue;

  if(topic.message && topic.message.payload) {
      prodValue = Object.getOwnPropertyNames(topic.message.payload);
  }

  return (
    <CustomDetailWrapper style={{padding: '10px 0px'}}>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Progress
            style={{margin: "0px 10px 10px 10px"}}
            type="circle"
            width={100}
            percent={topic.message.payload[prodValue][18] / 100}
            strokeColor={statusColor(status)}
            format={(percent) => <LabelProgress style={{status: status}}>{`${percent}%`}</LabelProgress>}
        />
      </div>
      <div className='flex-row'>
          <div className='flex-column'>
              <strong style={{fontSize: "18px"}}>{topic.message.payload[prodValue][18]}</strong>
              <div>Parts</div>
          </div>
          <div className='flex-column'>
              <strong style={{fontSize: "18px"}}>{topic.message.payload[prodValue][17] / 1000} %</strong>
              <div>OEE</div>
          </div>
          <div className='flex-column'>
              <strong style={{fontSize: "18px"}}>{topic.message.payload[prodValue][1]}</strong>
              <div>Rejects</div>
          </div>
      </div>
      <div style={{fontSize: 11}} className='footer'>
          Last Seen: {moment(topic.updatedAt).format('YYYY/MM/DD, h:mm:ss a')}
      </div>
    </CustomDetailWrapper>
  )
}

TopicDetailProduct.propTypes = {
    topic: PropTypes.object
}

export default TopicDetailProduct
