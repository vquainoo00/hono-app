import { paginate } from '../utils/pagination';
import { v7 as uuidv7 } from 'uuid';



enum Statuses {
    pending, active, canceled, completed
}


interface Bookings {
    bookingId: string,
    branchId: string,
    roomId: string,
    staffId: string,
    guessContact: string,
    guestName: string,
    checkInDate: string,
    checkoutDate: string,
    currency: string,
    price: number,
    status: Statuses
}

export default class BookingsService {

    prisma: any

    constructor(prisma: any){
        this.prisma = prisma
    }

    async createBooking(data: any): Promise<Bookings>{
        try {
        const bookingId: string = uuidv7()
        const payload = {
            bookingId: bookingId,
            ...data,
    
          }
        
        return await this.prisma.bookings.create({data: payload});
        }
        catch(error) {
            console.log("Error making booking: ", error)
            throw new Error('Failed to create booking');
        }

    }

    async getBookings(cursor: string | null, itemsPerPage: number | 20, queryFilters?: any) {
        return await paginate(this.prisma, 'bookings', 'bookingId', cursor, itemsPerPage);

    }
}