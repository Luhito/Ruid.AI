import { useTranslation } from 'react-i18next';
import { Title } from '@/shared-components/Title'

export const LoginPage = () => {
    const { t } = useTranslation();

    return (
        <>
            <Title text={t('login-loginpage-title')} />
        </>
    )
}