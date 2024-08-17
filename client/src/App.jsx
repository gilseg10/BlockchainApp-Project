import { Navbar, Welcome, Footer, Services, Transactions } from "./components"

const App = () => {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg">
        <Navbar />
        <Welcome />
        <Services />
        <Transactions />
        <Footer />
      </div>
    </div>
  )
}

export default App
