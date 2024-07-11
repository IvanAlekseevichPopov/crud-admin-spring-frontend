import {
    Refine,
    GitHubBanner,
    WelcomePage,
    Authenticated,
} from '@refinedev/core';
import {DevtoolsPanel, DevtoolsProvider} from "@refinedev/devtools";
import {RefineKbar, RefineKbarProvider} from "@refinedev/kbar";

import {
    AuthPage, DeleteButton, EditButton, ErrorComponent
    , notificationProvider
    , RefineSnackbarProvider, ShowButton
    , ThemedLayoutV2
} from '@refinedev/mui';

import dataProvider from "@refinedev/simple-rest";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import {BrowserRouter, Route, Routes, Outlet} from "react-router-dom";
import routerBindings, {
    NavigateToResource,
    CatchAllNavigate,
    UnsavedChangesNotifier,
    DocumentTitleHandler
} from "@refinedev/react-router-v6";
import {BlogPostList, BlogPostCreate, BlogPostEdit, BlogPostShow} from "./pages/blog-posts";
import {EntityList} from "./pages/entity/list";
import {CategoryList, CategoryCreate, CategoryEdit, CategoryShow} from "./pages/categories";
import {ColorModeContextProvider} from "./contexts/color-mode";
import {Header} from "./components/header";
import {Login} from "./pages/login";
import {Register} from "./pages/register";
import {ForgotPassword} from "./pages/forgotPassword";
import {authProvider} from "./authProvider";
import React, {ReactNode} from "react";
import AppConfig from "./appConfig"
import Entity from "./entity"
import {ResourceProps} from "@refinedev/core/src/contexts/resource/types";

function App({config}) {
    // console.log(config);
    const entities = config.entities;
    // console.log(entities);

    let catList: object[] = [
        {
            field: "id",
            headerName: "ID",
            type: "number",
            minWidth: 50,
        },
        {
            field: "title",
            flex: 1,
            headerName: "Title",
            minWidth: 200,
        },
        {
            field: "actions",
            headerName: "Actions",
            sortable: false,
            renderCell: function render({row}) {
                return (
                    <>
                        <EditButton hideText recordItemId={row.id}/>
                        <ShowButton hideText recordItemId={row.id}/>
                        <DeleteButton hideText recordItemId={row.id}/>
                    </>
                );
            },
            align: "center",
            headerAlign: "center",
            minWidth: 80,
        },
    ];

    let resources: Array<ResourceProps> = [];
    let routes: Array<ReactNode> = [];
    entities.forEach((entity: Entity, i: number) => {
        console.log(entity.order, entity.name);

        resources.push({
            name: entity.path,
            list: "/" + entity.path,
            create: "/" + entity.path + "/create",
            edit: "/" + entity.path + "/edit/:id",
            show: "/" + entity.path + "/show/:id",
            meta: {
                canDelete: true,
            },
        });

        routes.push(
            <Route key={"item-"+ i} path={"/" + entity.path}>
                <Route index element={<EntityList fields={entity.fieldsConfiguration}/>}/>
                {/*<Route path="create" element={<BlogPostCreate/>}/>*/}
                {/*<Route path="edit/:id" element={<BlogPostEdit/>}/>*/}
                {/*<Route path="show/:id" element={<BlogPostShow/>}/>*/}
            </Route>
        );
    })

    let schemaResponse = {
        baseUrl: "https://api.fake-rest.refine.dev",
        loginPath: "/login",
        resources: resources,
        options: {
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
            useNewQueryKeys: true,
            projectId: "n0XM4g-TMwVLK-RYjUD0",

        }

    }


    // for (let i in entities) {
    //      let res = entities[i];
    //      console.log(schemaResponse.resources[i]); // prints elements: 10, 20, 30, 40
    //
    // }

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
};

export default App;
