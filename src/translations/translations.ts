export type Language = "en" | "jp";

export interface TranslationInterface {
    self: Language,
    MET_NAME: string,
    INDEX_PAGE_NAME: string,
    HOME_PAGE_LINK: string,
    OTHERS_PAGE_LINK: string,
    YOU_PAGE_LINK: string,
    PREFERENCES_PAGE_LINK: string,
    LOGIN_OR_SIGNUP_LINK: string
    LOGOUT_LINK: string
    SEARCH_PEOPLE_ELLIPSES: string
}

export const EN_TRANSLATIONS: TranslationInterface = {
    self: "en",
    MET_NAME: "MET",
    INDEX_PAGE_NAME: "Index Page",
    HOME_PAGE_LINK: "Home",
    OTHERS_PAGE_LINK: "Others",
    YOU_PAGE_LINK: "You",
    PREFERENCES_PAGE_LINK: "Preferences",
    LOGIN_OR_SIGNUP_LINK: "Login/Signup",
    LOGOUT_LINK: "Logout",
    SEARCH_PEOPLE_ELLIPSES: "Search people...",
}

export const JP_TRANSLATIONS: TranslationInterface = {
    self: "jp",
    MET_NAME: "[JP] MET",
    INDEX_PAGE_NAME: "[JP] Index Page",
    HOME_PAGE_LINK: "[JP] Home",
    OTHERS_PAGE_LINK: "[JP] Others",
    YOU_PAGE_LINK: "[JP] You",
    PREFERENCES_PAGE_LINK: "[JP] Preferences",
    LOGIN_OR_SIGNUP_LINK: "[JP] Login/Signup",
    LOGOUT_LINK: "[JP] Logout",
    SEARCH_PEOPLE_ELLIPSES: "[JP] Search people..."
}