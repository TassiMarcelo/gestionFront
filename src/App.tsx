import { UserTable } from './components/user-table'
import { ThemeProvider } from "./components/theme-provider"

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="container mx-auto py-10 min-h-screen bg-background">
        <h1 className="text-3xl font-bold mb-6">Gestión De Usuarios</h1>
        <UserTable />
      </div>
    </ThemeProvider>
  )
}

export default App