import { contactService } from "@/services/contact.service"
import { IContactForm } from "@/types/contact-form.types"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

export function useSendContactForm() {
  const { mutate: sendForm, isPending } = useMutation({
    mutationFn: (data: IContactForm) => contactService.sendContactForm(data),
    onSuccess: () => {
      toast.success("Your message has been sent successfully!")
    },
    onError: () => {
      toast.error("An error occurred while sending your message.")
    }
  })
  return { sendForm, isPending }
}