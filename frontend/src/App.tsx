import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Home } from "./pages/Home"
import { MyEscrows } from "./pages/MyEscrows"
import { Received } from "./pages/Received"
import { Vault } from "./pages/Vault"
import { NftProvider } from "./context/NftContext"


const router = createBrowserRouter([
  {
    path:"/",
    element: <Home/>
  },
  {
    //all the escrows of you
    path:"/escrows-view",
    element: <MyEscrows/>
  },
  {
    // escrows shared to you
    path:"/escrows-received",
    element: <Received/>
  },
  {
    path:"/vault",
    element: <Vault/>
  },
])
function App() {

  return (
    <NftProvider>
      <div className="h-screen bg-neutral-900 text-amber-100 font-mono">
        <RouterProvider router={router}/>
      </div>
    </NftProvider>
  )
    
}

export default App
