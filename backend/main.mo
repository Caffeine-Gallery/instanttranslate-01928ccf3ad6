import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Text "mo:base/Text";

actor {
  // Define a type for translation entries
  type TranslationEntry = {
    original: Text;
    translated: Text;
    targetLanguage: Text;
  };

  // Store translation history
  stable var translationHistory : [TranslationEntry] = [];

  // Add a translation to history
  public func addTranslation(original: Text, translated: Text, targetLanguage: Text) : async () {
    let entry : TranslationEntry = {
      original;
      translated;
      targetLanguage;
    };
    translationHistory := Array.append(translationHistory, [entry]);
  };

  // Get translation history
  public query func getTranslationHistory() : async [TranslationEntry] {
    translationHistory
  };

  // Clear translation history
  public func clearHistory() : async () {
    translationHistory := [];
  };
}
