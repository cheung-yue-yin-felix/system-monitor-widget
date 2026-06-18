import { RouterProvider } from 'react-router-dom'
import SettingsProvider from './context/SettingsProvider'
import { router } from './router'

function App(): React.JSX.Element {
  return (
    <SettingsProvider>
      <RouterProvider router={router} />
    </SettingsProvider>
  )
}

export default App
