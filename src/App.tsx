import Navbar from "./components/Navbar"
import RoutesWithNotFound from "./utilities/RoutesWithNotFound";
import Home from "./pages/Home";
import SpAudiovisual from "./pages/SpAudiovisual";
import { Route } from "react-router-dom";
import ExploreMovies from "./pages/ExploreMovies";
import Footer from "./components/Footer";
function App() {

  return (
    <>
      <Navbar />
      <RoutesWithNotFound>
        <Route path="/" element={<Home />} />  
        <Route path=":audiovisual/:id" element={<SpAudiovisual />} />        
        <Route path="/search/:audiovisual?/:q?/:filter?" element={<ExploreMovies />} />
      </RoutesWithNotFound>
      <Footer />
    </>
  )
}

export default App
