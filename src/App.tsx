import {Authenticated, GitHubBanner, Refine, ResourceProps, WelcomePage} from '@refinedev/core';
import {DevtoolsPanel, DevtoolsProvider} from "@refinedev/devtools";
import {RefineKbar, RefineKbarProvider} from "@refinedev/kbar";

import {ErrorComponent, notificationProvider, RefineSnackbarProvider, ThemedLayoutV2} from '@refinedev/mui';

import dataProvider from "@refinedev/simple-rest";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import {BrowserRouter, Outlet, Route, Routes} from "react-router-dom";
import routerBindings, {
    CatchAllNavigate,
    DocumentTitleHandler,
    NavigateToResource,
    UnsavedChangesNotifier
} from "@refinedev/react-router-v6";
import {EntityList} from "./pages/entity/list";
import {ColorModeContextProvider} from "./contexts/color-mode";
import {Header} from "./components";
import {Login} from "./pages/login";
import {Register} from "./pages/register";
import {ForgotPassword} from "./pages/forgotPassword";
import {authProvider} from "./authProvider";
import Entity from "./entity"
import {ReactNode} from "react";
import {EntityEdit} from "./pages/entity/edit";
import AppConfig from "./appConfig";

interface AppProps {
    config: AppConfig
}

function App({config}: AppProps) {
    // console.log(config);
    const entities = config.entities;
    // console.log(entities);

    let resources: Array<ResourceProps> = [];
    let routes: Array<ReactNode>  = [];
    entities.forEach((entity: Entity, i: number) => {
        resources.push({
            name: entity.name,
            list: config.pathPrefix + "/" + entity.name,
            create: config.pathPrefix + "/" + entity.name + "/create",
            edit: config.pathPrefix + "/" + entity.name + "/edit/:id",
            show: config.pathPrefix + "/" + entity.name + "/show/:id",
            meta: {
                canDelete: true,
            },
        });
        let editRoute: ReactNode;
        if(entity.editFieldsConfiguration != undefined && entity.editFieldsConfiguration.length != 0) {
            console.log("not empty")
            console.log(entity.editFieldsConfiguration);
            editRoute = <Route path="edit/:id" element={<EntityEdit fieldsConfiguration={entity.editFieldsConfiguration}/>}/>
        } else {
            console.log("empty");
        }

        routes.push(
            <Route key={"item-"+ i} path={config.pathPrefix + "/" + entity.name}>
                <Route index element={<EntityList fields={entity.listFieldsConfiguration}/>}/>
                {editRoute}
                {/*<Route path="create" element={<EntCreate/>}/>*/}
                {/*<Route path="show/:id" element={<BlogPostShow/>}/>*/}
            </Route>
        );
    })

    console.log(routes);

    let schemaResponse = {
        baseUrl: config.apiUrl,
        loginPath: "/login",
        resources: resources,
        options: {
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
            useNewQueryKeys: true,
            projectId: "n0XM4g-TMwVLK-RYjUD0",
        }

    }

    return (
        <BrowserRouter>
            <GitHubBanner/>
            <RefineKbarProvider>
                <ColorModeContextProvider>
                    <CssBaseline/>
                    <GlobalStyles styles={{html: {WebkitFontSmoothing: "auto"}}}/>
                    <RefineSnackbarProvider>
                        <DevtoolsProvider>
                            <Refine dataProvider={dataProvider(schemaResponse.baseUrl)}
                                    notificationProvider={notificationProvider}
                                    routerProvider={routerBindings}
                                    authProvider={authProvider}
                                    resources={schemaResponse.resources}
                                    options={schemaResponse.options}
                            >
                                <Routes>
                                    <Route
                                        key="auth"
                                        element={
                                            <Authenticated
                                                key="authenticated-inner"
                                                fallback={<CatchAllNavigate to={schemaResponse.loginPath}/>}
                                            >WelcomePage
                                                <ThemedLayoutV2
                                                    Header={() => <Header sticky/>}
                                                >
                                                    <Outlet/>
                                                </ThemedLayoutV2>
                                            </Authenticated>
                                        }
                                    >
                                        <Route key="start-page" index element={<WelcomePage/>}/>
                                        {routes}
                                        {/*<Route index element={*/}
                                        {/*    <NavigateToResource resource="blog_posts"/>*/}
                                        {/*}/>*/}

                                        {/*<Route path="/blog-posts">*/}
                                        {/*    <Route index element={<BlogPostList/>}/>*/}
                                        {/*    <Route path="create" element={<BlogPostCreate/>}/>*/}
                                        {/*    <Route path="edit/:id" element={<BlogPostEdit/>}/>*/}
                                        {/*    <Route path="show/:id" element={<BlogPostShow/>}/>*/}
                                        {/*</Route>*/}
                                        {/*<Route path="/categories">*/}
                                        {/*    <Route index element={<CategoryList fields={catList}/>}/>*/}
                                        {/*    <Route path="create" element={<CategoryCreate/>}/>*/}
                                        {/*    <Route path="edit/:id" element={<CategoryEdit/>}/>*/}
                                        {/*    <Route path="show/:id" element={<CategoryShow/>}/>*/}
                                        {/*</Route>*/}
                                        <Route path="*" element={<ErrorComponent/>}/>
                                    </Route>
                                    <Route
                                        key="auth2"
                                        element={
                                            <Authenticated key="authenticated-outer" fallback={<Outlet/>}>
                                                <NavigateToResource/>
                                            </Authenticated>
                                        }
                                    >
                                        <Route path="/login" element={<Login/>}/>
                                        <Route path="/register" element={<Register/>}/>
                                        <Route path="/forgot-password" element={<ForgotPassword/>}/>
                                    </Route>
                                </Routes>


                                <RefineKbar/>
                                <UnsavedChangesNotifier/>
                                <DocumentTitleHandler/>
                            </Refine>
                            <DevtoolsPanel/>
                        </DevtoolsProvider>
                    </RefineSnackbarProvider>


                </ColorModeContextProvider>
            </RefineKbarProvider>
        </BrowserRouter>
    );
}

export default App;
