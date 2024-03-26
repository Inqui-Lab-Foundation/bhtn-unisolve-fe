/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Layout from '../../Layout';
import {
    deleteTempMentorById,
    teacherResetPassword
} from '../../store/admin/actions';
import './dashboard.scss';
import { useHistory } from 'react-router-dom';
import jsPDF from 'jspdf';
import DataTable, { Alignment } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import { URL, KEY } from '../../../constants/defaultValues';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2/dist/sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import logout from '../../../assets/media/logout.svg';
import { useDispatch } from 'react-redux';

import {
    getCurrentUser,
    getNormalHeaders,
    openNotificationWithIcon
} from '../../../helpers/Utils';
import { Button } from '../../../stories/Button';
const Dashboard = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const pdfRef = React.useRef(null);
    const MentorData =
        (history && history.location && history.location.data) || {};
    const currentUser = getCurrentUser('current_user');
    const [mentorTeam, setMentorTeam] = useState([]);
    const [isideadisable, setIsideadisable] = useState(false);

    useEffect(() => {
        getMentorIdApi(MentorData.mentor_id);
    }, []);

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
        const doc = new jsPDF('p', 'px', [1280, 1280]);
        doc.html(content, {
            callback: function (doc) {
                doc.save('Detail.pdf');
            }
        });
        console.warn(content);
    };
    const viewDetails = () => {
        history.push({
            pathname: '/admin/View-More',
            data: MentorData
        });
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
                    getMentorIdApi(MentorData.mentor_id);
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
                    }
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire('Cancelled', '', 'error');
                }
            });
    };
    // console.log(
    //     MentorData,
    //     'MentorDataMentorDataMentorDataMentorDataMentorData'
    // );
    return (
        <Layout>
            <div className="dashboard-wrapper pb-5 my-5 px-5">
                <div className="dashboard p-5 mb-5">
                    <div className="text-right">
                        <Button
                            label="Back"
                            size="small"
                            btnClass="primary"
                            type="cancel"
                            onClick={() => history.push('/admin/userlist')}
                        />
                    </div>
                    <div className="row">
                        <div className="mb-5 p-3" ref={pdfRef}>
                            <div className="container-fluid card shadow border">
                                <div className="row">
                                    <div className="col">
                                        <h2 className="text-center m-3 text-primary">
                                            Registration Detail
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
                                                        MentorData?.organization_code
                                                    }
                                                </p>
                                            </li>
                                            <li className="d-flex justify-content-between">
                                                School:
                                                <p>
                                                    {
                                                        MentorData?.organization
                                                            ?.organization_name
                                                    }
                                                </p>
                                            </li>
                                            <li className="d-flex justify-content-between">
                                                City: <p>{MentorData?.city}</p>
                                            </li>
                                            <li className="d-flex justify-content-between">
                                                District:{' '}
                                                <p>{MentorData?.district}</p>
                                            </li>

                                            <li className="d-flex justify-content-between">
                                                Mentor Name:{' '}
                                                <p>{MentorData?.full_name}</p>
                                            </li>
                                            <li className="d-flex justify-content-between">
                                                Mentor email:{' '}
                                                <p>{MentorData?.username}</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between">
                            <button
                                onClick={() =>
                                    handleresetpassword({
                                        mentor_id: MentorData.mentor_id,
                                        organization_code:
                                            MentorData.organization_code
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
                                    handleAlert(MentorData.user_id);
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
                                        {...MentorsData}
                                    >
                                        <DataTable
                                            noHeader
                                            defaultSortField="id"
                                            defaultSortAsc={false}
                                            highlightOnHover
                                        />
                                    </DataTableExtensions>
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
