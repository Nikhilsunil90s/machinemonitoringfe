export default {
  apiUrl: "http://yoursite.com/api/",
};

const siteConfig = {
  siteName: "ISOMORPHIC",
  siteIcon: "ion-flash",
  footerText: "Isomorphic ©2018 Created by RedQ, Inc",
  enableAnimatedRoute: false,
};
const themeConfig = {
  topbar: "themedefault",
  sidebar: "themedefault",
  layout: "themedefault",
  theme: "themedefault",
};
const language = "english";

const accountKitConfig = {
  appId: "2349024828652337",
  state: "csrf",
  version: "v1.0",
  fbAppEventsEnabled: true,
  redirect: "https://a1021477.ngrok.io/",
  debug: process.env.NODE_ENV !== "production",
};

export { siteConfig, language, themeConfig, accountKitConfig };
