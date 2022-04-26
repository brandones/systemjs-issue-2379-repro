// import "import-map-overrides";
// import "systemjs/dist/system";
// import "systemjs/dist/extras/amd";
// import "systemjs/dist/extras/named-exports";
// import "systemjs/dist/extras/named-register";
// import "systemjs/dist/extras/use-default";

export function loadModules(modules: Array<string>) {
  return Promise.all(
    modules.map((name) =>
      System.import(name).then(
        async (value): Promise<[string, System.Module]> => {
          console.log("Imported value", value);
          // first check if this is a new module-type -> then we have a remote-entry first
          if ("init" in value && "get" in value) {
            await __webpack_init_sharing__("default");
            await value.init(__webpack_share_scopes__.default);
            const factory = await value.get("app");
            const newValue = factory();
            return [name, newValue];
          }

          // otherwise we can directly return
          return [name, value];
        },
        (error): [string, System.Module] => {
          console.error("Failed to load module", name, error);
          return [name, {}];
        }
      )
    )
  );
}

export function registerApp(appName: string, appExports: System.Module) {
  const setup = appExports.setup;

  if (typeof setup === "function") {
    const result = setup();

    if (result) {
      console.log("Loaded", appName, result);
    }
  }
}

function initializeSpa() {
  window.importMapOverrides
    .getCurrentPageMap()
    .then((importMap) => loadModules(Object.keys(importMap.imports)))
    .then(modules => modules.forEach(([appName, appExports]) => registerApp(appName, appExports)));
}

window.initializeSpa = initializeSpa;