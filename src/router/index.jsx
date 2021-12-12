import React, { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "@/containers/layout";
import LoadPage from "components/loadPage";

const PageA = lazy(() =>
  import(
    /* webpackChunkName: 'page-a' */

    /* webpackPrefetch: true */

    "pages/page-a"
  )
);
const PageB = lazy(() =>
  import(
    /* webpackChunkName: 'page-b' */
    /* webpackPrefetch: true */
    "pages/page-b"
  )
);
const PageC = lazy(() =>
  import(
    /* webpackChunkName: 'page-c' */
    /* webpackPrefetch: true */
    "pages/page-c"
  )
);

const MyRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={LoadPage(PageA)} />
          <Route path="page-a" element={LoadPage(PageA)} />
          <Route path="page-b" element={LoadPage(PageB)} />
          <Route path="page-c" element={LoadPage(PageC)} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MyRouter;
