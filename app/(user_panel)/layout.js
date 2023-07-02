import PanelLayout from "@/components/layouts/panelLayout";
import DeleteModal from "@/components/modals/deleteModal";
import StudentModal from "@/components/modals/studentModal";

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