declare global {
  interface Window {
    importMapOverrides: {
      getCurrentPageMap: () => Promise<ImportMap>;
      addOverride(moduleName: string, url: string): void;
    };
    initializeSpa: () => void;
    __remotes__: Record<string, string>;
  }
  
  const __webpack_init_sharing__: any;
  const __webpack_share_scopes__: any;
}

export interface ImportMap {
  imports: Record<string, string>;
}