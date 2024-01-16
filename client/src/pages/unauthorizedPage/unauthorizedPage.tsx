import React from 'react';
import './unauthorizedPage.scss';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const UnauthorizedPage = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    return (
        <div className="unauth-page-container">
            <h1 className="unauth-page-code-heading"><code>{t('access_denied')}</code></h1>
            <hr />
            <h3 className='unauth-sub-heading'>{t('you_dont_have_permission_to_view_this_page')}</h3>
            <h3>🚫🚫🚫🚫</h3>
            <h6 className="w3-center w3-animate-zoom unauth-page-code">{t('error')} {t('code')}:403 {t('forbidden')}</h6>
            <h2 onClick={() => navigate("/")} className='go-back-link'>{t('go_back')}</h2>
        </div>
    );
};

export default UnauthorizedPage;