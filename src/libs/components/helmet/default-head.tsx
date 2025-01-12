import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

export default function DefaultHead() {
  const { i18n } = useTranslation();
  return (
    <Helmet
      titleTemplate='%s | GIS Lessons'
      defaultTitle='GIS Lessons'
      htmlAttributes={{ lang: i18n.language }}
      base={{
        href: import.meta.env.BASE_URL,
      }}
    />
  );
}
