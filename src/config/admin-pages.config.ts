class DASHBOARD {
    private root = '/admin'

    LOGIN = `${this.root}/login`

    NEWS = `${this.root}/news`
    PROJECTS = `${this.root}/projects`
    ADMINISTRATION = `${this.root}/administration`
    DOCUMENTS = `${this.root}/documents`
    LOCAL_PRODUCTS = `${this.root}/local-products`
    COMMUNITY_SERVICES = `${this.root}/community-services`
    TOURIST_ATTRACTIONS = `${this.root}/tourist-attractions`
    PEOPLE_AND_VALUES = `${this.root}/people-and-values`
}

export const ADMIN_PAGES = new DASHBOARD()