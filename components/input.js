import { forwardRef } from "react"

const Input = ({ error,
  inputClassName,
  className = '',
  type = 'text',
  label,
  value,
  onChange,
  placeholder,
  icon,
  children,
  ...props
},
  ref) => {

  return (
    <div className={"flex flex-col relative " + className}>
      {label && <label className='text-sm my-[10px] text-solitude font-medium'>{label}</label>}
      <div className="relative">
        {icon && <span className="absolute right-[14px] top-1/2 -translate-y-1/2">{icon}</span>}
        {!children &&
          <input ref={ref} type={type} className={'w-full px-4 py-3 border text-xs border-gray-300 rounded-md focus:outline-none focus:border-secondary placeholder:text-navy ' + inputClassName}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            {...props} />}
      </div>
      {error && <p className="text-xs text-red-700">{error}</p>}
    </div>
  )
}

export default forwardRef(Input)