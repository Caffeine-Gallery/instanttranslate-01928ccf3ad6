import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface TranslationEntry {
  'translated' : string,
  'targetLanguage' : string,
  'original' : string,
}
export interface _SERVICE {
  'addTranslation' : ActorMethod<[string, string, string], undefined>,
  'clearHistory' : ActorMethod<[], undefined>,
  'getTranslationHistory' : ActorMethod<[], Array<TranslationEntry>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
