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
    entities: [
        {
            order: 1,
            name: "user",
            path: "users",
            fieldsConfiguration: [
                {
                    fieldName: "id",
                    headerName: "ID",
                    type: "number",
                    minWidth: 50,
                },
                {
                    fieldName: "firstName",
                    headerName: "First name",
                    type: "string",
                    minWidth: 200,
                    // flex: 1
                }
            ]
        },
        {
            order: 2,
            name: "not-orm-example-entity",
            path: "blog-posts",
            fieldsConfiguration: [
                {
                    fieldName: "id",
                    type: "number",
                }
            ]
        }
    ]
}

root.render(
        <React.StrictMode>
            
                <App config={cfg}/>
            
    </React.StrictMode>
);
