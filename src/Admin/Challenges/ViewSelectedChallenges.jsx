/* eslint-disable indent */
import React, { useEffect } from 'react';
import './ViewSelectedChallenges.scss';
import Layout from '../../Admin/Layout';
import DataTable, { Alignment } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import ViewDetail from './ViewDetail';
import axios from 'axios';
import { KEY, URL } from '../../constants/defaultValues';
import { Button } from '../../stories/Button';
import Select from './pages/Select';
import { Col, Container, Row } from 'reactstrap';
import { cardData } from '../../Student/Pages/Ideas/SDGData.js';
import { useSelector } from 'react-redux';
import { getDistrictData } from '../../redux/studentRegistration/actions';
import { useDispatch } from 'react-redux';
import { getNormalHeaders } from '../../helpers/Utils';

const ViewSelectedIdea = () => {
    const dispatch = useDispatch();
    const [isDetail, setIsDetail] = React.useState(false);
    const [ideaDetails, setIdeaDetails] = React.useState({});
    const [tableDate, settableDate] = React.useState({});
    const [district, setdistrict] = React.useState('');
    const [sdg, setsdg] = React.useState('');

    const SDGDate = cardData.map((i) => {
        return i.goal_title;
    });
    SDGDate.push('ALL');
    const fullDistrictsNames = useSelector(
        (state) => state?.studentRegistration?.dists
    );

    const filterParams =
        (district && district !== 'All Districts'
            ? '&district=' + district
            : '') + (sdg && sdg !== 'ALL' ? '&sdg=' + sdg : '');

    useEffect(() => {
        dispatch(getDistrictData());
    }, []);

    const handleclickcall = () => {
        handleideaList();
    };

    async function handleideaList() {
        const axiosConfig = getNormalHeaders(KEY.User_API_Key);
        await axios
            .get(
                `${URL.getidealist}status=SUBMITTED${filterParams}`,
                axiosConfig
            )
            .then(function (response) {
                if (response.status === 200) {
                    settableDate(
                        response.data &&
                            response.data.data[0] &&
                            response.data.data[0].dataValues
                    );
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const evaluatedIdeaforsub = {
        data: tableDate && tableDate.length > 0 ? tableDate : [],
        columns: [
            {
                name: 'No',
                cell: (params, index) => {
                    return [
                        <div className="ms-3" key={params}>
                            {index + 1}
                        </div>
                    ];
                },
                sortable: true,
                width: '10%'
            },
            {
                name: 'Team Name',
                selector: (row) => row.team_name || '',
                sortable: true,
                width: '21%'
            },
            {
                name: 'SDG',
                selector: (row) => row.sdg,
                width: '21%'
            },
            {
                name: 'Submitted By',
                selector: (row) => row.initiated_name,
                width: '21%'
            },
            {
                name: 'Status',
                cell: (row) => row.status,
                width: '11%'
            },
            {
                name: 'Actions',
                cell: (params) => {
                    return [
                        
                        <div className="d-flex" key={params}>
                            <div
                                className="btn btn-primary btn-lg mr-5 mx-2"
                                onClick={() => {
                                    setIdeaDetails(params);
                                    setIsDetail(true);
                                }}
                            >
                                View
                            </div>
                        </div>
                        
                    ];
                },
                width: '12%',
                left: true
            }
        ]
    };

    const showbutton = district && sdg;
    return (
        <Layout>
            <div className="container evaluated_idea_wrapper pt-5 mb-50">
                <div className="row">
                    <div className="col-12 p-0">
                        {!isDetail && (
                            <div>
                                <h2 className="ps-2 pb-3">Challenges</h2>

                                <Container fluid className="px-0">
                                    <Row className="align-items-center">
                                        <Col md={3}>
                                            <div className="my-3 d-md-block d-flex justify-content-center">
                                                <Select
                                                    list={fullDistrictsNames}
                                                    setValue={setdistrict}
                                                    placeHolder={
                                                        'Select District'
                                                    }
                                                    value={district}
                                                />
                                            </div>
                                        </Col>
                                        <Col md={3}>
                                            <div className="my-3 d-md-block d-flex justify-content-center">
                                                <Select
                                                    list={SDGDate}
                                                    setValue={setsdg}
                                                    placeHolder={'Select SDG'}
                                                    value={sdg}
                                                />
                                            </div>
                                        </Col>
                                            <Col md={2}>
                                                <div className="text-center">
                                                    <Button
                                                        btnClass={showbutton ? 'primary': 'default'}
                                                        size="small"
                                                        label="Search"
                                                        disabled={!showbutton}
                                                        onClick={() =>
                                                            handleclickcall()
                                                        }
                                                    />
                                                </div>
                                            </Col>
                                    </Row>
                                </Container>
                            </div>
                        )}

                        {!isDetail ? (
                            <div className="bg-white border card pt-3 mt-5">
                                <DataTableExtensions
                                    print={false}
                                    export={false}
                                    {...evaluatedIdeaforsub}
                                >
                                    <DataTable
                                        data={tableDate || []}
                                        defaultSortField="id"
                                        defaultSortAsc={false}
                                        pagination
                                        highlightOnHover
                                        fixedHeader
                                        subHeaderAlign={Alignment.Center}
                                        paginationRowsPerPageOptions={[
                                            10, 20, 30
                                        ]}
                                        paginationPerPage={10}
                                    />
                                </DataTableExtensions>
                            </div>
                        ) : (
                            <ViewDetail
                                ideaDetails={ideaDetails}
                                setIsDetail={setIsDetail}
                                settableDate={settableDate}
                                setdistrict={setdistrict}
                                setsdg={setsdg}
                            />
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ViewSelectedIdea;
