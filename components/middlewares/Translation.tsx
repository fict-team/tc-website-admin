import { TFunction } from 'next-i18next';
import i18n from '../../middlewares/i18n';

export default i18n.withTranslation;

export type TranslationProps = {
  t: TFunction;
  tReady: boolean;
};
