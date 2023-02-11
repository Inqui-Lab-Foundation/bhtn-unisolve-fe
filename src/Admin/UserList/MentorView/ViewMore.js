/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import Layout from '../../Layout';
import { Container, Row, Card, CardBody, CardText, Col } from 'reactstrap';
import DoughnutChart from '../../../Teachers/Dashboard/DoughnutChart';
import { Button } from '../../../stories/Button';
import axios from 'axios';

const ViewMore = () => {
    const history = useHistory();
    const [orgDaTa, setOrgData] = useState({});
    const MentorData =
        (history && history.location && history.location.data) || {};
    var teamId = [];
    teamId.push({ mentor_id: MentorData.mentor_id });
    
    const handleBack = () => {
        history.push({
            pathname: '/admin/mentorDetails',
            data:MentorData
        });
    };
    useEffect(() => {
        apiCall(MentorData.organization_code);
    }, []);

    async function apiCall(Ocode) {
            // Dice code list API //
            // list= Dise code  //
            const body = JSON.stringify({
                organization_code: Ocode
            });
            var config = {
                method: 'post',
                url: process.env.REACT_APP_API_BASE_URL + '/organizations/checkOrg',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: body
            };
    
            await axios(config)
                .then(function (response) {
                    if (response.status == 200) {
                        setOrgData(response?.data?.data[0]);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    return (
        <Layout>
            <Container className="mt-5 pt-5 dynamic-form">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <p>hihi</p>
                    <Button
                        label="Back"
                        btnClass="primary"
                        size="small"
                        onClick={
                            handleBack
                        }
                    />
                </div>
                <Row>
                    <Card className="py-5">
                        <CardBody>
                            <h2 className="mb-4">Organization Details</h2>

                            <CardText>
                                <span className="mx-3">
                                    <b>principal Name :</b>
                                </span>
                                <b>{orgDaTa.principal_name}</b>
                            </CardText>
                            <CardText>
                                <span className="mx-3">
                                    <b>principal Email :</b>
                                </span>
                                <b>{orgDaTa.principal_email}</b>
                            </CardText>
                            <CardText>
                                <span className="mx-3">
                                    <b>organization Name :</b>
                                </span>
                                <b>{orgDaTa.organization_name}</b>
                            </CardText>
                            <CardText>
                                <span className="mx-3">
                                    <b>organization Code :</b>
                                </span>
                                <b>{orgDaTa.organization_code}</b>
                            </CardText>
                            <CardText>
                                <span className="mx-3">
                                    <b>City :</b>
                                </span>
                                <b>{orgDaTa.city}</b>
                            </CardText>
                            <CardText>
                                <span className="mx-3">
                                    <b>District :</b>
                                </span>
                                <b>{orgDaTa.district}</b>
                            </CardText>
                            <CardText>
                                <span className="mx-3">
                                    <b>state :</b>
                                </span>
                                <b>{orgDaTa.state}</b>
                            </CardText>
                            <CardText>
                                <span className="mx-3">
                                    <b>Country :</b>
                                </span>
                                <b>{orgDaTa.country}</b>
                            </CardText>
                        </CardBody>
                    </Card>
                    <Row className="py-5">
                        <Card className="py-5">
                            <CardBody>
                                <h2 className="mb-4">Mentor Details</h2>
                                <CardText>
                                    <span className="mx-3">
                                        <b>Mentor Name :</b>
                                    </span>
                                    <b>{MentorData.full_name}</b>
                                </CardText>
                                <CardText>
                                    <span className="mx-3">
                                        <b>Mentor Id :</b>
                                    </span>
                                    <b>{MentorData.mentor_id}</b>
                                </CardText>
                            </CardBody>
                        </Card>
                    </Row>
                    <Row className="teacher-statistics bg-white p-5">
                        <Row className="">
                            <Col>
                                <div className="d-flex flex-wrap">
                                    <DoughnutChart
                                        user={teamId}
                                        dashBoard={'Admin'}
                                    />
                                </div>
                            </Col>
                        </Row>
                    </Row>
                </Row>
            </Container>
        </Layout>
    );
};
export default withRouter(ViewMore);
