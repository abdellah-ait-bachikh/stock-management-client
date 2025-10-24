import { Spinner } from "@heroui/react"

const ScreenLoading = () => {
  return (<div className="w-screen h-screen flex justify-center items-center">

    <Spinner size="lg" label="Loading App ...."  />
  </div>
  )
}

export default ScreenLoading