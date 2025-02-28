import notFoundImage from "./../../assets/imges/error.svg"

export default function NotFound() {

  return (
    <div>
      <img src={notFoundImage} className="w-full" alt="404" />
    </div>
  )
}
