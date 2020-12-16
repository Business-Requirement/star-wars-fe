import { useEffect, useCallback } from "react";

type Callback = (script?: string) => void;
type ScriptType = string | string[];

const loadedScripts: string[] = [];

const useScripts = (scripts: ScriptType[], successCallback?: Callback, failedCallback?: Callback) => {
  const successMemo = useCallback(() => {
    if (successCallback) successCallback();
  }, [successCallback]);

  const failedMemo = useCallback(
    (script?: string) => {
      if (failedCallback) failedCallback(script);
    },
    [failedCallback]
  );

  useEffect(() => {
    let loadIdx = 0;
    const next = (_?: string) => {
      loadIdx++;
      if (loadIdx === scripts.length) {
        successMemo();
      } else {
        load(scripts[loadIdx]);
      }
    };

    const stop = (script?: string) => {
      failedMemo(script);
    };

    const load = (script: ScriptType) => {
      if (Array.isArray(script)) {
        parallel(script, next, stop);
      } else {
        loadScript(script, next, stop);
      }
    };

    load(scripts[0]);
  }, [scripts, successMemo, failedMemo]);
};

// interface ScriptOptions {
//   async: boolean;
//   defer: boolean;
// }

const loadScript = (scriptUrl: string, success: Callback, failed: Callback) => {
  if (loadedScripts.indexOf(scriptUrl) >= 0) {
    success(scriptUrl);
    return;
  }

  let script = document.createElement("script");
  script.src = scriptUrl;
  // load options
  script.async = true;

  const onSuccess = () => {
    loadedScripts.push(scriptUrl);
    success(scriptUrl);
    removeListener();
  };

  const onError = () => {
    failed(scriptUrl);
    removeListener();
  };

  const removeListener = () => {
    script.removeEventListener("load", onSuccess);
    script.removeEventListener("error", onError);
  };

  script.addEventListener("load", onSuccess);
  script.addEventListener("error", onError);
  document.body.appendChild(script);
};

const parallel = (scripts: string[], success: Callback, failed: Callback) => {
  let nLoaded = 0;
  const onSuccess = (script?: string) => {
    nLoaded++;
    if (nLoaded === scripts.length) {
      // all scripts loaded
      success();
    }
  };

  const onError = (script?: string) => {
    failed(script);
  };

  scripts.forEach(script => {
    loadScript(script, onSuccess, onError);
  });
};

export default useScripts;
