export interface HotelRegistration {
    id?: number | null;
    name: string;
    addressLine: string | null;
    city: string | null;
    state: string | null;
    pinCode: string | null;
    maxNoOfPax: number;
    totalRooms: number;
    pricePerRoom: number | null;
    facilities: string[];
    imagePath: string | null;
    email: string | null;
}