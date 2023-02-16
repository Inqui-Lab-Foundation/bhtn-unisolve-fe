/* eslint-disable indent */
import { Card, CardBody, Col, Row } from 'reactstrap';
// import SingleMapdataCard from './SingleMapdataCard';
import institutions from '../../assets/media/img/institutions.png';
import idea from '../../assets/media/img/ideas.png';
import people from '../../assets/media/img/bhutan_teams.png';
import team1 from '../../assets/media/img/upshifers.png';
import team from '../../assets/media/img/boys.png';
import youth_centers from '../../assets/media/img/youth_centers.png';
import girls from '../../assets/media/img/girls.png';
import { useTranslation } from 'react-i18next';

const MapdataCard = ({ values, all, districtName }) => {
    const { t } = useTranslation();
    return (
        <>
            {all && !all?.district_name ? (
                <div className="d-flex flex-column card-width">
                    <Card className="card text-dark text-center bg-light mb-3">
                        <CardBody>
                            <h2 className="text-uppercase">
                                {values?.district_name &&
                                values?.district_name === 'all'
                                    ? 'Bhutan'
                                    : districtName}
                            </h2>
                        </CardBody>
                    </Card>
                    <Row>
                        <Col>
                            <div className="mb-5 d-flex align-items-center">
                                <img
                                    src={institutions}
                                    alt="institutions"
                                    className=" mx-4"
                                />
                                <div>
                                    <h4>
                                        {!values?.overall_schools
                                            ? '0'
                                            : `${values?.reg_schools}`}
                                    </h4>
                                    <small className="blue">
                                        {t('home_tl.institutions')}
                                    </small>
                                </div>
                            </div>
                        </Col>
                        <Col>
                            <div className="mb-5 d-flex align-items-center">
                                <img
                                    src={youth_centers}
                                    alt="Youth center"
                                    className=" mx-4"
                                />
                                <div style={{ width: 'max-content' }}>
                                    <h4>
                                        {!values?.youth_center
                                            ? '0'
                                            : values?.youth_center}
                                    </h4>
                                    <small className="blue">
                                        {t('home_tl.youth_center')}
                                    </small>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="mb-5 d-flex align-items-center ">
                                <img
                                    src={people}
                                    alt="teams"
                                    className="mx-4"
                                />
                                <div style={{ width: 'max-content' }}>
                                    <h4>
                                        {values?.teams ? values?.teams : '0'}
                                    </h4>
                                    <small className="blue">
                                        {t('home_tl.student_teams')}
                                    </small>
                                </div>
                            </div>
                        </Col>
                        <Col>
                            <div className="mb-5 d-flex align-items-center">
                                <img src={idea} alt="idea" className=" mx-4" />
                                <div>
                                    <h4>{!values.ideas ? 0 : values.ideas}</h4>
                                    <small className="blue">
                                        {t('home_tl.ideas')}
                                    </small>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="mb-5 d-flex align-items-center ">
                                <img src={team1} alt="team1" className="mx-4" />
                                <div>
                                    <h4>
                                        {Number(values.boys) +
                                            Number(values.girls)}
                                    </h4>
                                    <small className="blue">
                                        UPSHIFTers <br />
                                    </small>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="mb-5 d-flex align-items-center ">
                                <img src={team} alt="teams" className="mx-4" />
                                <div>
                                    <h4>{values?.boys ? values?.boys : '0'}</h4>
                                    <small className="blue">
                                        UPSHIFTers <br />
                                        (Boys)
                                    </small>
                                </div>
                            </div>
                        </Col>
                        <Col>
                            <div className="mb-5 d-flex align-items-center ">
                                <img src={girls} alt="teams" className="mx-4" />
                                <div>
                                    <h4>
                                        {values?.girls ? values?.girls : '0'}
                                    </h4>
                                    <small className="blue">
                                        UPSHIFTers <br />
                                        (Girls)
                                    </small>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            ) : (
                <div className="d-flex flex-column card-width">
                    <Card className="card text-dark text-center bg-light mb-3">
                        <CardBody>
                            <h2 className="">{'Bhutan'}</h2>
                        </CardBody>
                    </Card>
                    <Row>
                        <Col>
                            <div className="mb-5 d-flex align-items-center">
                                <img
                                    src={institutions}
                                    alt="institutions"
                                    className=" mx-4"
                                />
                                <div>
                                    <h4>
                                        {!all?.overall_schools
                                            ? '0'
                                            : `${all?.reg_schools}`}
                                    </h4>
                                    <small className="blue">
                                        {t('home_tl.institutions')}
                                    </small>
                                </div>
                            </div>
                        </Col>
                        <Col>
                            <div className="mb-5 d-flex align-items-center">
                                <img
                                    src={youth_centers}
                                    alt="Youth center"
                                    className=" mx-4"
                                />
                                <div style={{ width: 'max-content' }}>
                                    <h4>
                                        {!all?.youth_center
                                            ? '0'
                                            : all?.youth_center}
                                    </h4>
                                    <small className="blue">
                                        {t('home_tl.youth_center')}
                                    </small>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="mb-5 d-flex align-items-center ">
                                <img
                                    src={people}
                                    alt="teams"
                                    className="mx-4"
                                />
                                <div style={{ width: 'max-content' }}>
                                    <h4>{all?.teams ? all?.teams : '0'}</h4>
                                    <small className="blue">
                                        {t('home_tl.student_teams')}
                                    </small>
                                </div>
                            </div>
                        </Col>
                        <Col>
                            <div className="mb-5 d-flex align-items-center">
                                <img src={idea} alt="idea" className=" mx-4" />
                                <div>
                                    <h4>{!all.ideas ? 0 : all.ideas}</h4>
                                    <small className="blue">
                                        {t('home_tl.ideas')}
                                    </small>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <div className="mb-5 d-flex align-items-center ">
                                <img src={team1} alt="teams" className="mx-4" />
                                <div>
                                    <h4>
                                        {Number(all.boys) +
                                            Number(all.girls)}
                                    </h4>
                                    <small className="blue">UPSHIFTers</small>
                                </div>
                            </div>
                        </Col>
                        <Col>
                            <div className="mb-5 d-flex align-items-center ">
                                <img src={team} alt="teams" className="mx-4" />
                                <div>
                                    <h4>{all?.boys ? all?.boys : '0'}</h4>
                                    <small className="blue">
                                        UPSHIFTers <br />
                                        (Boys)
                                    </small>
                                </div>
                            </div>
                        </Col>
                        <Col>
                            <div className="mb-5 d-flex align-items-center ">
                                <img src={girls} alt="teams" className="mx-4" />
                                <div>
                                    <h4>{all?.girls ? all?.girls : '0'}</h4>
                                    <small className="blue">
                                        UPSHIFTers <br />
                                        (Girls)
                                    </small>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            )}
        </>
    );
};

export default MapdataCard;
