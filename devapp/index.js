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
        'ws://191.252.92.246:9080/'
    ],
    isExperimental: true,
    forceLocale: 'pt-BR',
    facebook: 'actorapp',
    twitter: 'actorapp',
    homePage: 'https://actor.im',
    appName: 'Actor'
});

app.startApp();


