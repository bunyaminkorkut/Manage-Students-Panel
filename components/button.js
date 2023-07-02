export const Button = ({onClick, children, type, vairant = 'primary', fullWidth = false, className }) => {
    const types = {
        primary: ' bg-primary text-white ',
    }
    return (
        <button type={type} onClick={onClick} className={className + ' text-sm font-medium md:py-3 rounded ' + types[vairant] + (fullWidth ? ' w-full mx-auto' : 'md:px-7 px-2')}>{children}</button>
    )
}