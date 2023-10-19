import { Footer } from "./assets/stucture/Footer"
import { Header } from "./assets/stucture/Header"
import { Main } from "./assets/stucture/Main"

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Main />
      <Footer />
    </div>
  )
}

export default App
