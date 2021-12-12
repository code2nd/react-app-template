import React from "react";
import Loading from "components/loading";

const LoadPage = (Cmp) => {
  return (
    <React.Suspense fallback={<Loading />}>
      <Cmp />
    </React.Suspense>
  );
};

export default LoadPage;
