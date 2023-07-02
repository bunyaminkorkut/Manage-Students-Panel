import PanelLayout from "@/components/layouts/panelLayout";
import DeleteModal from "@/components/modals/DeleteModal";
import StudentModal from "@/components/modals/StudentModal";

export default function RootLayout({
  children,
}) {

  return (
  <PanelLayout>
    <StudentModal />
    <DeleteModal />
    {children}
  </PanelLayout>)
}