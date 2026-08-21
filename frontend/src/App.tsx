import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./app/AuthContext"
import { ProtectedRoute } from "./app/ProtectedRoute"
import { AppShell } from "./app/AppShell"
import { LoginPage } from "./app/LoginPage"
import { OverviewPage } from "./app/OverviewPage"
import { PlaceholderPage } from "./components/PlaceholderPage"
import { MODULES } from "./app/modules"

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<AppShell />}>
              <Route path="/" element={<OverviewPage />} />
              {MODULES.map((mod) => (
                <Route key={mod.id} path={mod.path} element={<PlaceholderPage title={mod.label} />} />
              ))}
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
