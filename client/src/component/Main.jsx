import { BrowserRouter } from "react-router"
import { Routing } from "../routing/Routing"
import { Nav } from "../routing/Nav"
import store from "../redux/store"
import { Provider } from "react-redux"

// Main app component that wraps the app with Redux Provider and Router
export const Main = () => {   
    return (
        <>
            {/* Redux Provider to pass the store to the app */}
            <Provider store={store}>
                {/* React Router BrowserRouter for routing */}
                <BrowserRouter>
                    {/* Navigation bar */}
                    <Nav />
                    {/* Routing component that renders routes */}
                    <Routing />
                </BrowserRouter>
            </Provider>
        </>
    )
}
