// @ts-nocheck
import React from "react";
import { createRoot } from "react-dom/client";



import App from "./App";
import AppConfig from "./appConfig"


const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

let cfg: AppConfig;
cfg = {
    test: document.sonataAdminSpring?.test ?? "defaultConfigTest1",
    test2: document.sonataAdminSpring?.test2 ?? "defaultConfigTest2",
    entities: document.sonataAdminSpring.entities,
    apiUrl: document.sonataAdminSpring.apiUrl,
}

root.render(
        <React.StrictMode>
            
                <App config={cfg}/>
            
    </React.StrictMode>
);
