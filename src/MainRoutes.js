import React from "react";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import App from "./App";
import { PostForm } from "./PostForm";
import "bootstrap/dist/css/bootstrap.min.css";
import { PostView } from "./PostView";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PostEdit } from "./PostEdit";
import { PageNotFound } from "./PageNotFound";
export function MainRoutes(){

    return (
        <>
        <ToastContainer/>
        <Router>
        <Routes>
            <Route path="/" element={<App/>}/>
            <Route path="/create-post" element={<PostForm/>}/>
            <Route path="/post/:id" element={<PostView/>}/>
            <Route path="/post/:id/edit"  element={<PostEdit/>}/>
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    </Router>
    </>
    )
}