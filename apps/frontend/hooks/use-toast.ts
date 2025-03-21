
import { toast as sonnerToast } from "sonner";  

type ToastProps = {
  title?: string
  description?: string
  action?: React.ReactNode
}

export function toast({ title, description, action, ...props }: ToastProps) {
  return sonnerToast(title, {
    description,
    action,
    ...props,
  })
}

export const useToast = () => {
  return {
    toast,
  }
}