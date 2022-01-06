import { Navbar, Welcome, Transactions } from "./components"

function App() {
  return (
    <div className="min-h-screen gradient-bg-welcome">
        <Welcome />
        <Transactions />
    </div>
  )
}

export default App
