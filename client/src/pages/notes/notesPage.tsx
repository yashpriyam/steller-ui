import { useEffect } from 'react';
import { useNotes } from '../../redux/actions/notesAction';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import './notesPage.scss';

const Notes = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const queryParams = new URLSearchParams(location.search);
  const dayNumber = queryParams.get('dayNumber');
  const weekNumber = queryParams.get('weekNumber');
  const { noteData, getAllNotes } = useNotes();

  useEffect(() => {
    getAllNotes({ dayNumber: Number(dayNumber) });
  }, []);
  return (
    <>
      <div className="notes-page-container">
        <h1>{t('notes')}</h1>
        <div className="notes-time">
          <span>
            {t('title', { title: t('week') })}
            {weekNumber}
          </span>
          <span className="notes-day">
            {t('title', { title: t('day') })}
            {dayNumber}
          </span>
        </div>
        <div className="iframe-container">
          <iframe
            title="classes-notes"
            loading="lazy"
            src={`${process.env.REACT_APP_NOTES_URL}/${noteData.noteList[0]?.link}`}
          ></iframe>
          <p>{noteData.noteList[0]?.title}</p>
          <p>
            {t('title', { title: t('estimated_reading_time') })}
            {noteData.noteList[0]?.estimatedReadingTime}
          </p>
        </div>
      </div>
    </>
  );
};

export default Notes;
