import { createBrowserRouter } from "react-router";
import { lazy, Suspense } from "react";
import App from "./App";

const Home = lazy(() => import("./routes/home"));
const ProductDetail = lazy(() => import("./routes/product-detail"));
const Cart = lazy(() => import("./routes/cart"));
const Checkout = lazy(() => import("./routes/checkout"));
const NotFound = lazy(() => import("./routes/not-found"));

const Loading = () => (
  <div className= "flex items-center justify-center min-h-[50vh]" >
  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" > </div>
    </div>
);

const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback= {< Loading />} >
      <Home />
      </Suspense>
        ),
      },
{
  path: "cart",
    element: (
      <Suspense fallback= {< Loading />}>
        <Cart />
        </Suspense>
        ),
      },
{
  path: "checkout",
    element: (
      <Suspense fallback= {< Loading />}>
        <Checkout />
        </Suspense>
        ),
      },
{
  path: "product/:productId",
    element: (
      <Suspense fallback= {< Loading />}>
        <ProductDetail />
        </Suspense>
        ),
      },
{
  path: "*",
    element: (
      <Suspense fallback= {< Loading />}>
        <NotFound />
        </Suspense>
        ),
      },
    ],
  },
]);

export default router;
