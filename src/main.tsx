import React, { ReactNode, useState } from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider} from "react-router-dom";
import {router} from "./router.tsx";

import 'bootstrap/scss/bootstrap.scss'
import { EN_TRANSLATIONS, TranslationInterface } from './translations/translations.ts';

export const LanguageContext = React.createContext<undefined | { translation: TranslationInterface; setTranslation: React.Dispatch<React.SetStateAction<TranslationInterface>>; }>(undefined);

interface Props {
    children: ReactNode
}

function LanguageContextWrapper({ children }: Props) {
    const [translation, setTranslation] = useState(EN_TRANSLATIONS);
    return <LanguageContext.Provider value={{ translation: translation, setTranslation: setTranslation }}>
        { children }
    </LanguageContext.Provider>
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <LanguageContextWrapper>
            <RouterProvider router={router}/>
        </LanguageContextWrapper>
    </React.StrictMode>
);
