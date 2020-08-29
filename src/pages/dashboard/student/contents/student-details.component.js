import React from 'react';
import {Card,Row,Col,Statistic} from 'antd';
import { withRouter} from 'react-router-dom';
function StudentDetailsComponent(props) {
    // console.log(props.match.params.id)
    return (
        <>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className="display-row">
            <Col className="gutter-row" span={6}>
                <Card>
                    <Statistic title="Attendence" value={112893} suffix="/ This month" />
                </Card>
            </Col>
            <Col className="gutter-row" span={6}>
                <Card><Statistic title="Attendence" value={112893} suffix="/ This month" /></Card>
            </Col>
            <Col className="gutter-row" span={6}>
                <Card><Statistic title="Attendence" value={112893} suffix="/ This month" /></Card>
            </Col>
            <Col className="gutter-row" span={6}>
                <Card><Statistic title="Attendence" value={112893} suffix="/ This month" /></Card>
            </Col>
            </Row>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className="display-row">
                <Col className="gutter-row" span={18}>
                <Card>
                    <Statistic title="Attendence" value={112893} suffix="/ This month" />
                </Card>
                </Col>
                <Col className="gutter-row" span={6}>
                    <Card><Statistic title="Attendence" value={112893} suffix="/ This month" /></Card>
                </Col>
            </Row>
    </>
    );
}


export default withRouter(StudentDetailsComponent)