import Navbar from "./component/Navbar"
import EntrySection from "./component/EntrySection"
import SearchBar from "./component/SearchBar"
import MainContent from "./component/MainContent"
import CoinModal from "./component/CoinModal"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { SearchContextProvide } from "./component/Context"
import { AuthContextProvider } from "./component/Auth/AuthContext"
import AuthModal from "./component/Auth/AuthModal"

function App() {

return (
  <>
    <Router>
      <AuthContextProvider>
      <Navbar />
      <div className="container mx-auto px-6 py-8">
        <EntrySection /> 
        <SearchContextProvide>
          <SearchBar />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<MainContent />} />
              <Route path="/coins/:coinID" element={<CoinModal />} />
            </Routes>
          </AnimatePresence>
        </SearchContextProvide>
      </div>
      <AuthModal />
      </AuthContextProvider>
    </Router>
  </>
)
}

export default App
