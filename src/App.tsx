import { Routes, Route, Navigate, NavLink } from "react-router-dom";
import { CataloguePage } from "./pages/CataloguePage";
import { WorkshopDetailPage } from "./pages/WorkshopDetailPage";
import { BookingsPage } from "./pages/BookingsPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export default function App() {
  return (
    <>
      <nav>
        <NavLink to="/workshops">Ateliers</NavLink>{" "}
        <NavLink to="/bookings">Mes inscriptions</NavLink>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/workshops" replace />} />
          <Route path="/workshops" element={<CataloguePage />} />
          <Route path="/workshops/:id" element={<WorkshopDetailPage />} />
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
}