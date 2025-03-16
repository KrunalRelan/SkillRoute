export interface RegisterCompany {
    companyId?: number | null;
    companyName: string;
    addressLine: string | null;
    email: string | null;
    phone: string | null;
    image: string | null;
    enquirerName: string;
    postalCode: string | null;
    city: string | null;
    country: string | null;
    state: string | null;
    categoryName: string;
    categoryId: number | null;
}