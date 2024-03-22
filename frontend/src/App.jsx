import { createBrowserRouter, RouterProvider} from "react-router-dom"
import UserTable from "./components/UserTable"
import AddUser from "./components/AddUser"
import EditUser from "./components/EditUser"

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <UserTable/>
    },
    {
      path: "/add",
      element: <AddUser />
    },
    {
      path: "/edit/:id",
      element: <EditUser />
    }
  ])
  return (
    <>
      <RouterProvider router={ router }></RouterProvider>
    </>
  )
}

export default App
