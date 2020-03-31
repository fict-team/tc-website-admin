import { TFunction, WithTranslation } from 'next-i18next';
import i18n from '../../middlewares/i18n';

export default i18n.withTranslation;

export type TranslationProps = WithTranslation;
