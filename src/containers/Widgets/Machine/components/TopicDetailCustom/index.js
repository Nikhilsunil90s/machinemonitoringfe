// Libraries
import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Row, Col, Table} from 'antd';
import moment from 'moment'

// Styles
import {CustomDetailWrapper} from './TopicDetailCustom.styles';

const columns = [
    {
        title: 'Parameter',
        dataIndex: 'parameter',
        key: 'parameter',
        align: 'center'
    },
    {
        title: 'Value/State',
        dataIndex: 'value',
        key: 'value',
        align: 'center'
    },
]

function TopicDetailDiagnostic(props) {
    const {topic = {}, status} = props;

    const [data, setData] = useState([
        {key: 1, parameter: 'Valve 12', value: 'Colsed'},
        {key: 2, parameter: 'Status', value: 'Running'}
    ]);

    return (
        <CustomDetailWrapper style={{padding: '10px 0px'}}>
            <Table style={{marginTop: 5}} columns={columns} dataSource={data} pagination={false} size='small' />
            <div style={{fontSize: 11}} className='footer'>
                Last Seen: {moment(topic.updatedAt || new Date()).format('YYYY/MM/DD, h:mm:ss a')}
            </div>
        </CustomDetailWrapper>
    )
}

TopicDetailDiagnostic.propTypes = {
    topic: PropTypes.object
}

export default TopicDetailDiagnostic
