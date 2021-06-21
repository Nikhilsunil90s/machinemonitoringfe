import Enlang from "./entries/en-US";
import Eslang from "./entries/es_ES";
import Frlang from "./entries/fr_FR";
import { addLocaleData } from "react-intl";

const AppLocale = {
  en: Enlang,
  es: Eslang,
  fr: Frlang,
};
addLocaleData(AppLocale.en.data);
addLocaleData(AppLocale.es.data);
addLocaleData(AppLocale.fr.data);

export default AppLocale;
