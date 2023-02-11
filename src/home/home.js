/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import './home.scss';

import {
    Container,
    Row,
    Col,
    Card,
    // CardImg,
    CardBody,
    // CardTitle,
    // CardText,
    Accordion,
    AccordionItem,
    AccordionHeader,
    AccordionBody,
    Alert,
    Nav,
    NavItem
} from 'reactstrap';
import { Button } from '../stories/Button';
import { Link, useHistory } from 'react-router-dom';
import { Input } from 'antd';
// import LanguageSelectorComp from '../components/LanguageSelectorComp';
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { slide as Menu } from 'react-burger-menu';
import Slider from 'react-slick';
import LearnMentor from '../assets/media/home/learn.svg';
import upshift from '../assets/media/UPSHIFT-diagram.jpg';
import testi1 from '../assets/media/home/testi/PHUB_LHAM_img.png';
import testi2 from '../assets/media/home/testi/MANI_DEM_img.png';
import testi3 from '../assets/media/home/testi/NIM_DORJI_img.png';
import testi4 from '../assets/media/home/testi/te1.jpg';
import testi5 from '../assets/media/home/testi/te2.jpg';
import testi6 from '../assets/media/home/testi/te3.jpg';

import IdeaBulb from '../assets/media/home/idea-bulb.png';

import map_icon_awa from '../assets/media/home/icon_aweraness.png';
import map_icon_reg from '../assets/media/home/icon_registration.png';
import map_icon_prob from '../assets/media/home/icon_problem_solving.png';
import map_icon_test from '../assets/media/home/icon_solution_testing.png';
import map_icon_pitch from '../assets/media/home/icon_solution_pichting.png';
import map_icon_incu from '../assets/media/home/icon_incubation.png';

import Loden from '../assets/media/tn-brands/4_Loden_circle.png';
import MoE from '../assets/media/tn-brands/3_MoE.jpg';
import IIF from '../assets/media/tn-brands/2_IIF.png';
import Unicef_OOI from '../assets/media/tn-brands/1_Unicef OOI.jpg';
import Unicef from '../assets/media/tn-brands/6_unicef.jpg';
import YDF from '../assets/media/tn-brands/5_YDF.png';
import LogoTn from '../assets/media/tn-brands/logo.png';

