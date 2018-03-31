import ActorSDK from '../src/sdk/actor-sdk';
import ActorSDKDelegate from '../src/sdk/actor-sdk-delegate';

const delegate = new ActorSDKDelegate({
    components: {},
    features: {
        calls: true,
        search: true,
        editing: true,
        blocking: true,
        writeButton: true
    },
    actions: {},
    l18n: {}
});

const app = new ActorSDK({
    delegate,
    endpoints: [
        'ws://192.168.31.241:9080/'
    ],
    isExperimental: true,
    forceLocale: 'pt-BR',
    twitter: 'actorapp',
    homePage: 'https://actor.im',
    appName: 'Actor',
    loginType: 0,
    helpPhone: +5555555555555
});

app.startApp();


