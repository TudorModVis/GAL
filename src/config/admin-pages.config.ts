class DASHBOARD {
    private root = '/admin'
    private authenticLocalRoot = `${this.root}/authentic-local`

    LOGIN = `${this.root}/login`

    NEWS = `${this.root}/news`
    PROJECTS = `${this.root}/projects`
    ADMINISTRATION = `${this.root}/administration`
    DOCUMENTS = `${this.root}/documents`
    LOCAL_PRODUCTS = `${this.authenticLocalRoot}/local-products`
    COMMUNITY_SERVICES = `${this.authenticLocalRoot}/community-services`
    TOURIST_ATTRACTIONS = `${this.authenticLocalRoot}/tourist-attractions`
    PEOPLE_AND_VALUES = `${this.authenticLocalRoot}/people-and-values`
}

export const ADMIN_PAGES = new DASHBOARD()