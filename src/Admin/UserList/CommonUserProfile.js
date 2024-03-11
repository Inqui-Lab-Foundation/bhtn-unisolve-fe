/* eslint-disable no-unused-vars */
import React from 'react';
import Layout from '../../Admin/Layout';
import { useHistory, withRouter } from 'react-router-dom';
import { Container, Row, Card, CardBody, CardText } from 'reactstrap';
import { BreadcrumbTwo } from '../../stories/BreadcrumbTwo/BreadcrumbTwo';
import { Button } from '../../stories/Button';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import logout from '../../assets/media/logout.svg';
import { studentResetPassword } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

const CommonUserProfile = (props) => {
    const history = useHistory();
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const StudentsDaTa =
        (history && history.location && history.location.data) || {};
    // console.log(StudentsDaTa, '1');
    const headingDetails = {
        title: 'User List Details',

        options: [
            {
                title: 'User List',
                path: '/admin/userlist'
            },
            {
                title: 'User List Profile',
                path: '/admin/userlist'
            }
        ]
    };
    // localStorage.setItem('mentor', JSON.stringify(item));
    const handleReset = () => {
        // here we can reset password as  user_id //
        // here data = student_id //
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
                cancelButtonText: t('general_req.btn_cancel'),
                reverseButtons: false
            })
            .then((result) => {
                if (result.isConfirmed) {
                    dispatch(
                        studentResetPassword({
                            user_id: StudentsDaTa.user_id.toString()
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
    const handleViewBack = () => {
        history.push({
            pathname: '/admin/userlist'
        });
        localStorage.setItem('dist', JSON.stringify(props.location.dist));
        localStorage.setItem('num', JSON.stringify(props.location.num));
        // localStorage.setItem(
        //     'mentor',
        //     JSON.stringify(mentor.organization_code)
        // );
    };
    const handleEdit = () => {
        history.push({
            pathname: '/admin/stuEdit',
            data: {
                Age: StudentsDaTa.Age,
                Gender: StudentsDaTa.Gender,
                Grade: StudentsDaTa.Grade,
                student_id: StudentsDaTa.student_id,
                team_id: StudentsDaTa?.team.team_id,
                full_name: StudentsDaTa.full_name
            }
        });
    };
    return (
        <Layout>
            <Container className="mt-5 pt-5 dynamic-form">
                <Row>
                    <div className="col-6">
                        {/* <BreadcrumbTwo {...headingDetails} /> */}
                        <h3>Users List Details</h3>
                    </div>
                    <div className="col-6 text-end">
                        <Button
                            btnClass="primary"
                            size="small"
                            label="Edit"
                            onClick={handleEdit}
                        />
                        <Button
                            btnClass="primary"
                            size="small"
                            label="Reset"
                            onClick={handleReset}
                        />
                        <Button
                            btnClass={'primary'}
                            size="small"
                            // onClick={() => history.push('/admin/userlist')}
                            label="Back"
                            onClick={handleViewBack}
                        />
                    </div>
                </Row>
                <Row>
                    <Card className="py-5">
                        <CardBody>
                            {/* <h2 className="mb-4">Personal Details</h2> */}
                            <CardText>
                                <span className="mx-3">
                                    <b>Name:</b>
                                </span>
                                <b>{StudentsDaTa.full_name}</b>
                            </CardText>
                            <CardText>
                                <span className="mx-3">
                                    <b>Age:</b>
                                </span>
                                <b>{StudentsDaTa.Age}</b>
                            </CardText>{' '}
                            <CardText>
                                <span className="mx-3">
                                    <b>Gender:</b>
                                </span>
                                <b>{StudentsDaTa.Gender}</b>
                            </CardText>{' '}
                            {/* <CardText>
                                <span className='mx-3'><b>Mobile:</b></span>
                                <b>
                                    {props.location.data &&
                                    props.location.data.mobile
                                        ? props.location.data &&
                                          props.location.data.mobile
                                        : '-'}
                                </b>
                            </CardText> */}
                            <CardText>
                                <span className="mx-3">
                                    <b>Grade :</b>
                                </span>
                                <b>{StudentsDaTa.Grade}</b>
                            </CardText>
                            <CardText>
                                <span className="mx-3">
                                    <b>Teacher Name :</b>
                                </span>
                                <b>{StudentsDaTa.team.mentor.full_name}</b>
                            </CardText>{' '}
                            <CardText>
                                <span className="mx-3">
                                    <b>Team Name :</b>
                                </span>
                                <b>{StudentsDaTa.team.team_name}</b>
                            </CardText>
                            {/* <Table bordered className="w-25">
                                <tbody>
                                    <tr>
                                        <th scope="row" className="w-25">
                                            ID
                                        </th>
                                        <td>
                                            {props.location.data &&
                                                props.location.data.mentor_id}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">NAME</th>
                                        <td>
                                            {props.location.data &&
                                                props.location.data.full_name}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">MOBILE</th>
                                        <td>
                                            {props.location.data &&
                                                props.location.data.mobile}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">STATUS</th>
                                        <td>
                                            {props.location.data &&
                                                props.location.data.status}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">CITY</th>
                                        <td>
                                            {props.location.data &&
                                                props.location.data.city}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">DISTRICT</th>
                                        <td>
                                            {props.location.data &&
                                                props.location.data.district}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">STATE</th>
                                        <td>
                                            {props.location.data &&
                                                props.location.data.state}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">COUNTRY</th>
                                        <td>
                                            {props.location.data &&
                                                props.location.data.country}
                                        </td>
                                    </tr>
                                </tbody>
                            </Table> */}
                        </CardBody>
                    </Card>
                </Row>
                <Row className="my-5">
                    <Card className="py-5">
                        <CardBody>
                            <h2 className="mb-4">Institution Details</h2>

                            <CardText>
                                <span className="mx-3">
                                    <b> Unique Code:</b>
                                </span>
                                <b>
                                    {
                                        StudentsDaTa?.team?.mentor?.organization
                                            ?.organization_code
                                    }
                                </b>
                            </CardText>
                            <CardText>
                                <span className="mx-3">
                                    <b>School Name:</b>
                                </span>
                                <b>
                                    {
                                        StudentsDaTa?.team?.mentor?.organization
                                            ?.organization_name
                                    }
                                </b>
                            </CardText>
                            {/* <CardText>
                                <span className="mx-3">
                                    <b>City:</b>
                                </span>
                                <b>
                                    {props.location.data &&
                                    props.location.data?.city
                                        ? props.location.data &&
                                          props.location.name?.city
                                        : '-'}
                                </b>
                            </CardText> */}
                            <CardText>
                                <span className="mx-3">
                                    <b>District:</b>
                                </span>
                                {/* <b>
                                    {
                                        StudentsDaTa?.team?.mentor?.organization
                                            ?.organization_name
                                    }
                                </b> */}
                            </CardText>
                        </CardBody>
                    </Card>
                </Row>
            </Container>
        </Layout>
    );
};

export default withRouter(CommonUserProfile);
