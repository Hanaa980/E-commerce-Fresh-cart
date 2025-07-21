import { Helmet } from "react-helmet";
import notFoundImage from "./../../assets/imges/error.svg";

export default function NotFound() {
  return (
  <>
      <Helmet>
        <title> Not Found</title>
      </Helmet>
  <div className="mt-[100px]">
      <img src={notFoundImage} className="w-full" alt="404" />
    </div>
    </>
  );
}
