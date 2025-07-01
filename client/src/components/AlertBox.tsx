import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react"

import {
  Alert,
  AlertTitle,
} from "@/components/ui/alert"

const AlertBox = ({error, title}: {error: boolean, title: string}) => {
  return (
    <div className="grid w-full max-w-xl items-start gap-4 mt-2">
     { !error ? <Alert>
        <CheckCircle2Icon className="text-lime-600"/>
        <AlertTitle className="text-lime-600">{title}</AlertTitle>
      </Alert>
      : <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>{title}</AlertTitle>
      </Alert>}
    </div>
  )
}

export default AlertBox;