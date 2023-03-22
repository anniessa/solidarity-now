import React, {useEffect} from 'react';

function Translate() {

    useEffect(()=>{
        GoogleTranslateElementInit();
    }, []);

    const GoogleTranslateElementInit = () => {
        google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element');
    }

    return (
    <div id="google_translate_element"></div>
    )
}

export default Translate;