export enum Screen{
    HOME = 'home',
    STATEMENT = 'statement',
    CHAT = 'chat',
    OPTIONS = 'options',
    OPTIONS_CONSENSUS = 'options-consensus',
    OPTIONS_NEW = 'options-new',
    OPTIONS_RANDOM = 'options-random',
}

export interface NavObject {
    link: Screen;
    name: string;
    id: string;
}