//import Blog1 from '../assets/media/home/blog/walker_elders.jpg';
// import Blog2 from '../assets/media/home/blog/UPSHIFT_blog1.jpg';
// import Blog3 from '../assets/media/home/blog/blog_2.jpg';
import Blogimg1 from '../assets/media/home/blog/b1.jpg';
//import Blogimg2 from '../assets/media/home/blog/b2.jpg';
import Blogimg3 from '../assets/media/home/blog/b3.jpg';
//import Blogimg4 from '../assets/media/home/blog/b4.jpg';
import Blogimg5 from '../assets/media/home/blog/b5.jpg';
import Blogimg6 from '../assets/media/home/blog/b6.jpg';
import Blogimg7 from '../assets/media/home/blog/b7.jpg';
import Blogimg8 from '../assets/media/home/blog/b8.jpg';
import Blogimg9 from '../assets/media/home/blog/b9.jpg';
import Blogimg10 from '../assets/media/home/blog/b10.jpg';
import Blogimg11 from '../assets/media/home/blog/b11.jpg';
import Vimeo from '@u-wave/react-vimeo';
import RegisterPopup from './registration/RegisterPopup';
import BhutanMap from '../components/MapCard/BhutanMap';
import { getDistrictData, getDistrictLiveData } from '../redux/home/actions';
import { useDispatch, useSelector } from 'react-redux';
// import FancyVideo from 'react-videojs-fancybox';
// import taVideo from '../assets/media/tn-brands/ta-video.mp4';
// import tnVideoCover from '../assets/media/tn-brands/videoCover.png';
import SchoolRegisterPopup from './SchoolRegisterPopup';
import axios from 'axios';
import ScrollToTop from 'react-scroll-to-top';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { getSchedulesForTeacherAndStudents } from '../redux/schedules/actions';
import { compareDates } from '../helpers/Utils';
import i18next from 'i18next';
// new push
const Home = () => {
    const { t } = useTranslation();
    const [open, setOpen] = useState('1');
    const dispatch = useDispatch();
    const history = useHistory();
    const { schedules } = useSelector((state) => state.schedules);
    const [modalShow, setModalShow] = useState(false);
    // useLayoutEffect(() => {
    //     dispatch(getSchedulesForTeacherAndStudents());
    // }, []);
    useLayoutEffect(() => {
        const moduleName = localStorage.getItem('module');
        if (
            localStorage.getItem('current_user') &&
            localStorage.getItem('module')
        ) {
            moduleName === 'MENTOR'
                ? history.push('/teacher/dashboard')
                : moduleName === 'ADMIN'
                ? history.push('/admin/dashboard')
                : moduleName === 'EVALUATOR'
                ? history.push('/evaluator/submitted-ideas')
                : moduleName === 'EADMIN'
                ? history.push('/eadmin/dashboard')
                : history.push('/dashboard');
        }
    }, []);
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    const [slider1, setSlider1] = useState(null);
    const [slider2, setSlider2] = useState(null);

    const [diesCode, setDiesCode] = useState('');
    const [orgData, setOrgData] = useState({});
    const [show, setShow] = useState(false);
    const [showPopUp, setShowPopUp] = useState(false);
    // const [select, handleSelect] = useState(false);

    const [sidebar, setSidebar] = useState(false);

    useEffect(() => {
        setNav1(slider1);
        setNav2(slider2);
    });

    const inputField = {
        type: 'text',
        className: 'defaultInput'
    };

    const handleOnChange = (e) => {
        setDiesCode(e.target.value);
        setShow(false);
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
                    setOrgData(response?.data?.data[0]);
                    setShow(true);
                }
            })
            .catch(function (error) {
                console.log(error);
                setOrgData();
                setShow(true);
            });
        e.preventDefault();
    };

    const handleRegister = () => {
        setShowPopUp(true);
        setShow(false);
    };

    useLayoutEffect(() => {
        dispatch(getDistrictData());
        // dispatch(getDistrictLiveData());
    }, []);

    const toggle = (id) => {
        open === id ? setOpen() : setOpen(id);
    };

    // const [onSearch] = useState('');

    // const { Search } = Input;

    const partners = [
        {
            id: 1,
            key: 'MoE',
            // imageUrl: Telangana
            imageUrl: MoE
        },
        {
            id: 2,
            key: 'YDF',
            // imageUrl: Congnizant
            imageUrl: YDF
        },
        {
            id: 3,
            key: 'Loden',
            // imageUrl: Unicef
            imageUrl: Loden
        },
        {
            id: 4,
            key: 'Unicef',
            // imageUrl: Congnizant
            imageUrl: Unicef
        },
        {
            id: 5,
            key: 'Unicef_OOI',
            // imageUrl: Congnizant
            imageUrl: Unicef_OOI
        },
        {
            id: 6,
            key: 'IIF',
            // imageUrl: Congnizant
            imageUrl: IIF
        }
    ];

    const testimonials = [
        {
            id: 1,
            imageUrl: testi1,
            desc: `${t('home_tl.testimonials_desc_1')}`,
            name: `${t('home_tl.testimonials_name_1')}`,
            title: `${t('home_tl.testimonials_title_1')}`
        },
        {
            id: 2,
            imageUrl: testi2,
            desc: `${t('home_tl.testimonials_desc_2')}`,
            name: `${t('home_tl.testimonials_name_2')}`,
            title: `${t('home_tl.testimonials_title_2')}`
        },
        {
            id: 3,
            imageUrl: testi3,
            desc: `${t('home_tl.testimonials_desc_3')}`,
            name: `${t('home_tl.testimonials_name_3')}`,
            title: `${t('home_tl.testimonials_title_3')}`
        },
        {
            id: 4,
            imageUrl: testi4,
            desc: `${t('home_tl.testimonials_desc_4')}`,
            name: `${t('home_tl.testimonials_name_4')}`,
            title: `${t('home_tl.testimonials_title_4')}`
        },
        {
            id: 5,
            imageUrl: testi5,
            desc: `${t('home_tl.testimonials_desc_5')}`,
            name: `${t('home_tl.testimonials_name_5')}`,
            title: `${t('home_tl.testimonials_title_5')}`
        },
        {
            id: 6,
            imageUrl: testi6,
            desc: `${t('home_tl.testimonials_desc_6')}`,
            name: `${t('home_tl.testimonials_name_6')}`,
            title: `${t('home_tl.testimonials_title_6')}`
        }
    ];

    const testimonials_settings = {
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 3000,

        responsive: [
            {
                breakpoint: 991,
                settings: {
                    dots: true
                }
            }
        ]
    };

    const blog_settings = {
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        // centerMode: true,
        focusOnSelect: true,
        asNavFor: '.slider-nav',

        responsive: [
            {
                breakpoint: 767,
                settings: {
                    arrows: false
                }
            },
            {
                breakpoint: 991,
                settings: {
                    centerMode: false
                }
            }
        ]
    };

    const blog_settings_thumbs = {
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        dots: false,
        centerMode: true,
        swipeToSlide: true,
        focusOnSelect: true,
        centerPadding: '10px'
    };

    const accordion = [
        {
            id: 1,
            title: `${t('home_tl.faq_qn_1')}`,
            desc: `${t('home_tl.faq_ans_1')}`
        },
        {
            id: 2,
            title: `${t('home_tl.faq_qn_2')}`,
            desc: `${t('home_tl.faq_ans_2')}`
        },
        {
            id: 3,
            title: `${t('home_tl.faq_qn_3')}`,
            desc: `${t('home_tl.faq_ans_3')}`
        },
        {
            id: 4,
            title: `${t('home_tl.faq_qn_4')}`,
            desc: `${t('home_tl.faq_ans_4')}`
        },
        {
            id: 5,
            title: `${t('home_tl.faq_qn_5')}`,
            desc: `${t('home_tl.faq_ans_5')}`
        }
        // {
        //     id: 6,
        //     title: `${t('home_tl.faq_qn_6')}`,
        //     desc: `${t('home_tl.faq_ans_6')}`
        // },
        // {
        //     id: 7,
        //     title: `${t('home_tl.faq_qn_7')}`,
        //     desc: `${t('home_tl.faq_ans_7')}`
        // },
        // {
        //     id: 8,
        //     title: `${t('home_tl.faq_qn_8')}`,
        //     desc: `${t('home_tl.faq_ans_8')}`
        // },
        // {
        //     id: 9,
        //     title: `${t('home_tl.faq_qn_9')}`,
        //     desc: `${t('home_tl.faq_ans_9')}`
        // }
    ];

    const blogs = [
        // {
        //     id: 112,
        //     imgUrl: Blog2,
        //     title: `${t('home_tl.idea_heading_1')}`,
        //     //desc: `${t('home_tl.idea_desc_1')}`
        //     urllinlk:"https://www.unicef.org/bhutan/stories/empowering-young-minds-become-social-innovators"
        // },
        // {
        //     id: 21,
        //     imgUrl: Blog3,
        //     title: `${t('home_tl.idea_heading_2')}`,
        //     //desc: `${t('home_tl.idea_desc_2')}`
        //     urllinlk:"https://www.unicef.org/bhutan/stories/empowering-adolescents-become-changemakers"
        // },
        {
            id: 1,
            imgUrl: Blogimg1,
            desc: `${t('home_tl.idea_desc_1')}`
        },
        // {
        //     id: 2,
        //     imgUrl: Blogimg2,
        //     desc: `${t('home_tl.idea_desc_2')}`
        // },
        {
            id: 3,
            imgUrl: Blogimg3,
            desc: `${t('home_tl.idea_desc_3')}`
        },
        // {
        //     id: 4,
        //     imgUrl: Blogimg4,
        //     desc: `${t('home_tl.idea_desc_4')}`
        // },
        {
            id: 5,
            imgUrl: Blogimg5,
            desc: `${t('home_tl.idea_desc_5')}`
        },
        {
            id: 6,
            imgUrl: Blogimg6,
            desc: `${t('home_tl.idea_desc_6')}`
        },
        {
            id: 7,
            imgUrl: Blogimg7,
            desc: `${t('home_tl.idea_desc_7')}`
        },
        {
            id: 8,
            imgUrl: Blogimg8,
            desc: `${t('home_tl.idea_desc_8')}`
        },
        {
            id: 9,
            imgUrl: Blogimg9,
            desc: `${t('home_tl.idea_desc_9')}`
        },
        {
            id: 10,
            imgUrl: Blogimg10,
            desc: `${t('home_tl.idea_desc_10')}`
        },
        {
            id: 11,
            imgUrl: Blogimg11,
            desc: `${t('home_tl.idea_desc_11')}`
        }
    ];

    return (
        <div className="home-main overflow-hidden">
            <ScrollToTop smooth color="#0da650" />
            {/* Mobile menu */}
            <Menu
                right
                className="landing-menu"
                isOpen={sidebar}
                onOpen={() => setSidebar(!sidebar)}
                onClose={() => setSidebar(!sidebar)}
            >
                <Link className="menu-item" to="/login">
                    {t('home_nav_links.btn_login')}
                </Link>
                <Link className="menu-item" onClick={() => setSidebar(false)}>
                    <Button
                        label={t('home_tl.register')}
                        btnClass="primary px-0 register"
                        size="small"
                        onClick={() => setModalShow(true)}
                    ></Button>
                </Link>
                <Nav className="ml-auto">
                    <NavItem onClick={() => setSidebar(false)}>
                        <AnchorLink
                            className="menu-item text-black"
                            href="#about"
                        >
                            {t('home_nav_links.about')}
                        </AnchorLink>
                    </NavItem>
                    <NavItem onClick={() => setSidebar(false)}>
                        <AnchorLink
                            className="menu-item mx-4 text-black"
                            href="#roadmap"
                        >
                            {t('home_nav_links.road_map')}
                        </AnchorLink>
                    </NavItem>
                    <NavItem onClick={() => setSidebar(false)}>
                        <AnchorLink
                            className="menu-item text-black"
                            href="#impact"
                        >
                            {t('home_nav_links.impact')}
                        </AnchorLink>
                    </NavItem>
                    <NavItem onClick={() => setSidebar(false)}>
                        <AnchorLink
                            className="menu-item mx-4 text-black"
                            href="#partners"
                        >
                            {t('home_nav_links.partners')}
                        </AnchorLink>
                    </NavItem>
                    <NavItem onClick={() => setSidebar(false)}>
                        <AnchorLink
                            className="menu-item text-black"
                            href="#faq"
                        >
                            {t('home_nav_links.faq')}
                        </AnchorLink>
                    </NavItem>
                    {/* <NavItem className="mt-3 ms-3">
                        <LanguageSelectorComp module="general" />
                    </NavItem> */}
                </Nav>
            </Menu>
            <section className="header ">
                <div className="home-banner">
                    <Container>
                        <Row className="justify-content-between fixed-top p-5 pb-lg-0 pb-3 pt-sm-2 mb-5 nav_row">
                            <Col md={5} className="my-auto mobile-menu">
                                <h2 className="logo mb-0">
                                    <Link className="" exact="true" to="/">
                                        <figure className="m-0">
                                            <img
                                                src={LogoTn}
                                                alt="logo"
                                                className="w-10 logoImg"
                                            />
                                        </figure>
                                    </Link>
                                    {/* <Link className="" exact="true" to="/">
                                        <figure>
                                            <img
                                                src={LogoTs1}
                                                alt="logo"
                                                className="img-fluid w-5 logoImg"
                                            />
                                        </figure>
                                    </Link>
                                    <Link className="" exact="true" to="/">
                                        <figure>
                                            <img
                                                src={LogoTs2}
                                                alt="logo"
                                                className="img-fluid w-5 logoImg"
                                            />
                                        </figure>
                                    </Link> */}

                                    {/* <LanguageSelectorComp module="general" /> */}
                                </h2>
                            </Col>
                            <Col
                                md={7}
                                className="text-right multi-actions main-menu my-auto"
                            >
                                <div className="nav p-4 justify-content-end">
                                    <Nav className="ml-auto ">
                                        <NavItem className="my-auto">
                                            <AnchorLink
                                                className="menu-item text-black mx-5"
                                                href="#about"
                                            >
                                                {t('home_nav_links.about')}
                                            </AnchorLink>
                                        </NavItem>
                                        <NavItem className="my-auto">
                                            <AnchorLink
                                                className="menu-item  text-black"
                                                href="#roadmap"
                                            >
                                                {t('home_nav_links.road_map')}
                                            </AnchorLink>
                                        </NavItem>
                                        <NavItem className="my-auto">
                                            <AnchorLink
                                                className="menu-item text-black mx-5"
                                                href="#impact"
                                            >
                                                {t('home_nav_links.impact')}
                                            </AnchorLink>
                                        </NavItem>
                                        <NavItem className="my-auto">
                                            <AnchorLink
                                                className="menu-item  text-black"
                                                href="#partners"
                                            >
                                                {t('home_nav_links.partners')}
                                            </AnchorLink>
                                        </NavItem>
                                        <NavItem className="my-auto">
                                            <AnchorLink
                                                className="menu-item text-black mx-5"
                                                href="#faq"
                                            >
                                                {t('home_nav_links.faq')}
                                            </AnchorLink>
                                        </NavItem>
                                        {/* <NavItem>
                                            <LanguageSelectorComp module="general" />
                                        </NavItem> */}
                                    </Nav>
                                    {/* <LanguageSelectorComp module="general" /> */}
                                </div>
                            </Col>
                        </Row>
                        <Row className="h-100">
                            <Col xs={12} md={10} lg={4} className="center">
                                <h1>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: t(
                                                'home_tl.Hero_section-header'
                                            )
                                        }}
                                    ></div>
                                </h1>

                                <>
                                    <p>
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: t(
                                                    'home_tl.Hero_section-description'
                                                )
                                            }}
                                        ></div>
                                    </p>
                                    <div className="d-flex mini123">
                                        {/* {schedules &&
                                        schedules.length > 0 &&
                                        schedules[0]?.teacher &&
                                        schedules[0]?.teacher?.registration &&
                                        compareDates(
                                            schedules[0].teacher?.registration
                                        ) ? ( */}
                                        <>
                                            <Button
                                                // label={t('home.get_Started')}
                                                label={t('home_tl.register')}
                                                btnClass="primary mx-3"
                                                size="small"
                                                onClick={() =>
                                                    setModalShow(true)
                                                }
                                            />

                                            <Link
                                                className="landing-page-actions1"
                                                exact="true"
                                                to="/teacher"
                                            >
                                                <Button
                                                    label={t('home_tl.login')}
                                                    btnClass="primary "
                                                    onClick={() => {
                                                        history.push(
                                                            '/teacher'
                                                        );
                                                        i18next.changeLanguage(
                                                            'en'
                                                        );
                                                    }}
                                                    size="small"
                                                />
                                            </Link>
                                        </>
                                        {/* ) : (
                                            <p className="green reg_text_size">
                                                Registration will start on{' '}
                                                {schedules &&
                                                    schedules.length > 0 &&
                                                    schedules[0]?.teacher &&
                                                    schedules[0]?.teacher
                                                        ?.registration
                                                        ?.start_date}
                                            </p>
                                        )} */}
                                    </div>
                                </>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </section>
            <section className="about-us" id="about">
                <Container fluid className="px-5">
                    <Row>
                        <Col md={12} className="text-center">
                            <div className="heading">
                                <h5>{t('home_tl.about_us')}</h5>
                                <h2 className="sub-heading text-center">
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: t(
                                                'home_tl.about_us_heading'
                                            )
                                        }}
                                    ></div>
                                </h2>
                            </div>
                        </Col>
                    </Row>
                    <Row className="sidp_row p-3 px-md-5">
                        <Col md={12} className="pe-md-4">
                            {/* <div
                                dangerouslySetInnerHTML={{
                                    __html: t('home_tl.about_us_desc')
                                }}
                            ></div> */}
                            <p>Ministry of Education is piloting Adolescents Skills and Employability project/Upshift programme across 64 schools and 10 youth centers in 2022. In partnership with UNICEF Bhutan, Youth Development Fund and Loden Foundation, Ministry aims to equip young people with a new set of 21st century skills, transferable skills, and other high-level thinking skills such as communication skills, problem-solving, decision-making, negotiation skills, teambuilding, and co-creating solutions to address social issues in communities.</p>
                            <p>With support from partners, Ministry oriented 74 focal and 4639 upshifters (2496F) including out of school youth between February and June. Adolescents and young people across 64 schools and 10 youth centers are engaged in identifying social issues in communities, co-creating solutions using skills and knowledge they have learnt from the project, and implementing projects in partnership with community leaders, school management and other stakeholders.</p>
                        </Col>
                        <Col md={6} className="my-auto pb-0">
                        <p>To encourage adolescent and young people to apply their skills and knowledge learnt through the process and to scale up upshift project, UNICEF and partners will shortlist 12 potential projects out of 74 projects and organize national innovation challenge in February 2023. Through the competition, at least top five ideas will be provided attractive SEED budget to scale up project and connect with online mentorship programme. Meanwhile, schools and youth centers are implementing projects and relying on UNISOLVE, an online digital upshift programme to enhance skills and knowledge of adolescents and young people.</p>
                        </Col>
                        {/* <Col md={6} className="my-auto ">
                            <div className="position-relative sidp_video_box">
                                <FancyVideo
                                    source={taVideo}
                                    poster={tnVideoCover}
                                    id={'sintel'}
                                />
                            </div>
                        </Col> */}
                        <Col
                            md={6}
                            className="position-relative"
                            style={{ minHeight: '35rem' }}
                        >
                            <div
                                className="position-absolute"
                                style={{ width: '100%', height: '100%' }}
                            >
                                <Vimeo video={788903751} />
                            </div>
                        </Col>
                        <Col md={12}>
                        <p>UNICEF and partners will continue to introduce upshift programme to other schools in the future to reach to most unreached adolescent and young people and prepare them to transit from learning institutes to labor market. Adolescents Skills and Employability project/Upshift programme was launched in May 2022 with support from UNICEF Regional Office and Office of Innovation.</p>
                        </Col>
                    </Row>
                </Container>
                <div className="bg-white mx-0 p-md-5 p-2">
                    <Row className="my-5 p-5 upshift p-3 ">
                        <Col md={12} lg={5} className="teacher ">
                            <figure className="text-center">
                                <img
                                    src={upshift}
                                    alt="mentor"
                                    className="img-fluid"
                                />
                            </figure>
                        </Col>
                        <Col
                            md={12}
                            lg={7}
                            className="my-auto teacher-heading pe-md-5"
                        >
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: t('home_tl.about_upshift_heading')
                                }}
                            ></div>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: t('home_tl.about_upshift_desc')
                                }}
                            ></div>
                        </Col>
                    </Row>
                </div>
                <Container className="py-md-4 py-2 px-5" fluid>
                    <Row className="student py-md-4 py-2">
                        <Col
                            md={12}
                            lg={6}
                            className="my-auto mx-auto student-heading px-5 "
                        >
                            <h2 className="mb-5 sub-heading">
                                UPSHIFT {t('home_tl.power_by')}{' '}
                                <span className="green">UNISOLVE</span>{' '}
                            </h2>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: t('home_tl.upshift_power_desc')
                                }}
                            ></div>
                            {/* <Link
                                    className="landing-page-actions"
                                    exact="true"
                                    to="/login"
                                >
                                    <Button
                                        label={t(
                                            'home.learners_students_new_button'
                                        )}
                                        btnClass="primary mx-3"
                                        size="small"
                                    />
                                </Link> */}
                        </Col>
                        <Col md={12} lg={6}>
                            <figure className="my-0">
                                <img
                                    src={LearnMentor}
                                    alt="learn"
                                    className="img-fluid"
                                />
                            </figure>
                        </Col>
                    </Row>
                </Container>
            </section>
            {/* <section className="mentor-student">
        <Container className="both">
            <Row>
                <Col
                    md={12}
                    lg={6}
                    className="my-auto teacher-heading order-2 order-xl-1"
                >
                    <div dangerouslySetInnerHTML={{ __html: t('home_tl.about_upshift_heading') }}></div>



                    <div dangerouslySetInnerHTML={{ __html: t('home_tl.about_upshift_desc') }}></div>
                    
                </Col>

                <Col
                    md={12}
                    lg={6}
                    className="teacher order-1  order-md-2"
                >
                    <figure className='text-right'>
                        <img
                            src={upshift}
                            alt="mentor"
                            className="img-fluid" />
                    </figure>
                </Col>
            </Row>

            <Row className="student">
                <Col md={12} lg={6}>
                    <figure className='my-0'>
                        <img
                            src={LearnMentor}
                            alt="learn"
                            className="img-fluid" />
                    </figure>
                </Col>
                <Col
                    md={12}
                    lg={6}
                    className="my-auto mx-auto student-heading px-5 "
                >
                    
                    <h2 className='mb-5 sub-heading'>

                        UPSHIFT powered by <span className="green">
                            UNISOLVE
                        </span>{' '}
                    </h2>
                    <div dangerouslySetInnerHTML={{ __html: t('home_tl.upshift_power_desc') }}></div>
                    <Link
                        className="landing-page-actions"
                        exact="true"
                        to="/login"
                    >
                        <Button
                            label={t(
                                'home.learners_students_new_button'
                            )}
                            btnClass="primary mx-3"
                            size="small" />
                    </Link>

                    
                </Col>
            </Row>
        </Container>
    </section> */}
            <section className="road-map" id="roadmap">
                <div className="heading">
                    <h2 className="sub-heading w-100 text-center">
                        {t('home_tl.roadmpa_heading')}
                    </h2>
                </div>

                <div className="timeline">
                    <div className="timeline__event  animated fadeInUp delay-3s timeline__event--type1">
                        <div className="timeline__event__icon ">
                            {/* <i className="lni-cake">sdsd</i> */}
                            <img src={map_icon_awa} />
                        </div>
                        <div className="timeline__event__date text-white">
                            Step-1
                        </div>
                        <div className="timeline__event__content ">
                            <div
                                className="timeline__event__title"
                                style={{ color: '#067de1' }}
                            >
                                {t('home_tl.roadmpa_one')}
                            </div>
                            <div className="timeline__event__description">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: t('home_tl.roadmpa_one_desc')
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                    <div className="timeline__event animated fadeInUp delay-2s timeline__event--type2">
                        <div className="timeline__event__icon">
                            <img src={map_icon_reg} />
                        </div>
                        <div className="timeline__event__date text-white">
                            Step-2
                        </div>
                        <div className="timeline__event__content">
                            <div className="timeline__event__title">
                                {t('home_tl.roadmpa_two')}
                            </div>
                            <div className="timeline__event__description">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: t('home_tl.roadmpa_two_desc')
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                    <div className="timeline__event animated fadeInUp delay-2s timeline__event--type2">
                        <div className="timeline__event__icon">
                            <img src={map_icon_prob} />
                        </div>
                        <div className="timeline__event__date text-white">
                            Step-3
                        </div>
                        <div className="timeline__event__content">
                            <div className="timeline__event__title">
                                {t('home_tl.roadmpa_three')}
                            </div>
                            <div className="timeline__event__description">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: t('home_tl.roadmpa_three_desc')
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                    <div className="timeline__event animated fadeInUp delay-2s timeline__event--type2">
                        <div className="timeline__event__icon">
                            <img src={map_icon_test} />
                        </div>
                        <div className="timeline__event__date text-white">
                            Step-4
                        </div>
                        <div className="timeline__event__content">
                            <div className="timeline__event__title">
                                {t('home_tl.roadmpa_four')}
                            </div>
                            <div className="timeline__event__description">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: t('home_tl.roadmpa_four_desc')
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                    <div className="timeline__event animated fadeInUp delay-1s timeline__event--type3">
                        <div className="timeline__event__icon">
                            <img src={map_icon_pitch} />
                        </div>
                        <div className="timeline__event__date text-white">
                            Step-5
                        </div>
                        <div className="timeline__event__content">
                            <div className="timeline__event__title">
                                {t('home_tl.roadmpa_five')}
                            </div>
                            <div className="timeline__event__description">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: t('home_tl.roadmpa_five_desc')
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                    <div className="timeline__event animated fadeInUp timeline__event--type1">
                        <div className="timeline__event__icon">
                            <img src={map_icon_incu} />
                        </div>
                        <div className="timeline__event__date text-white">
                            Step-6
                        </div>
                        <div className="timeline__event__content">
                            <div
                                className="timeline__event__title"
                                style={{ color: '#067de1' }}
                            >
                                {t('home_tl.roadmpa_six')}
                            </div>
                            <div className="timeline__event__description">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: t('home_tl.roadmpa_six_desc')
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="state-map" id="impact">
                <div className="heading">
                    <h2 className="sub-heading text-center">
                        {t('home_tl.engagement')}
                    </h2>
                </div>
                <BhutanMap />
            </section>
            <section className="blog">
                <Container fluid className="px-5">
                    <Row className="text-center justify-content-md-center">
                        <div className="heading">
                            <h2 className="sub-heading">
                                {t('home.student_ideas')}
                                <span className="blue">
                                    {t('home.student_ideas_span')}
                                </span>
                                <img
                                    src={IdeaBulb}
                                    alt="Student Idea"
                                    className="img-fluid"
                                    style={{ marginLeft: '2rem' }}
                                />
                            </h2>
                        </div>

                        <Col md={12} className="blog-slider slider-width">
                            <div className="">
                                <Slider
                                    {...blog_settings}
                                    asNavFor={nav2}
                                    ref={(slider) => setSlider1(slider)}
                                >
                                    {blogs.map((blog, i) => {
                                        return (
                                            <div key={i}>
                                                {/* <a href={blog.urllinlk} target='_blank' rel="noreferrer"> */}
                                                <div
                                                    className="blog-card"
                                                    // style={{ backgroundImage: `url(${blog.imgUrl})` }}
                                                    style={{
                                                        backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.1), rgba(35, 31, 32, 0.99)),
                            url(${blog.imgUrl})`
                                                    }}
                                                >
                                                    <CardBody className="text-left ">
                                                        <h4 className="pt-5 text-white">
                                                            {blog.title}
                                                        </h4>
                                                        <blockquote className="blockquote text-white">
                                                            <p className="pb-5 text-white">
                                                                {blog.desc}
                                                            </p>
                                                        </blockquote>
                                                    </CardBody>
                                                </div>
                                                {/* </a> */}
                                            </div>
                                        );
                                    })}
                                </Slider>
                                <div className="thumbnail-slider-wrap">
                                    <Slider
                                        {...blog_settings_thumbs}
                                        asNavFor={nav1}
                                        ref={(slider) => setSlider2(slider)}
                                    >
                                        {blogs.map((slide, i) => (
                                            <div
                                                className="slick-slide"
                                                key={i}
                                            >
                                                <img
                                                    className="slick-slide-image"
                                                    src={slide.imgUrl}
                                                    alt="thumbnail"
                                                />
                                            </div>
                                        ))}
                                    </Slider>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="testimonials ">
                <Container fluid>
                    <Row className="text-center justify-content-md-center">
                        <div className="heading" style={{ zIndex: 1 }}>
                            <h2 className="sub-heading">
                                {t('home.testimonials')}
                            </h2>
                        </div>

                        <Col md={10} className="testimonials-slider">
                            <Slider {...testimonials_settings}>
                                {testimonials.map((testimonial, i) => {
                                    return (
                                        <Card key={i}>
                                            <figure className="text-center">
                                                <img
                                                    src={testimonial.imageUrl}
                                                    className="img-fluid rounded-circle"
                                                    alt="How Unisolve Works"
                                                />
                                            </figure>
                                            <CardBody>
                                                <blockquote className="blockquote text-center">
                                                    <p
                                                        className="mb-0"
                                                        dangerouslySetInnerHTML={{
                                                            __html: testimonial.desc
                                                        }}
                                                    ></p>
                                                    <footer className="blockquote-footer pt-5">
                                                        {' '}
                                                        <h6>
                                                            {testimonial.name}
                                                        </h6>
                                                        <cite title="Source Title">
                                                            {testimonial.title}
                                                        </cite>
                                                    </footer>
                                                </blockquote>
                                            </CardBody>
                                        </Card>
                                    );
                                })}
                            </Slider>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="uni-partners counter" id="partners">
                <Container className="text-center">
                    <Row className="counter-card">
                        <Col md={3} className="my-auto">
                            <h4>{t('home.key_partners')}</h4>
                        </Col>
                        <Col md={9} className="testimonials-slider">
                            <Slider
                                dots={false}
                                slidesToShow={5}
                                slidesToScroll={1}
                                autoplay={true}
                                autoplaySpeed={3000}
                                arrows={false}
                                className="major"
                            >
                                {partners.map((partners, i) => {
                                    return (
                                        <figure
                                            className="text-center my-auto w-100"
                                            key={i}
                                        >
                                            <img
                                                src={partners.imageUrl}
                                                className="img-fluid mx-1"
                                                alt="How Unisolve Works"
                                            />
                                        </figure>
                                    );
                                })}
                            </Slider>
                            <Row className="mini">
                                {partners.map((partners, i) => {
                                    return (
                                        <Col sm={12} md={6} lg={4} key={i}>
                                            <figure className="text-center my-auto">
                                                <img
                                                    src={partners.imageUrl}
                                                    className="img-fluid mx-1"
                                                    alt="How Unisolve Works"
                                                />
                                            </figure>
                                        </Col>
                                    );
                                })}
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </section>
            ``
            <section className="locate-unisolve">
                <Container>
                    <Row>
                        <Col md={12} className="text-center">
                            <h2>{t('home.join_us')}</h2>
                            <div className="heading">
                                {/* <h2 className="sub-heading1 mb-3">
                                    {t('home.unisolve_partner')}
                                </h2> */}
                                <h5 className="text-center">
                                    {t('home.unisolve_partner_paragraph')}
                                </h5>
                            </div>
                        </Col>
                    </Row>
                    <Row className="text-center justify-content-md-center my-5">
                        <Col md={12} lg={6}>
                            <Row>
                                <Col md={9} className="my-auto">
                                    <Input
                                        {...inputField}
                                        id="organization_code"
                                        onChange={(e) => handleOnChange(e)}
                                        value={diesCode}
                                        name="organization_code"
                                        placeholder={t('home_tl.search_school')}
                                        className="w-100 mb-3 mb-md-0"
                                        style={{
                                            borderRadius: '60px',
                                            padding: '9px 11px'
                                        }}
                                    />
                                </Col>
                                <Col
                                    md={3}
                                    style={{ zIndex: '999' }}
                                    className="partner-btn"
                                >
                                    <Button
                                        label={t('home_tl.search_btn')}
                                        btnClass="primary mx-3 w-100"
                                        size="small"
                                        onClick={(e) => handleSearch(e)}
                                    />
                                </Col>
                            </Row>

                            {orgData && show ? (
                                <Card className="mt-3 text-left p-4">
                                    <CardBody>
                                        <Alert color="primary ">
                                            School: {orgData.organization_name}{' '}
                                            <br />
                                            City: {orgData.city}
                                            <br />
                                            {/* {orgData.mentor != null && <span>Teacher already exist</span>} <br /> */}
                                            {orgData.mentor === null ? (
                                                <span>
                                                    Teacher is not yet
                                                    registered
                                                </span>
                                            ) : (
                                                <spa>
                                                    Teacher is already
                                                    registered
                                                </spa>
                                            )}
                                        </Alert>
                                    </CardBody>
                                </Card>
                            ) : show ? (
                                <Card className="mt-3 text-left p-4">
                                    <CardBody>
                                        <Alert color="warning">
                                            <Row>
                                                <Col className="text-center">
                                                    <span>
                                                        Entered Teacher Unique
                                                        Code & School details
                                                        are not registered with
                                                        us.
                                                    </span>
                                                    <span>
                                                        <br />
                                                        Thank you for your
                                                        interest! Please contact
                                                        your program coordinator
                                                        to enroll and
                                                        participate in this
                                                        program.
                                                    </span>
                                                    {/* <br />
                                                    <u onClick={handleRegister}>
                                                        Click here
                                                    </u>{' '}
                                                    to register your school */}
                                                </Col>
                                                {/* <Col className='text-right my-auto'>
                                            <Button
                                                
                                                label="Click here"
                                                btnClass="primary mx-3"
                                                size="small"
                                                onClick={handleRegister} />
                                           
                                        </Col> */}
                                            </Row>
                                        </Alert>
                                    </CardBody>
                                </Card>
                            ) : null}
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="faq " id="faq">
                <Container>
                    <Row className="text-center justify-content-md-center">
                        <div className="heading">
                            <h2 className="sub-heading">
                                {t('home.unisolve_faq')}
                            </h2>
                        </div>

                        <Col md={12} lg={9} className="testimonials-slider">
                            <Accordion open={open} toggle={toggle}>
                                {accordion.map((item, i) => {
                                    return (
                                        <AccordionItem
                                            className="mb-5 b-0"
                                            key={i}
                                        >
                                            <AccordionHeader targetId={item.id}>
                                                {item.title}
                                            </AccordionHeader>
                                            <AccordionBody
                                                accordionId={item.id}
                                            >
                                                {/* <p>{item.desc}</p> */}
                                                <div
                                                    dangerouslySetInnerHTML={{
                                                        __html: item.desc
                                                    }}
                                                ></div>
                                            </AccordionBody>
                                        </AccordionItem>
                                    );
                                })}
                            </Accordion>
                        </Col>
                    </Row>
                </Container>
            </section>
            <footer className="footer">
                <Container fluid>
                    <Row>
                        <Col
                            md={12}
                            className="footer-section-one my-auto logo"
                        >
                            <Link className="w-auto" exact="true" to="/">
                                <figure className="text-center">
                                    <img
                                        src={LogoTn}
                                        alt="logo"
                                        className="img-fluid logoImg"
                                        style={{ width: '39.5%' }}
                                    />
                                </figure>
                            </Link>
                        </Col>
                        <Col md={12} className="text-center nav-section my-3">
                            {/* <h3>{t('home.footer_imp_links')}</h3> */}
                            <Nav className=" justify-content-center d-inline-flex">
                                <NavItem className="my-auto">
                                    <AnchorLink
                                        className="menu-item text-black  "
                                        href="#about"
                                    >
                                        {t('home_nav_links.about')}
                                    </AnchorLink>
                                </NavItem>
                                <NavItem className="my-auto mx-5">
                                    <AnchorLink
                                        className="menu-item  text-black"
                                        href="#roadmap"
                                    >
                                        {t('home_nav_links.road_map')}
                                    </AnchorLink>
                                </NavItem>
                                <NavItem className="my-auto">
                                    <AnchorLink
                                        className="menu-item text-black "
                                        href="#impact"
                                    >
                                        {t('home_nav_links.impact')}
                                    </AnchorLink>
                                </NavItem>
                                <NavItem className="my-auto mx-5">
                                    <AnchorLink
                                        className="menu-item  text-black"
                                        href="#partners"
                                    >
                                        {t('home_nav_links.partners')}
                                    </AnchorLink>
                                </NavItem>
                                <NavItem className="my-auto">
                                    <AnchorLink
                                        className="menu-item text-black "
                                        href="#faq"
                                    >
                                        {t('home_nav_links.faq')}
                                    </AnchorLink>
                                </NavItem>
                                <Link
                                    className="mx-4"
                                    exact="true"
                                    to="/termsandconditions"
                                >
                                    {t('home.footer_terms')}
                                </Link>
                            </Nav>
                        </Col>
                    </Row>
                </Container>
                <Row className="w-100 mt-5 mx-0 footer-sub">
                    <Col md={12} className="text-center">
                        <p className="my-0 py-3 text-white text-center">
                            © UNISOLVE, UNICEF {new Date().getFullYear()}.{' '}
                            {t('home_nav_links.rights')}{' '}
                        </p>
                    </Col>
                </Row>
            </footer>
            {modalShow && (
                <RegisterPopup
                    show={modalShow}
                    setShow={setModalShow}
                    dics={setDiesCode}
                    setShowPopUp={setShowPopUp}
                    onHide={() => setModalShow(false)}
                />
            )}
            {showPopUp && (
                <SchoolRegisterPopup
                    show={showPopUp}
                    setShow={setShowPopUp}
                    diesCode1={diesCode}
                    onHide={() => setShowPopUp(false)}
                />
            )}
        </div>
    );
};

export default Home;
