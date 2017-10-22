console.log("pagina inicial");

const config = {
    endpoints: {
        "endpoints": ["wss://127.0.0.1/"]
    },
    isExperimental: true,
    rootElement: 'actor-web-app',
    forceLocale: 'pt-BR',
    twitter: 'xloto',
    homePage: 'http://localhost',
    appName: 'Actor App'
};


// Components overriding
const components = {
    // login: null,
    // install: null,
    // deactivated: null,
    // joinGroup: null,

    // sidebar: {
    //   header: null,
    //   footer: null
    // },

    // dialog: {
    //   toolbar: null,
    //   compose: null,
    //   messages: {
    //    service: null
    //    text: null
    //    modern: null
    //    photo: null
    //    document: null
    //    contact: null
    //    location: null
    //    voice: null
    //   }
    // }
};

const features = {
    calls: true,
    search: true,
    editing: true,
    blocking: true,
    writeButton: false
};

// Actions overriding
const actions = {
    // setLoggedIn: null
    // setLoggedOut: null
};

// Translation overriding
const l18n = {}

const delegate = new ActorSDKDelegate({ components, features, actions, l18n });

const app = new ActorSDK({ delegate, ...config });
app.startApp();

