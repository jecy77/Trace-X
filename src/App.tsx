import { Route, Routes } from "react-router";
import DemoPage from "./pages/demo";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/home";
import TransactionDetail from "./pages/transaction/detail";

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="tx" element={<TransactionDetail />} />
        </Route>
        <Route path="demo" element={<DemoPage />} />
      </Routes>
    </>
  );
}

export default App;
