/* eslint-disable indent */
// /* eslint-disable indent */
/* eslint-disable no-unused-vars */
import { Descriptions, Input } from 'antd';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Col, Row } from 'reactstrap';
import { Button } from '../../stories/Button';
import Layout from '../Layout';
import { Container, CardBody, CardText } from 'reactstrap';
import { Card } from 'react-bootstrap';

import {
    deleteTempMentorById,
    teacherResetPassword
} from '../store/admin/actions';
import './dashboard.scss';
import { useHistory } from 'react-router-dom';
import jsPDF from 'jspdf';
import DataTable, { Alignment } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import { URL, KEY } from '../../constants/defaultValues';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2/dist/sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import logout from '../../assets/media/logout.svg';
import { useDispatch } from 'react-redux';

import {
    getCurrentUser,
    getNormalHeaders,
    openNotificationWithIcon
} from '../../helpers/Utils';
const Dashboard = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const pdfRef = React.useRef(null);
    const inputField = {
        type: 'text',
        className: 'defaultInput'
    };
    const currentUser = getCurrentUser('current_user');
    const [diesCode, setDiesCode] = useState('');
    const [orgData, setOrgData] = useState({});
    const [multipleOrgData, setmultipleOrgData] = useState({});
    const [mentorId, setMentorId] = useState('');
    const [SRows, setSRows] = React.useState([]);
    const [mentorTeam, setMentorTeam] = useState([]);
    const [count, setCount] = useState(0);
    const [error, setError] = useState('');
    const [isideadisable, setIsideadisable] = useState(false);

    const handleOnChange = (e) => {
        // We can give Dise Code//
        setCount(0);
        setDiesCode(e.target.value);
        setOrgData({});
        setError('');
        setmultipleOrgData({});
    };
    const handleSearch = (e) => {
        const body = JSON.stringify({
            organization_code: diesCode
        });
        var config = {
            method: 'post',
            url: process.env.REACT_APP_API_BASE_URL + '/organizations/checkOrg',
            headers: {
                'Content-Type': 'application/json'
            },
            data: body
        };

        axios(config)
            .then(function (response) {
                if (response.status == 200) {
                    setmultipleOrgData(response?.data?.data);
                    setCount(count + 1);
                }
                if (response?.data?.count === 0) {
                    setError('Entered Invalid Teacher Unique Code');
                }
            })
            .catch(function (error) {
                if (error?.response?.data?.count === 0) {
                    setError('Entered Invalid Teacher Unique Code');
                }
                setmultipleOrgData({});
            });
        e.preventDefault();
    };
    const handelSelectentor = (data) => {
        setOrgData(data);
        setMentorId(data.mentor.mentor_id);
        setError('');
        if (data.mentor.mentor_id) {
            getMentorIdApi(data.mentor.mentor_id);
        }
    };
    async function getMentorIdApi(id) {
        // Mentor Id  Api//
        // id = Mentor Id //
        let axiosConfig = getNormalHeaders(KEY.User_API_Key);
        axiosConfig['params'] = {
            mentor_id: id,
            status: 'ACTIVE',
            ideaStatus: true
        };
        await axios
            .get(`${URL.getTeamMembersList}`, axiosConfig)
            .then((res) => {
                if (res?.status == 200) {
                    var mentorTeamArray = [];
                    res &&
                        res.data &&
                        res.data.data[0] &&
                        res.data.data[0].dataValues.length > 0 &&
                        res.data &&
                        res.data.data[0].dataValues.map((teams, index) => {
                            var key = index + 1;
                            return mentorTeamArray.push({ ...teams, key });
                        });
                    setMentorTeam(mentorTeamArray);
                }
            })
            .catch((err) => {
                return err.response;
            });
    }

    const handleEdit = () => {
        // We can edit  the Registration details//
        // Where data=orgData//
        history.push({
            pathname: '/admin/edit-user-profile',
            data: {
                full_name: orgData.mentor?.full_name,
                mobile: orgData.mentor?.mobile,
                username: orgData.mentor?.user?.username,
                mentor_id: orgData.mentor?.mentor_id,
                where: 'Dashbord',
                organization_code: orgData.organization_code
            }
        });
    };

    const handleresetpassword = (data) => {
        // We can resset the password//
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        });

        swalWithBootstrapButtons
            .fire({
                title: 'You are attempting to reset the password',
                text: 'Are you sure?',
                imageUrl: `${logout}`,
                showCloseButton: true,
                confirmButtonText: 'Reset Password',
                showCancelButton: true,
                cancelButtonText: 'cancel',
                reverseButtons: false
            })
            .then((result) => {
                if (result.isConfirmed) {
                    dispatch(
                        teacherResetPassword({
                            organization_code: data.organization_code,
                            mentor_id: data.mentor_id,
                            otp: false
                        })
                    );
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire(
                        'Cancelled',
                        'Reset password is cancelled',
                        'error'
                    );
                }
            })
            .catch((err) => console.log(err.response));
    };
    const downloadPDF = () => {
        const content = pdfRef.current;
        const doc = new jsPDF('p', 'px', [1280, 1020]);
        doc.html(content, {
            callback: function (doc) {
                doc.save('Detail.pdf');
            }
        });
        console.warn(content);
    };
    const viewDetails = () => {
        history.push({
            pathname: '/admin/View-More-details',
            data: orgData
        });
        localStorage.setItem('orgData', JSON.stringify(orgData));
    };
    useEffect(() => {
        var config = {
            method: 'get',
            url: process.env.REACT_APP_API_BASE_URL + `/popup/2`,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${currentUser.data[0]?.token}`
            }
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    if (response.data.data[0]?.on_off === '1') {
                        setIsideadisable(true);
                    } else {
                        setIsideadisable(false);
                    }
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);
    const MentorsData = {
        data: mentorTeam,
        columns: [
            {
                name: 'No',
                selector: 'key',
                width: '12%'
            },
            {
                name: 'Team Name',
                selector: 'team_name',
                sortable: true,
                center: true,
                width: '25%'
            },
            {
                name: 'Student Count',
                selector: 'student_count',
                center: true,
                width: '20%'
            },
            {
                name: 'Idea Sub Status',
                selector: 'ideaStatus',
                center: true,
                width: '25%'
            },
            {
                name: 'Actions',
                cell: (params) => {
                    return [
                        <Link
                            key={params}
                            exact="true"
                            onClick={() =>
                                handleRevoke(
                                    params.challenge_response_id,
                                    params.ideaStatus
                                )
                            }
                        >
                            {params.ideaStatus == 'SUBMITTED' &&
                                params.evaluation_status === null && (
                                    <Button
                                        key={params}
                                        className={
                                            isideadisable
                                                ? `btn btn-success btn-lg mr-5 mx-2`
                                                : `btn btn-lg mr-5 mx-2`
                                        }
                                        label={'REVOKE'}
                                        size="small"
                                        // shape="btn-square"
                                        onClick={() =>
                                            handleRevoke(
                                                params.challenge_response_id,
                                                params.ideaStatus
                                            )
                                        }
                                        disabled={!isideadisable}
                                    />
                                )}
                        </Link>
                    ];
                },
                width: '20%',
                center: true
            }
        ]
    };
    const MultipleMentorsData = {
        data: multipleOrgData,
        columns: [
            {
                name: 'Mentor Name',
                selector: (row) => row?.mentor?.full_name,
                center: true
            },
            {
                name: 'Actions',
                cell: (params) => {
                    return [
                        <div
                            key={params}
                            onClick={() => handelSelectentor(params)}
                        >
                            <div className="btn btn-primary btn-lg mr-5 mx-2">
                                view
                            </div>
                        </div>
                    ];
                },
                center: true
            }
        ]
    };
    const handleRevoke = async (id, type) => {
        let submitData = {
            status: type == 'DRAFT' ? 'SUBMITTED' : 'DRAFT'
        };
        var config = {
            method: 'put',
            url:
                process.env.REACT_APP_API_BASE_URL +
                '/challenge_response/updateEntry/' +
                JSON.stringify(id),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            },
            data: submitData
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    openNotificationWithIcon(
                        'success',
                        'Idea Submission Status Successfully Update!',
                        ''
                    );
                    getMentorIdApi(mentorId);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const handleAlert = (id) => {
        // id = mentor  user id //
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false,
            allowOutsideClick: false
        });

        swalWithBootstrapButtons
            .fire({
                title: 'You are Delete Organization',
                text: 'Are you sure?',
                showCloseButton: true,
                confirmButtonText: 'Confirm',
                showCancelButton: true,
                cancelButtonText: 'Cancel',
                reverseButtons: false
            })
            .then((result) => {
                if (result.isConfirmed) {
                    if (result.isConfirmed) {
                        deleteTempMentorById(id);
                        setOrgData({});
                        setmultipleOrgData({});
                    }
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire('Cancelled', '', 'error');
                }
            });
    };
    useEffect(() => {
        adminTeamsCount();
        adminSudentCount();
        adminideasCount();
        adminMentorCount();
        adminSudentbygenderCount();
        adminSchoolCount();
        adminmentorCourseCount();
        adminStudentCourseCount();
        adminRegschoolsCount();
    }, []);
    const [totalteamsCount, setTotalteamsCount] = useState('-');
    const [totalStudentCount, setTotalStudentCount] = useState('-');
    const [totalideasCount, setTotalideasCount] = useState('-');
    const [totalSubmittedideasCount, setTotalSubmittedideasCount] =
        useState('-');
    const [totalMentorCount, setTotalMentorCount] = useState('-');
    const [totalRegschoolsCount, setTotalRegschoolsCount] = useState('-');
    const [totalMentorMaleCount, setTotalMentorMaleCount] = useState('-');
    const [totalStudentMaleCount, setTotalStudentMaleCount] = useState('-');
    const [totalStudentFemaleCount, setTotalStudentFemaleCount] = useState('-');
    const [totalSchoolCount, setTotalSchoolCount] = useState('-');
    const [mentorCoursesCompletedCount, setMentorCoursesCompletedCount] =
        useState('-');
    const [studentCoursesCompletedCount, setStudentCoursesCompletedCount] =
        useState('-');
    const [totalstudentCoursesCount, setTotalstudentCoursesCount] =
        useState('-');
    const adminTeamsCount = () => {
        var config = {
            method: 'get',
            url: process.env.REACT_APP_API_BASE_URL + `/dashboard/teamCount`,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${currentUser.data[0]?.token}`
            }
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setTotalteamsCount(response.data.data[0].teams_count);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const adminRegschoolsCount = () => {
        var config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                `/dashboard/schoolRegCount`,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${currentUser.data[0]?.token}`
            }
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setTotalRegschoolsCount(response.data.data[0].RegSchools);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const adminSudentCount = () => {
        var config = {
            method: 'get',
            url: process.env.REACT_APP_API_BASE_URL + `/dashboard/studentCount`,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${currentUser.data[0]?.token}`
            }
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setTotalStudentCount(response.data.data[0].student_count);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const adminideasCount = () => {
        var config = {
            method: 'get',
            url: process.env.REACT_APP_API_BASE_URL + `/dashboard/ideasCount`,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${currentUser.data[0]?.token}`
            }
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setTotalideasCount(response.data.data[0].initiated_ideas);
                    setTotalSubmittedideasCount(
                        response.data.data[0].submitted_ideas
                    );
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const adminMentorCount = () => {
        var config = {
            method: 'get',
            url: process.env.REACT_APP_API_BASE_URL + `/dashboard/mentorCount`,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${currentUser.data[0]?.token}`
            }
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setTotalMentorCount(response.data.data[0].mentorCount);
                    setTotalMentorMaleCount(response.data.data[0].mentorMale);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const adminSudentbygenderCount = () => {
        var config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                `/dashboard/studentCountbygender`,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${currentUser.data[0]?.token}`
            }
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setTotalStudentMaleCount(response.data.data[0].studentMale);
                    setTotalStudentFemaleCount(
                        response.data.data[0].studentFemale
                    );
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const adminSchoolCount = () => {
        var config = {
            method: 'get',
            url: process.env.REACT_APP_API_BASE_URL + `/dashboard/schoolCount`,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${currentUser.data[0]?.token}`
            }
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setTotalSchoolCount(response.data.data[0].schoolCount);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const adminmentorCourseCount = () => {
        var config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                `/dashboard/mentorCourseCount`,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${currentUser.data[0]?.token}`
            }
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setMentorCoursesCompletedCount(
                        response.data.data[0].mentorCoursesCompletedCount
                    );
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const adminStudentCourseCount = () => {
        var config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                `/dashboard/studentCourseCount`,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${currentUser.data[0]?.token}`
            }
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setStudentCoursesCompletedCount(
                        response.data.data[0].StudentCoursesCompletedCount
                    );
                    setTotalstudentCoursesCount(response.data.data[0].started);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    return (
        <Layout>
            <div className="dashboard-wrapper pb-5 my-5 px-5">
                <h2 className="mb-5">Dashboard </h2>
                <div className="dashboard p-5 mb-5">
                    <div className="row " style={{ overflow: 'auto' }}>
                        <div className=" row col-xs-12 col-md-7">
                            <Col
                                style={{
                                    paddingRight: '20px',
                                    paddingTop: '1rem',
                                    paddingLeft: '2rem'
                                }}
                            >
                                <Row>
                                    <Card
                                        bg="light"
                                        text="dark"
                                        className="mb-4"
                                        style={{ height: '150px' }}
                                    >
                                        <Card.Body>
                                            <label htmlFor="teams" className="">
                                                Total Eligible Schools
                                            </label>

                                            <Card.Text
                                                style={{
                                                    fontSize: '30px',
                                                    fontWeight: 'bold',
                                                    marginTop: '10px',
                                                    marginBottom: '20px'
                                                }}
                                            >
                                                {totalSchoolCount}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Row>
                                <Row>
                                    <Card
                                        bg="light"
                                        text="dark"
                                        className="mb-4"
                                        style={{ height: '150px' }}
                                    >
                                        <Card.Body>
                                            <label htmlFor="teams" className="">
                                                Total Reg Schools
                                            </label>
                                            <Card.Text
                                                style={{
                                                    fontSize: '30px',
                                                    fontWeight: 'bold',
                                                    marginTop: '10px',
                                                    marginBottom: '20px'
                                                }}
                                            >
                                                {totalRegschoolsCount}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Row>
                                <Row>
                                    <Card
                                        bg="light"
                                        text="dark"
                                        className="mb-4"
                                        style={{ height: '150px' }}
                                    >
                                        <Card.Body>
                                            <label htmlFor="teams" className="">
                                                Total Reg Teachers
                                            </label>
                                            <Card.Text
                                                style={{
                                                    fontSize: '30px',
                                                    fontWeight: 'bold',
                                                    marginTop: '10px',
                                                    marginBottom: '20px'
                                                }}
                                            >
                                                {totalMentorCount}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Row>
                                <Row>
                                    <Card
                                        bg="light"
                                        text="dark"
                                        className="mb-4"
                                        style={{ height: '150px' }}
                                    >
                                        <Card.Body>
                                            <label htmlFor="teams" className="">
                                                Teachers Course Completed
                                            </label>
                                            <Card.Text
                                                style={{
                                                    fontSize: '30px',
                                                    fontWeight: 'bold',
                                                    marginTop: '10px',
                                                    marginBottom: '20px'
                                                }}
                                            >
                                                {mentorCoursesCompletedCount}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Row>
                            </Col>
                            <Col
                                style={{
                                    paddingRight: '20px',
                                    paddingTop: '1rem'
                                }}
                            >
                                <Row>
                                    <Card
                                        bg="light"
                                        text="dark"
                                        className="mb-4"
                                        style={{ height: '150px' }}
                                    >
                                        <Card.Body>
                                            <label htmlFor="teams" className="">
                                                Total Teams
                                            </label>
                                            <Card.Text
                                                style={{
                                                    fontSize: '30px',
                                                    fontWeight: 'bold',
                                                    marginTop: '10px',
                                                    marginBottom: '20px'
                                                }}
                                            >
                                                {totalteamsCount}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Row>
                                <Row>
                                    <Card
                                        bg="light"
                                        text="dark"
                                        className="mb-4"
                                        style={{
                                            height: '150px'
                                        }}
                                    >
                                        <Card.Body>
                                            <label htmlFor="teams" className="">
                                                Total Teams Submitted Ideas
                                            </label>

                                            <Card.Text
                                                className="left-aligned"
                                                style={{
                                                    fontSize: '30px',
                                                    fontWeight: 'bold',
                                                    marginTop: '10px',
                                                    marginBottom: '20px'
                                                }}
                                            >
                                                {totalSubmittedideasCount}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Row>
                                <Row>
                                    <Card
                                        bg="light"
                                        text="dark"
                                        className="mb-4"
                                        style={{
                                            height: '150px'
                                        }}
                                    >
                                        <Card.Body>
                                            <label htmlFor="teams" className="">
                                                Total Teams Ideas in Draft
                                            </label>

                                            <Card.Text
                                                className="left-aligned"
                                                style={{
                                                    fontSize: '30px',
                                                    fontWeight: 'bold',
                                                    marginTop: '10px',
                                                    marginBottom: '20px'
                                                }}
                                            >
                                                {totalideasCount -
                                                    totalSubmittedideasCount}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Row>
                                <Row>
                                    <Card
                                        bg="light"
                                        text="dark"
                                        className="mb-4"
                                        style={{
                                            height: '150px'
                                        }}
                                    >
                                        <Card.Body>
                                            <label htmlFor="teams" className="">
                                                Total Teams Not initiated Ideas
                                            </label>

                                            <Card.Text
                                                className="left-aligned"
                                                style={{
                                                    fontSize: '30px',
                                                    fontWeight: 'bold',
                                                    marginTop: '10px',
                                                    marginBottom: '20px'
                                                }}
                                            >
                                                {totalteamsCount -
                                                    totalideasCount}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Row>
                            </Col>
                            <Col
                                style={{
                                    paddingRight: '20px',
                                    paddingTop: '1rem'
                                }}
                            >
                                <Row>
                                    <Card
                                        bg="light"
                                        text="dark"
                                        className="mb-4"
                                        style={{ height: '150px' }}
                                    >
                                        <Card.Body>
                                            <label htmlFor="teams" className="">
                                                Total Students
                                            </label>
                                            <Card.Text
                                                style={{
                                                    fontSize: '30px',
                                                    fontWeight: 'bold',
                                                    marginTop: '10px',
                                                    marginBottom: '20px'
                                                }}
                                            >
                                                {totalStudentCount}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Row>
                                <Row>
                                    <Card
                                        bg="light"
                                        text="dark"
                                        className="mb-4"
                                        style={{
                                            height: '150px'
                                        }}
                                    >
                                        <Card.Body>
                                            <label htmlFor="teams" className="">
                                                Students course completed
                                            </label>

                                            <Card.Text
                                                className="left-aligned"
                                                style={{
                                                    fontSize: '30px',
                                                    fontWeight: 'bold',
                                                    marginTop: '10px',
                                                    marginBottom: '20px'
                                                }}
                                            >
                                                {studentCoursesCompletedCount}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Row>
                                <Row>
                                    <Card
                                        bg="light"
                                        text="dark"
                                        className="mb-4"
                                        style={{
                                            height: '150px'
                                        }}
                                    >
                                        <Card.Body>
                                            <label htmlFor="teams" className="">
                                                Students course in progress
                                            </label>

                                            <Card.Text
                                                className="left-aligned"
                                                style={{
                                                    fontSize: '30px',
                                                    fontWeight: 'bold',
                                                    marginTop: '10px',
                                                    marginBottom: '20px'
                                                }}
                                            >
                                                {totalstudentCoursesCount -
                                                    studentCoursesCompletedCount}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Row>
                                <Row>
                                    <Card
                                        bg="light"
                                        text="dark"
                                        className="mb-4"
                                        style={{
                                            height: '150px'
                                        }}
                                    >
                                        <Card.Body>
                                            <label htmlFor="teams" className="">
                                                Students Course not started
                                            </label>

                                            <Card.Text
                                                className="left-aligned"
                                                style={{
                                                    fontSize: '30px',
                                                    fontWeight: 'bold',
                                                    marginTop: '10px',
                                                    marginBottom: '20px'
                                                }}
                                            >
                                                {totalStudentCount -
                                                    totalstudentCoursesCount}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Row>
                            </Col>
                            <Col
                                style={{
                                    paddingRight: '20px',
                                    paddingTop: '1rem',
                                    paddingLeft: '2rem'
                                    // height: '150px'
                                }}
                            >
                                {/* <Row>
                                    <Card
                                        bg="light"
                                        text="dark"
                                        className="mb-4"
                                        style={{
                                            height: '150px'
                                        }}
                                    >
                                        <Card.Body>
                                            <label htmlFor="teams" className="">
                                                Total Male Teachers
                                            </label>

                                            <Card.Text
                                                className="left-aligned"
                                                style={{
                                                    fontSize: '30px',
                                                    fontWeight: 'bold',
                                                    marginTop: '10px',
                                                    marginBottom: '20px'
                                                }}
                                            >
                                                {/* {totalMentorMaleCount} */}
                                {/* </Card.Text> */}
                                {/* </Card.Body> */}
                                {/* </Card> */}
                                {/* </Row>  */}
                                {/* <Row>
                                    <Card
                                        bg="light"
                                        text="dark"
                                        className="mb-4"
                                        style={{
                                            height: '150px'
                                        }}
                                    >
                                        <Card.Body>
                                            <label htmlFor="teams" className="">
                                                Total Female Teachers
                                            </label>

                                            <Card.Text
                                                className="left-aligned"
                                                style={{
                                                    fontSize: '30px',
                                                    fontWeight: 'bold',
                                                    marginTop: '10px',
                                                    marginBottom: '20px'
                                                }}
                                            >
                                              
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Row> */}

                                <Row>
                                    <Card
                                        bg="light"
                                        text="dark"
                                        className="mb-4"
                                        style={{
                                            height: '310px'
                                        }}
                                    >
                                        <Card.Body>
                                            <label htmlFor="teams" className="">
                                                Total Male Students
                                            </label>

                                            <Card.Text
                                                className="left-aligned"
                                                style={{
                                                    fontSize: '30px',
                                                    fontWeight: 'bold',
                                                    marginTop: '10px',
                                                    marginBottom: '20px'
                                                }}
                                            >
                                                {totalStudentMaleCount}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Row>
                                <Row>
                                    <Card
                                        bg="light"
                                        text="dark"
                                        className="mb-4"
                                        style={{
                                            height: '310px'
                                        }}
                                    >
                                        <Card.Body>
                                            <label htmlFor="teams" className="">
                                                Total Female Students
                                            </label>

                                            <Card.Text
                                                className="left-aligned"
                                                style={{
                                                    fontSize: '30px',
                                                    fontWeight: 'bold',
                                                    marginTop: '10px',
                                                    marginBottom: '20px'
                                                }}
                                            >
                                                {totalStudentFemaleCount}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Row>
                            </Col>
                        </div>
                        <div className=" row col-xs-12 col-md-5">
                            <div className="row" style={{ overflow: 'auto' }}>
                                <div
                                    style={{ flex: 1 }}
                                    className="bg-white rounded px-5 py-3 col-lg-12 disc-card-search"
                                >
                                    <h2 className="mt-3">
                                        Search Registration Details
                                    </h2>
                                    <Row className="text-center justify-content-md-center my-4">
                                        <Col md={9} lg={12}>
                                            <Row>
                                                <Col md={9} className="my-auto">
                                                    <Input
                                                        {...inputField}
                                                        id="organization_code"
                                                        onChange={(e) =>
                                                            handleOnChange(e)
                                                        }
                                                        value={diesCode}
                                                        name="organization_code"
                                                        placeholder="Enter Teacher Unique Code"
                                                        className="w-100 mb-3 mb-md-0"
                                                        style={{
                                                            borderRadius:
                                                                '60px',
                                                            padding: '9px 11px'
                                                        }}
                                                    />
                                                </Col>
                                                <Col
                                                    md={3}
                                                    className="partner-btn"
                                                >
                                                    <Button
                                                        label={'Search'}
                                                        btnClass="primary mx-3 w-100"
                                                        size="small"
                                                        onClick={(e) =>
                                                            handleSearch(e)
                                                        }
                                                    />
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    {multipleOrgData.length !== undefined &&
                                        multipleOrgData.length !== 0 &&
                                        multipleOrgData[0]?.mentor !== null && (
                                            <DataTableExtensions
                                                print={false}
                                                export={false}
                                                {...MultipleMentorsData}
                                            >
                                                <DataTable
                                                    data={multipleOrgData}
                                                    noHeader
                                                    highlightOnHover
                                                />
                                            </DataTableExtensions>
                                        )}
                                    {orgData &&
                                    orgData?.organization_name &&
                                    orgData?.mentor !== null ? (
                                        <>
                                            <div
                                                className="mb-5 p-3"
                                                ref={pdfRef}
                                            >
                                                <div className="container-fluid card shadow border">
                                                    <div className="row">
                                                        <div className="col">
                                                            <h2 className="text-center m-3 text-primary">
                                                                Registration
                                                                Detail
                                                            </h2>
                                                            <hr />
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col">
                                                            <ul className="p-0">
                                                                <li className="d-flex justify-content-between">
                                                                    UDISE:{' '}
                                                                    <p>
                                                                        {
                                                                            orgData.organization_code
                                                                        }
                                                                    </p>
                                                                </li>
                                                                <li className="d-flex justify-content-between">
                                                                    School:
                                                                    <p>
                                                                        {
                                                                            orgData.organization_name
                                                                        }
                                                                    </p>
                                                                </li>
                                                                <li className="d-flex justify-content-between">
                                                                    City:{' '}
                                                                    <p>
                                                                        {
                                                                            orgData.city
                                                                        }
                                                                    </p>
                                                                </li>
                                                                <li className="d-flex justify-content-between">
                                                                    District:{' '}
                                                                    <p>
                                                                        {
                                                                            orgData.district
                                                                        }
                                                                    </p>
                                                                </li>

                                                                <li className="d-flex justify-content-between">
                                                                    Mentor Name:{' '}
                                                                    <p>
                                                                        {
                                                                            orgData
                                                                                .mentor
                                                                                ?.full_name
                                                                        }
                                                                    </p>
                                                                </li>
                                                                {/* <li className="d-flex justify-content-between">
                                                            Mentor Mobile:{' '}
                                                            <p>
                                                                {
                                                                    orgData
                                                                        .mentor
                                                                        ?.mobile
                                                                }
                                                            </p>
                                                        </li> */}
                                                                <li className="d-flex justify-content-between">
                                                                    Mentor
                                                                    email:{' '}
                                                                    <p>
                                                                        {
                                                                            orgData
                                                                                .mentor
                                                                                ?.user
                                                                                ?.username
                                                                        }
                                                                    </p>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <button
                                                    onClick={handleEdit}
                                                    // onClick={() => handleEdit()}
                                                    className="btn btn-warning btn-lg"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleresetpassword({
                                                            mentor_id:
                                                                orgData.mentor
                                                                    .mentor_id,
                                                            organization_code:
                                                                orgData.organization_code
                                                        })
                                                    }
                                                    className="btn btn-info rounded-pill px-4 btn-lg text-white"
                                                >
                                                    Reset
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        downloadPDF();
                                                    }}
                                                    className="btn btn-primary rounded-pill px-4 btn-lg"
                                                >
                                                    Download
                                                </button>
                                                <button
                                                    onClick={viewDetails}
                                                    className="btn btn-success rounded-pill px-4 btn-lg"
                                                >
                                                    View More
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        handleAlert(
                                                            orgData.mentor
                                                                ?.user_id
                                                        );
                                                    }}
                                                    className="btn btn-danger btn-lg"
                                                >
                                                    Delete
                                                </button>
                                            </div>

                                            <div className="mb-5 p-3">
                                                <div className="container-fluid card shadow border">
                                                    <div className="row">
                                                        <div className="col">
                                                            <h2 className="text-center m-3 text-primary">
                                                                Mentor Details
                                                            </h2>
                                                            <hr />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <DataTableExtensions
                                                            print={false}
                                                            export={false}
                                                            // style={{ fontSize: '10' }}
                                                            {...MentorsData}
                                                        >
                                                            <DataTable
                                                                // data={SRows}
                                                                // style={{ fontSize: 8 }}
                                                                noHeader
                                                                defaultSortField="id"
                                                                defaultSortAsc={
                                                                    false
                                                                }
                                                                // pagination
                                                                highlightOnHover
                                                                // fixedHeader
                                                                // subHeaderAlign={
                                                                //     Alignment.Center
                                                                // }
                                                            />
                                                        </DataTableExtensions>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        // !error &&
                                        // diesCode &&
                                        // orgData !== {} &&
                                        multipleOrgData[0]?.mentor === null && (
                                            // <Card className="mt-3 p-4">
                                            <div className="text-success fs-highlight d-flex justify-content-center align-items-center">
                                                <span>
                                                    Still No Teacher Registered
                                                </span>
                                            </div>
                                        )
                                        // </Card>
                                    )}
                                    {error && diesCode && (
                                        // <Card className="mt-3 p-4">
                                        <div className="text-danger mt-3 p-4 fs-highlight d-flex justify-content-center align-items-center">
                                            <span>{error}</span>
                                        </div>
                                    )}
                                    {!diesCode && (
                                        // <Card className="mt-3 p-4">
                                        <div className="d-flex  mt-3 p-4 justify-content-center align-items-center">
                                            <span className="text-primary fs-highlight">
                                                Enter Teacher Unique Code
                                            </span>
                                        </div>
                                        // </Card>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
export default Dashboard;
