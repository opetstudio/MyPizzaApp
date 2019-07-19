import I18n from '../../I18n'

export const textMessage = (id, options) => {
  const translations = I18n.t(id, options) || ''
  return translations.search(/missing/g) === 1 ? id : translations
};
