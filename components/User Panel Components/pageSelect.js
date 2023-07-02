import Image from "next/image";
import Select, { components } from "react-select";

export const PageSelect = ({ options, onChange, value }) => {

  const CaretDownIcon = () => {
    return <Image alt="page" src="/icons/dropdownIcon.svg" width={12} height={12} />;
  };

  const DropdownIndicator = props => {
    return (
      <components.DropdownIndicator {...props}>
        <CaretDownIcon />
      </components.DropdownIndicator>
    );
  };
  return (
    <div>
      <Select
        className="bg-milk"
        menuPlacement="top"
        components={{
          IndicatorSeparator: () => null,
          DropdownIndicator
        }}
        styles={{
          menu: (base) => ({
            ...base,
            width: "40px",
            padding: "0px",
            textAlign: "center",
          }),
          menuList: (base) => ({
            ...base,
            "::-webkit-scrollbar": {
              width: "0px",
              height: "0px",
            },
          }),
          dropdownIndicator: base => ({
            ...base,
            padding: '0px',
          }),
          control: (baseStyles, state) => ({
            ...baseStyles,
            padding: 0,
            border: 0,
            boxShadow: 'none',
            backgroundColor: '#F8F8F8',
            fontSize: '14px',
          }),
          valueContainer: (baseStyles, state) => ({
            ...baseStyles,
            padding: "0px 0px 0px 8px",
          })
        }}
        autosize={true}
        options={options.reverse()}
        onChange={onChange}
        defaultValue={(value ? value : options[options.length - 1])} />
    </div>
  )
}