import { Loading } from "@/layouts";
import { Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { initAuthUseCase } from "./features";
import NotFoundPage from "./pages/NotFoundPage.page";
import { AdminAuthRoutes, AdminRoutes, ClientAuthRoutes, ClientPublicRoutes, ClientRoutes } from "./routes";

const App = () => {
  // sync localStorage -> store when reload
  useEffect(() => {
    initAuthUseCase();
  }, []);

  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Admin */}
          {AdminAuthRoutes}
          {AdminRoutes}

          {/* Client */}
          {ClientAuthRoutes}
          {ClientPublicRoutes}
          {ClientRoutes}

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>

      {/* Global loading */}
      <Loading />
    </BrowserRouter>
  );
};

export default App;
