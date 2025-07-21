import { axiosClassic } from "@/api/interceptors";
import { IContactForm, IContactFormResponse } from "@/types/contact-form.types";

class ContactService {
    private BASE_URL = '/contact'

    async sendContactForm(data: IContactForm) {
        const response = await axiosClassic.post<IContactFormResponse>(`${this.BASE_URL}/send`, data);
        return response;
    }
}

export const contactService = new ContactService();