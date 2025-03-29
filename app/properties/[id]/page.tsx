import ReservationSideBar from '@/app/components/properties/ReservationSideBar';
import Image from 'next/image';
import apiService from '@/app/services/apiService';
import { getUserId } from '@/app/lib/actions';
import Link from 'next/link';

const PropertyDetailPage = async ({ params }: { params: { id: string } }) => {
  const id = await params.id; // Await params.id
  const property = await apiService.get(`api/properties/${id}/`);
  const userId = await getUserId();
  return (
    <main className="max-w-[1500px] mx-auto px-6 py-8 pb-6">
      <div className="w-full h-[64vh] mb-4 overflow-hidden rounded-xl relative ">
        <Image
          src={'/beach_1.jpg'}
          alt="beach house"
          fill
          className="object-cover w-full h-full"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="col-span-3 py-6 pr-6">
          <h1 className="mb-4 text-4xl">{property.title}</h1>
          <span className="mb-6 block text-lg text-gray-600">
            {property.guests} Guests - {property.bedrooms} bedrooms -{' '}
            {property.bathrooms} bathrooms
          </span>
          <hr />
          <Link
            href={`/landlords/${property.landlord.id}`}
            className="py-6 flex items-center space-x-4"
          >
            {property.landlord.avatar && (
              <Image
                src={'/profile_pic_1.jpg'}
                alt="Category - Beach"
                width={50}
                height={50}
                className="rounded-full"
              />
            )}
            <p>
              <strong className="">{property.landlord.username}</strong> is your
              host
            </p>
          </Link>
          <hr />
          <p className="mt-6 text-lg">{property.description} </p>
        </div>
        <ReservationSideBar property={property} userId={userId} />
      </div>
    </main>
  );
};
export default PropertyDetailPage;
