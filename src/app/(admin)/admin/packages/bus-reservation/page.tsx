import AdminLayout from "@/layouts/AdminLayout";
import BusSeatReservationContainer from "@/containers/admin/packages/bus-reservation/BusSeatReservationContainer";

const AdminBusReservation = () => {
  return (
    <AdminLayout>
      <BusSeatReservationContainer />
    </AdminLayout>
  );
};

export default AdminBusReservation;
