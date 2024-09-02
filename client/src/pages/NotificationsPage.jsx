import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../apiClient";
import NotificationCard from "../components/notifications/NotificationCard";

function NotificationsPage() {
  const { data } = useQuery({
    queryKey: ["notifications"],
    queryFn: apiClient.getNotifications,
  });

  return (
    <div className="pt-16 px-16">
      <div>
        <h1 className="font-bold text-3xl">Notifications</h1>
        <div className="grid grid-cols-1 mt-9 gap-5">
          {data?.map((notification, i) => (
            <NotificationCard key={i} notification={notification} />
          ))}
        </div>
      </div>
    </div>
  );
}
export default NotificationsPage;
