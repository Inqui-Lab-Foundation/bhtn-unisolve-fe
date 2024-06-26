/* eslint-disable no-unused-vars */
import React, { useEffect, useLayoutEffect, useState } from 'react';
import './dashboard.scss';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
//import VerticalLinearStepper from './StepperComponent';
// import Charts from './Chart';
// import BarChart from './BarChart';
import { getCurrentUser } from '../../helpers/Utils';
import institutions from '../../assets/media/img/university.png';
import districtImg from '../../assets/media/img/building.png';
import idea from '../../assets/media/img/idea.png';
import people from '../../assets/media/img/people.png';
import Layout from '../Layout';
import { useDispatch } from 'react-redux';
import { getDashboardStates } from '../store/dashboard/actions';
import DoubleBounce from '../../components/Loaders/DoubleBounce';
import DoughnutChart from './DoughnutChart';
import { Card } from 'react-bootstrap';
import LatestScrollNew from './LatestScrollNew';
import axios from 'axios';

const Dashboard = () => {
    const dispatch = useDispatch();
    const currentUser = getCurrentUser('current_user');
    const { dashboardStates } = useSelector((state) => state.teacherDashBoard);
    const presurveyStatus = useSelector(
        (state) => state?.mentors.teacherPresurveyStatus
    );
    const history = useHistory();
    useLayoutEffect(() => {
        if (presurveyStatus !== 'COMPLETED')
            history.push('/teacher/pre-survey');
    }, []);

    useEffect(() => {
        dispatch(getDashboardStates(currentUser?.data[0]?.user_id));
    }, [dispatch, currentUser?.data[0]?.user_id]);
    useEffect(() => {
        if (currentUser?.data[0]?.user_id) {
            mentorTeamsCount();
            mentorIdeaCount();
            mentorStudentCount();
            mentorcoursepercentage();
        }
    }, [currentUser?.data[0]?.user_id]);
    const [teamsCount, setTeamsCount] = useState('-');
    const [ideaCount, setIdeaCount] = useState('-');
    const [studentCount, setStudentCount] = useState('-');
    const [coursepercentage, setCoursepercentage] = useState('-');
    const mentorTeamsCount = () => {
        var config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                `/dashboard/teamCount?mentor_id=${currentUser?.data[0]?.mentor_id}`,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${currentUser.data[0]?.token}`
            }
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setTeamsCount(response.data.data[0].teams_count);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const mentorIdeaCount = () => {
        var config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                `/dashboard/ideaCount?mentor_id=${currentUser?.data[0]?.mentor_id}`,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${currentUser.data[0]?.token}`
            }
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setIdeaCount(response.data.data[0].idea_count);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const mentorStudentCount = () => {
        var config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                `/dashboard/studentCount?mentor_id=${currentUser?.data[0]?.mentor_id}`,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${currentUser.data[0]?.token}`
            }
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setStudentCount(response.data.data[0].student_count);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const mentorcoursepercentage = () => {
        var config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                `/dashboard/mentorpercentage?user_id=${currentUser?.data[0]?.user_id}`,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${currentUser.data[0]?.token}`
            }
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    const per = Math.round(
                        (response.data.data[0].currentProgress /
                            response.data.data[0].totalProgress) *
                            100
                    );
                    setCoursepercentage(per);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    return (
        <Layout>
            <Container className="dashboard pb-5 my-5 px-5">
                <h2 className="mb-5">Dashboard </h2>
                <Row>
                    <Col style={{ paddingRight: '20px' }}>
                        <Row>
                            <Card
                                bg="light"
                                text="dark"
                                className="mb-4"
                                style={{ width: '350px' }}
                            >
                                <Card.Body>
                                    <label htmlFor="teams" className="">
                                        Number of Teams
                                    </label>

                                    <Card.Text
                                        style={{
                                            fontSize: '48px',
                                            fontWeight: 'bold',
                                            marginTop: '10px',
                                            marginBottom: '20px'
                                        }}
                                    >
                                        {teamsCount}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Row>
                        <Row>
                            <Card
                                bg="light"
                                text="dark"
                                className="mb-4 card"
                                style={{ width: '350px' }}
                            >
                                <Card.Body>
                                    <label htmlFor="teams" className="cardbody">
                                        Teacher Course %
                                    </label>
                                    <Card.Text
                                        className="cardtext"
                                        style={{
                                            fontSize: '48px',
                                            fontWeight: 'bold',
                                            marginTop: '10px',
                                            marginBottom: '20px'
                                        }}
                                    >
                                        {coursepercentage + '%'}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <Card
                                bg="light"
                                text="dark"
                                className="mb-4"
                                style={{ width: '350px' }}
                            >
                                <Card.Body>
                                    <label htmlFor="teams" className="">
                                        Total Students
                                    </label>
                                    <Card.Text
                                        style={{
                                            fontSize: '48px',
                                            fontWeight: 'bold',
                                            marginTop: '10px',
                                            marginBottom: '20px'
                                        }}
                                    >
                                        {studentCount}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Row>
                        <Row>
                            <Card
                                bg="light"
                                text="dark"
                                className="mb-4"
                                style={{ width: '350px' }}
                            >
                                <Card.Body>
                                    <label htmlFor="teams" className="">
                                        Number of Ideas
                                    </label>

                                    <Card.Text
                                        className="left-aligned"
                                        style={{
                                            fontSize: '48px',
                                            fontWeight: 'bold',
                                            marginTop: '10px',
                                            marginBottom: '20px'
                                        }}
                                    >
                                        {ideaCount}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Row>
                    </Col>

                    <Col>
                        <Card bg="light" text="dark" className=" md-3 xs-12 ">
                            <Card.Body style={{ overflowX: 'auto' }}>
                                {/* <LatestNewsNew usersdata={currentUser?.data} /> */}
                                <LatestScrollNew
                                    usersdata={currentUser?.data}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                {/* <Row className="teacher-statistics bg-white p-5 mb-5">
                    <Row className="">
                        {!dashboardStates ? <div style={{width:"10rem",margin:"auto"}}>
                            <DoubleBounce />
                        </div> :
                            <div className="card-wrapper">
                                <div className="row row-gap">
                                    <div className="card border-top-blue col-md-3">
                                        <div className="d-flex">
                                            <img
                                                src={institutions}
                                                alt="institutions"
                                                className="mx-4"
                                            />
                                            <div className="common-flex flex-column">
                                                <p className="color-blue fs-600 my-0 text-wrapped">
                                                    {dashboardStates &&
                                                    dashboardStates?.organization
                                                        ? dashboardStates
                                                            ?.organization
                                                            ?.organization_name
                                                        : '-'}
                                                </p>
                                                <small>School Name</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card border-top-green col-md-3">
                                        <div className="d-flex">
                                            <img
                                                src={districtImg}
                                                alt="institutions"
                                                className="mx-4"
                                            />
                                            <div className="common-flex flex-column">
                                                <span className="color-green fs-600">
                                                    {dashboardStates &&
                                                    dashboardStates?.organization
                                                        ? dashboardStates
                                                            ?.organization
                                                            ?.district
                                                        : '-'}
                                                </span>
                                                <small>District</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card border-top-yellow col-md-3  ">
                                        <div className="d-flex">
                                            <img
                                                src={idea}
                                                alt="institutions"
                                                className="mx-4"
                                            />
                                            <div className="common-flex flex-column">
                                                <span className="color-yellow fs-700">
                                                    {dashboardStates &&
                                                    dashboardStates?.ideas_count
                                                        ? dashboardStates?.ideas_count
                                                        : 0}
                                                </span>
                                                <small>Number Of Ideas</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card border-top-dark-blue col-md-3  ">
                                        <div className="d-flex">
                                            <img
                                                src={people}
                                                alt="institutions"
                                                className="mx-4"
                                            />
                                            <div className="common-flex flex-column">
                                                <span className="color-dark-blue fs-700">
                                                    {dashboardStates &&
                                                    dashboardStates?.teams_count
                                                        ? dashboardStates?.teams_count
                                                        : 0}
                                                </span>
                                                <small>Number Of Teams</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </Row>
                </Row> */}
                <Row className="teacher-statistics bg-white p-5 mt-3">
                    <Row className="">
                        <Col>
                            <div className="d-flex flex-wrap">
                                <DoughnutChart user={currentUser?.data} />
                                {/* <BarChart /> */}
                            </div>
                        </Col>
                        {/* <Col> */}
                        {/* <div className="teacher-progress">
                                teacher progress{' '}
                            </div> */}
                        {/* <div className="stepper">
                                <h2 className='mb-5'>Teacher Roadmap</h2>
                                <VerticalLinearStepper />
                            </div> */}
                        {/* </Col> */}
                    </Row>
                </Row>
            </Container>
        </Layout>
    );
};

export default Dashboard;
