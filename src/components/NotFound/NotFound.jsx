import { Helmet } from "react-helmet"
import notFoundImage from "./../../assets/imges/error.svg"

export default function NotFound() {

  return (
    <div>
       <Helmet><title> Not Found</title></Helmet>

      <img src={notFoundImage} className="w-full" alt="404" />
    </div>
  )
}
