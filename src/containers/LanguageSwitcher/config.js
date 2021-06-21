import language from "../../config/language.config";
import englishLang from "../../assets/images/flag/uk.svg";
import spanishLang from "../../assets/images/flag/spain.svg";
import frenchLang from "../../assets/images/flag/france.svg";

const config = {
  defaultLanguage: language,
  options: [
    {
      languageId: "english",
      locale: "en",
      text: "English",
      icon: englishLang,
    },

    {
      languageId: "spanish",
      locale: "es",
      text: "Spanish",
      icon: spanishLang,
    },
    {
      languageId: "french",
      locale: "fr",
      text: "French",
      icon: frenchLang,
    },
  ],
};

export function getCurrentLanguage(lang) {
  let selecetedLanguage = config.options[0];
  config.options.forEach((language) => {
    if (language.languageId === lang) {
      selecetedLanguage = language;
    }
  });
  return selecetedLanguage;
}
export default config;
