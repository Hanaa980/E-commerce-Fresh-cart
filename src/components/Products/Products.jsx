import RecentProduct from "../RecentProduct/RecentProduct";
import { Helmet } from "react-helmet";

export default function Products() {
  return (
    <>
      <Helmet>
        <title> Products</title>
      </Helmet>
      <RecentProduct />
    </>
  );
}
