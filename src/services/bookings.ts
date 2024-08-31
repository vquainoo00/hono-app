// import { paginate } from '../utils/pagination';
// import { v4 as uuidv4 } from 'uuid';

// interface Booking {
//   name: string;
//   shortName: string;
//   location: string;
// }

// export default class BookingService {
//   private prisma: any;

//   constructor(prisma: any) {
//     this.prisma = prisma;
//   }

//   async getAllBookings(cursor: string | null, itemsPerPage: number = 20) {
//     return await paginate(this.prisma, 'hotels', 'hotelId', cursor, itemsPerPage);
//   }


//   async createBooking(data: Booking): Promise<Object> {
//     try {
//       const bookingId: string = uuidv4();

//       const payload = {
//         hotelId: hotelId,
//         name: data.name,
//         shortName: data.shortName,
//         location: data.location,
//       };

//       const hotel = await this.prisma.hotels.create({
//         data: payload,
//       });
//       return hotel;
//     } catch (error) {
//       console.error('Error creating hotel:', error);
//       throw new Error('Failed to create hotel');
//     }
//   }

//   // Method to update an existing hotel
//   async updateHotel(hotelId: string, updateFields: UpdateHotelFields) {
//     try {
//       const updateData = Object.fromEntries(
//         Object.entries(updateFields).filter(([_, value]) => value !== undefined && value !== null)
//       );

//       const hotel = await this.prisma.hotels.update({
//         where: { hotelId: hotelId },
//         data: updateData,
//       });

//       return hotel;
//     } catch (error) {
//       console.error('Error updating hotel:', error);
//       throw new Error('Failed to update hotel');
//     }
//   }
// }