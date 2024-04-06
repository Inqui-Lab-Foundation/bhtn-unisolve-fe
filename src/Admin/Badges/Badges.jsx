/* eslint-disable indent */
// import React from 'react';
// import './style.scss';
// import Layout from '../../Admin/Layout';
// import PageConstruction from '../../components/PageUnderConstrcution';

// const BadgesComp = () => {
//     return (
//         <Layout>
//             <PageConstruction />
//         </Layout>
//     );
// };

// export default BadgesComp;
import React, { useEffect, useState } from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    CardImg,
    CardBody,
    CardTitle
} from 'reactstrap';
import './style.scss';
import { openNotificationWithIcon } from '../../helpers/Utils';
import { Button } from '../../stories/Button';

// import badgesBg from '../../../assets/media/img/badge_header.svg';
// import { ProgressComp } from '../../../stories/Progress/Progress';
import { Figure } from 'react-bootstrap';
import Layout from '../../Admin/Layout';
// import { useDispatch, useSelector } from 'react-redux';
// import { getStudentBadges } from '../../redux/studentRegistration/actions';
import axios from 'axios';

import { getCurrentUser } from '../../helpers/Utils';
// import moment from 'moment/moment';
const BadgesComp = () => {
    // const { badges } = useSelector((state) => state.studentRegistration);
    // const language = useSelector(
    //     (state) => state?.studentRegistration?.studentLanguage
    // );
    const [badgesRes, setBadgesRes] = useState({});

    const currentUser = getCurrentUser('current_user');
    // const dispatch = useDispatch();
    useEffect(() => {
        var config = {
            method: 'get',
            url: process.env.REACT_APP_API_BASE_URL + '/badges',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${currentUser.data[0]?.token}`
            }
            // data: finalObj,
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setBadgesRes(response.data.data[0].dataValues);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);
    // const [popupList, setPopupList] = useState([]);
    // const [imgUrl, setImgUrl] = useState('');
    // const [showspin, setshowspin] = React.useState(false);
    const [ideaList, setIdeaList] = useState([]);

    useEffect(() => {
        handlepopupList();
    }, []);
    async function handlepopupList() {
        //  handlePopupList Api where we can see list of all resource //
        let config = {
            method: 'get',
            url: process.env.REACT_APP_API_BASE_URL + '/popup',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            }
        };
        await axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    // console.log(response, '222');

                    setIdeaList(response?.data?.data[0]?.dataValues[0]);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const Statusfunc = async (item, id) => {
        let config = {
            method: 'put',
            url: process.env.REACT_APP_API_BASE_URL + `/popup/${id}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            },
            data: item
        };
        await axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    openNotificationWithIcon(
                        'success',
                        item.on_off === '1' && id === 1
                            ? 'PopUp successfully Enabled'
                            : item.on_off === '0' && id === 1
                            ? 'PopUp successfully Disabled'
                            : item.on_off === '1' && id === 2
                            ? 'Idea Submission successfully Enabled'
                            : item.on_off === '0' && id === 2
                            ? 'Idea Submission successfully Disabled'
                            : 'Popup Image upload successfull'
                    );
                    handlepopupList();
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const handleStatus = (item, id) => {
        Statusfunc({ on_off: `${item}` }, id);
    };
    return (
        <Layout>
            <div className="badges-page mt-5 mb-50">
                <Container className=" mt-2 ">
                    <Row>
                        <Col md={12} className="w-100 d-block">
                            <h2 className="title mb-4">Available Badges</h2>
                        </Col>
                    </Row>

                    <Row
                        className="myBadges equal mt-0 mb-50"
                        style={{ gap: '1.5rem' }}
                    >
                        {badgesRes &&
                            badgesRes.length > 0 &&
                            badgesRes.map((badge, i) => {
                                return (
                                    <div
                                        key={i}
                                        className="badgesCard  col-xs-12 col-sm-6  col-xl-2 mb-3"
                                    >
                                        <Card
                                            className="badge-card py-5 h-100"
                                            // style={{
                                            //     backgroundColor: `${
                                            //         badge?.student_status
                                            //             ? ''
                                            //             : 'lightgrey'
                                            //     }`
                                            // }}
                                        >
                                            <Figure className="w-100 text-center">
                                                <CardImg
                                                    alt={badge.icon}
                                                    src={
                                                        process.env
                                                            .REACT_APP_API_IMAGE_BASE_URL +
                                                        badge.icon
                                                    }
                                                    style={{ width: '7.4rem' }}
                                                />
                                            </Figure>
                                            <CardBody>
                                                <CardTitle className="badge-name mb-3">
                                                    {badge.name}
                                                </CardTitle>
                                                {/* <CardSubtitle className="badge-date">
                                                    EARNED ON:{' '}
                                                    <span className="badge-time">
                                                        {badge?.student_status
                                                            ? moment(
                                                                  badge?.student_status
                                                              ).format(
                                                                  'DD MMM YYYY'
                                                              )
                                                            : 'Locked'}
                                                    </span>
                                                </CardSubtitle> */}
                                            </CardBody>
                                        </Card>
                                    </div>
                                );
                            })}
                    </Row>
                    <Row className="mb-2 mb-sm-5 mb-md-5 mb-lg-2 mt-2 mt-sm-5 mt-md-5 mt-lg-5">
                        <Col className="col-auto">
                            <h2>Idea Submission</h2>
                        </Col>
                    </Row>
                    <Card className="p-5">
                        <Row>
                            <Col>
                                <h2>
                                    status :{' '}
                                    <span
                                        className={
                                            ideaList.on_off === '1'
                                                ? 'text-success'
                                                : 'text-danger'
                                        }
                                    >
                                        {ideaList.on_off === '1'
                                            ? 'Enabled'
                                            : 'Disabled'}
                                    </span>
                                </h2>
                                {ideaList.on_off === '1' ? (
                                    <Button
                                        label="Disable"
                                        btnClass="primary mx-3"
                                        size={'small'}
                                        shape="btn-square"
                                        backgroundColor={'red'}
                                        onClick={() =>
                                            handleStatus('0', ideaList.popup_id)
                                        }
                                    />
                                ) : (
                                    <Button
                                        label="Enable"
                                        btnClass="primary mx-3"
                                        size={'small'}
                                        shape="btn-square"
                                        backgroundColor={'green'}
                                        onClick={() =>
                                            handleStatus('1', ideaList.popup_id)
                                        }
                                    />
                                )}
                                <p className="p-5">
                                    Note : Before disabling the idea Submission
                                    please change all draft status to submitted
                                    status
                                </p>
                            </Col>
                        </Row>
                    </Card>
                </Container>
            </div>
        </Layout>
    );
};

export default BadgesComp;
