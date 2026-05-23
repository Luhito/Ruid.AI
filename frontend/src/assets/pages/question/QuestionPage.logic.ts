import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const useQuestionPageLogic = () => {
    const navigate = useNavigate();
    const { t } = useTranslation("question");

    const onClick_viewAnswer = () => {
        // 確認メッセージ表示
        if(!confirm(t('view answer message'))){
            return;
        }


    }

    const onClick_back = () => {
        navigate('/')
    }

    return { 
        logics: {
            onClick_viewAnswer,
            onClick_back
        } 
    }
}