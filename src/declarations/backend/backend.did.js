export const idlFactory = ({ IDL }) => {
  const TranslationEntry = IDL.Record({
    'translated' : IDL.Text,
    'targetLanguage' : IDL.Text,
    'original' : IDL.Text,
  });
  return IDL.Service({
    'addTranslation' : IDL.Func([IDL.Text, IDL.Text, IDL.Text], [], []),
    'clearHistory' : IDL.Func([], [], []),
    'getTranslationHistory' : IDL.Func(
        [],
        [IDL.Vec(TranslationEntry)],
        ['query'],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
