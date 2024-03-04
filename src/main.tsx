import { createBrowserRouter, defer, RouterProvider } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import Cart from "./Pages/Cart/Cart";
import Error from "./Pages/Error/Error";
import Layout from "./layout/Layout/Layout";
import Product from "./components/Product/Product";
import axios from "axios";
import { PREFIX } from "./Helpers/Api";
import AuthLayout from "./layout/Auth/AuthLayout";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import { RequireAuth } from "./Helpers/RequireAuth";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Success from "./components/Success/Success";

const Menu = lazy(() => import("./Pages/Menu/Menu"));
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequireAuth>
        <Layout />
      </RequireAuth>
    ),
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={"Загрузка..."}>
            <Menu />
          </Suspense>
        ),
      },
      {
        path: '/success',
        element: <Success />
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "*",
        element: <Error />,
      },
      {
        path: "/product/:id",
        element: <Product />,
        errorElement: <>Ошибка</>,
        loader: async ({ params }) => {
          return defer({
            data: axios
              .get(`${PREFIX}/products/${params.id}`)
              .then((data) => data),
          });
        },
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
