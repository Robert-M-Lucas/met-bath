
export type Language = "en" | "jp";

export interface TranslationInterface {
    self: Language,
    MET_NAME: string,
    INDEX_PAGE_NAME: string,
    HOME_PAGE_LINK: string,
    OTHERS_PAGE_LINK: string,
    YOU_PAGE_LINK: string,
    PREFERENCES_PAGE_LINK: string,
    LOGIN_OR_SIGNUP_LINK: string,
    LOGOUT_LINK: string,
    SEARCH_PEOPLE_ELLIPSES: string,
    YOU_MIGHT_KNOW: string,
    SEARCH_LINK: string,
    SEARCH_RESULT: string,
    USERNAME_LABEL: string,
    REQUIRED_ALPHANUMERIC_UNDERSCORE: string,
    USERNAME_DESCRIPTION: string,
    FIRST_NAME_LABEL: string,
    REQUIRED_ALPHABETIC: string,
    MIDDLE_NAMES_LABEL: string,
    OPTIONAL_ALPHABETIC_SPACES: string,
    SURNAME_LABEL: string,
    JOB_TITLE_LABEL: string,
    REQUIRED_ALPHABETIC_SPACES: string,
    EMAIL_LABEL: string,
    EMAIL_DESCRIPTION: string,
    LOCAITON_LABEL: string,
    OPTIONAL: string,
    CARD_FOREGROUND_LABEL: string,
    CARD_SECONDARY_LABEL: string,
    CARD_BACKGROUND_LABEL: string,
    CARD_PREVIEW_LABEL: string,
    SAVE_BUTTON: string,
    TEL_LABEL: string,
    MAIL_LABEL: string,
    WEB_LABEL: string,
    LOCATION_LABEL: string,
    COMPANY_LABEL: string,
    RESET_COLOURS_LINK: string,
    ABOUT_LABEL: string,
    PROFILE_CREATION_PAGE: string,
    PHONE_NUMBER_LABEL: string,
    WEBSITE_LABEL: string,
    ABOUT_DESCRIPTION: string
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
    YOU_MIGHT_KNOW: "You might know",
    SEARCH_LINK: "Search",
    SEARCH_RESULT: "Search",
    USERNAME_LABEL: "Username",
    REQUIRED_ALPHANUMERIC_UNDERSCORE: "Required - alphanumeric and underscores",
    USERNAME_DESCRIPTION: "This is the unique, user-readable name by which people can find you",
    FIRST_NAME_LABEL: "First Name",
    REQUIRED_ALPHABETIC: "Required - alphabetic",
    MIDDLE_NAMES_LABEL: "Middle Name(s)",
    OPTIONAL_ALPHABETIC_SPACES: "Optional - alphabetic and spaces",
    SURNAME_LABEL: "Surname",
    JOB_TITLE_LABEL: "Job Title",
    REQUIRED_ALPHABETIC_SPACES: "Required - alphabetic and spaces",
    EMAIL_LABEL: "Email",
    EMAIL_DESCRIPTION: "Email shown on card. Can be different to account email.",
    LOCAITON_LABEL: "Location",
    COMPANY_LABEL: "Company",
    OPTIONAL: "Optional",
    CARD_FOREGROUND_LABEL: "Card Foreground Colour",
    CARD_SECONDARY_LABEL: "Card Secondary Colour",
    CARD_BACKGROUND_LABEL: "Card Background Colour",
    CARD_PREVIEW_LABEL: "Card Preview",
    SAVE_BUTTON: "Save",
    TEL_LABEL: "Tel",
    MAIL_LABEL: "Mail",
    WEB_LABEL: "Web",
    LOCATION_LABEL: "Location",
    RESET_COLOURS_LINK: "Reset Card Colours",
    ABOUT_LABEL: "About",
    PROFILE_CREATION_PAGE: "Profile creation page",
    PHONE_NUMBER_LABEL: "Phone Number",
    WEBSITE_LABEL: "Website",
    ABOUT_DESCRIPTION: "Some extra information about you - not shown on your card."
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
    SEARCH_PEOPLE_ELLIPSES: "[JP] Search people...",
    YOU_MIGHT_KNOW: "[JP] You might know",
    SEARCH_LINK: "[JP] Search",
    SEARCH_RESULT: "[JP] Search",
    USERNAME_LABEL: "[JP] Username",
    REQUIRED_ALPHANUMERIC_UNDERSCORE: "[JP] Required - alphanumeric and underscores",
    USERNAME_DESCRIPTION: "[JP] This is the unique, user-readable name by which people can find you",
    FIRST_NAME_LABEL: "[JP] First Name",
    REQUIRED_ALPHABETIC: "[JP] Required - alphabetic",
    MIDDLE_NAMES_LABEL: "[JP] Middle Name(s)",
    OPTIONAL_ALPHABETIC_SPACES: "[JP] Optional - alphabetic and spaces",
    SURNAME_LABEL: "[JP] Surname",
    JOB_TITLE_LABEL: "[JP] Job Title",
    REQUIRED_ALPHABETIC_SPACES: "[JP] Required - alphabetic and spaces",
    EMAIL_LABEL: "[JP] Email",
    EMAIL_DESCRIPTION: "[JP] Email shown on card. Can be different to account email.",
    LOCAITON_LABEL: "[JP] Location",
    COMPANY_LABEL: "[JP] Company",
    OPTIONAL: "[JP] Optional",
    CARD_FOREGROUND_LABEL: "[JP] Card Foreground Colour",
    CARD_SECONDARY_LABEL: "[JP] Card Secondary Colour",
    CARD_BACKGROUND_LABEL: "[JP] Card Background Colour",
    CARD_PREVIEW_LABEL: "[JP] Card Preview",
    SAVE_BUTTON: "[JP] Save",
    TEL_LABEL: "[JP] Tel",
    MAIL_LABEL: "[JP] Mail",
    WEB_LABEL: "[JP] Web",
    LOCATION_LABEL: "[JP] Location",
    RESET_COLOURS_LINK: "[JP] Reset Card Colours",
    ABOUT_LABEL: "[JP] About",
    PROFILE_CREATION_PAGE: "[JP] Profile creation page",
    PHONE_NUMBER_LABEL: "[JP] Phone Number",
    WEBSITE_LABEL: "[JP] Website",
    ABOUT_DESCRIPTION: "[JP] Some extra information about you - not shown on your card."
}