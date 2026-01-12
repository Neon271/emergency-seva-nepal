import NotificationForm from '@/components/admin/NotificationForm';

export default function AdminPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-10">
      <div className="space-y-4">
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Admin Notifications
        </h1>
        <p className="text-muted-foreground">
          Use this form to send push notifications to all app users.
        </p>
      </div>
      <div className="mt-8">
        <NotificationForm />
      </div>
    </div>
  );
}
