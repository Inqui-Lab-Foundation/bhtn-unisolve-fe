/* eslint-disable indent */
import { useLayoutEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommonPage from '../../../components/CommonPage';
import { getCurrentUser } from '../../../helpers/Utils';
import { getStudentChallengeSubmittedResponse } from '../../../redux/studentRegistration/actions';
import Layout from '../../Layout';
// import IdeasPageNew from './IdeasPageCopy';
// import SDG from './SDG';
import { useTranslation } from 'react-i18next';

const IdeaSubmission = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const language = useSelector(
        (state) => state?.studentRegistration?.studentLanguage
    );
    const challengesSubmittedResponse = useSelector(
        (state) => state?.studentRegistration.challengesSubmittedResponse
    );
    const currentUser = getCurrentUser('current_user');
    // eslint-disable-next-line no-unused-vars
    const [showChallenges, setShowChallenges] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [showCompleted, setShowCompleted] = useState(false);
    const [view, setView] = useState(false);
    useLayoutEffect(() => {
        dispatch(
            getStudentChallengeSubmittedResponse(
                currentUser?.data[0]?.team_id,
                language
            )
        );
    }, [dispatch, language, currentUser?.data[0]?.team_id]);
    useLayoutEffect(() => {
        if (
            challengesSubmittedResponse &&
            challengesSubmittedResponse.length > 0
        ) {
            challengesSubmittedResponse[0].status === 'DRAFT'
                ? setShowChallenges(true)
                : view
                ? setShowChallenges(true)
                : setShowCompleted(true);
        } else {
            setShowChallenges(false);
        }
    }, [challengesSubmittedResponse, view]);
    const commonPageText = t('student.idea_submitted_description');
    const handleView = () => {
        setShowChallenges(true);
        setShowCompleted(false);
        setView(true);
    };
    return (
        <Layout>
            <CommonPage
                text={commonPageText}
                showButton={false}
                showChallenges={handleView}
            />
        </Layout>
    );
    // return showCompleted ? (
    //     <Layout>
    //         <CommonPage
    //             text={commonPageText}
    //             showButton={true}
    //             showChallenges={handleView}
    //         />
    //     </Layout>
    // ) : showChallenges ? (
    //     <IdeasPageNew />
    // ) : (
    //     <SDG setShowChallenges={setShowChallenges} />
    // );
};
export default IdeaSubmission;
