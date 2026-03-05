import { Loading } from "@/layouts";
import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage.page";
import { AdminAuthRoutes, AdminRoutes, ClientAuthRoutes, ClientPublicRoutes, ClientRoutes } from "./routes";

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Admin */}
          {AdminAuthRoutes}
          {AdminRoutes}

          {/* Client */}
          {ClientAuthRoutes}
          {ClientRoutes}
          {ClientPublicRoutes}

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>

      {/* Global loading */}
      <Loading />
    </BrowserRouter>
  );
};

export default App;
