import { UserTable } from './components/user-table'
import { ThemeProvider } from "./components/theme-provider"
import UserMenu from './components/ui/UserMenu';

function App() {
  const userName = 'admin'; 
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="container mx-auto py-10 min-h-screen bg-background">
      <div className="flex items-center justify-between mb-0">
        <h1 className="text-3xl font-bold mb-6">Gestión De Usuarios</h1>
        <UserMenu userName={userName} />
        </div>
        <UserTable />
      </div>
    </ThemeProvider>
  )
}

export default App