import NotificationForm from '@/components/admin/NotificationForm';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function AdminPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-10">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl font-bold tracking-tight">
            Admin Notifications
          </CardTitle>
          <CardDescription>
            Use this panel to send push notifications to all app users.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <NotificationForm />
        </CardContent>
      </Card>
    </div>
  );
}
