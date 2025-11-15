import { Signin } from "./pages/Signin"
import { Signup } from "./pages/Signup"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Dashboard } from "./pages/Dashboard"
import { Hero } from "./pages/Hero"
import { Twitter } from "./pages/Twitter"
import { Youtube } from "./pages/Youtube"
function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/twitter" element={<Twitter />} />
      <Route path="/dashboard/youtube" element={<Youtube />} />
    </Routes>
  </BrowserRouter>
}

export default App