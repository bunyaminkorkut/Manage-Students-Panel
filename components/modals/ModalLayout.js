const ModalLayout = ({ show, outsideClick, children, modalStyle }) => {
  let classes = show ? "opened-modal opacity-100" : "closed-modal opacity-0"

  return (
    <div onClick={outsideClick} className={"fixed inset-0 bg-black/[0.3] z-50 " + classes}  >
      <div
        onClick={e => e.stopPropagation()} style={modalStyle}
        className={
          "absolute max-h-[85vh] top-1/2 -translate-y-1/2 overflow-y-auto md:w-[600px] max-w-full rounded-2xl p-3 md:p-6 m-auto inset-x-2 bg-white "}   >
        {children}
      </div>
    </div>
  )
}

export default ModalLayout
