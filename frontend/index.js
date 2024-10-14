import { backend } from 'declarations/backend';

const inputText = document.getElementById('inputText');
const targetLanguage = document.getElementById('targetLanguage');
const outputText = document.getElementById('outputText');
const speakButton = document.getElementById('speakButton');
const historyList = document.getElementById('historyList');
const clearHistoryButton = document.getElementById('clearHistoryButton');

let translationTimeout;

inputText.addEventListener('input', () => {
    clearTimeout(translationTimeout);
    translationTimeout = setTimeout(translateText, 500);
});

targetLanguage.addEventListener('change', translateText);
speakButton.addEventListener('click', speakTranslation);
clearHistoryButton.addEventListener('click', clearHistory);

async function translateText() {
    const text = inputText.value.trim();
    const lang = targetLanguage.value;

    if (text === '') {
        outputText.textContent = '';
        return;
    }

    try {
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${lang}`);
        const data = await response.json();

        if (data.responseStatus === 200) {
            const translatedText = data.responseData.translatedText;
            outputText.textContent = translatedText;
            await backend.addTranslation(text, translatedText, lang);
            updateHistory();
        } else {
            outputText.textContent = 'Translation error. Please try again.';
        }
    } catch (error) {
        console.error('Translation error:', error);
        outputText.textContent = 'Translation error. Please try again.';
    }
}

function speakTranslation() {
    const text = outputText.textContent;
    const lang = targetLanguage.value;

    if (text) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        speechSynthesis.speak(utterance);
    }
}

async function updateHistory() {
    const history = await backend.getTranslationHistory();
    historyList.innerHTML = '';
    history.forEach(entry => {
        const li = document.createElement('li');
        li.textContent = `${entry.original} → ${entry.translated} (${getLanguageName(entry.targetLanguage)})`;
        historyList.appendChild(li);
    });
}

async function clearHistory() {
    await backend.clearHistory();
    updateHistory();
}

function getLanguageName(code) {
    switch (code) {
        case 'de': return 'German';
        case 'fr': return 'French';
        case 'es': return 'Spanish';
        default: return code;
    }
}

// Initial history update
updateHistory();
