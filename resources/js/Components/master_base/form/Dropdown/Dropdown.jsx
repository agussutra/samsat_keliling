import { React, useState, useEffect } from "react";
import Select from "react-select";
const Dropdown = ({
    label,
    name,
    onChange,
    data,
    value,
  disabled,
    errors
}) => {
   const [theme, setTheme] = useState('light');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);
    return (
        <div className="mb-3 ml-1 flex flex-col">
             <span className="text-c-secondary font-semibold text-base mb-2 dark:text-white">{label}</span>
            <Select
                className="react-select"
                name={name}
                options={data}
                isDisabled={disabled ?? false}
                onChange={(e) => onChange(e.value)}
                defaultValue={(data !== '') ? data.find(option => option.value === value) || null : null}
                menuPortalTarget={document.body}
                styles={
                    {
                        menuPortal: base => ({ ...base, zIndex: 9999 }),
                        control: (base, state) => ({
                            ...base,
                            "*": {
                                boxShadow: "none !important",
                                color: theme === 'dark' ? 'white !important' : '',
                              },
                            backgroundColor: theme === 'dark' ? 'rgb(51,65,85)' : 'white',
                            border: `1px solid ${state.isFocused ? '#38bdf8' : '#38bdf8'}`, 
                            borderRadius: '5px',
                            '&:hover': {
                              border: `1px solid ${state.isFocused ? '#38bdf8' : '#38bdf8'}`, 
                            },
                          }),
                          menu: (base) => ({
                            ...base,
                            backgroundColor: theme === 'dark' ? 'rgb(51,65,85)' : 'white', 
                            color: theme === 'dark' ? 'white' : 'black'
                          }),
                          option: (base, state) => {
                            if (theme === 'light') {
                              return {
                                ...base,
                                backgroundColor: state.isFocused ? '#38bdf8' : 'white',
                                color: state.isFocused ? 'black' : 'black',
                              };
                            } else {
                              return {
                                ...base,
                                backgroundColor: state.isFocused ? '#38bdf8' : 'rgb(51,65,85)',
                                color: state.isFocused ? 'white' : 'white',
                              };
                            }
                          },
                    }
                }
        />
        {errors && <span className="text-red-400 text-sm">{errors} !</span>}
        </div>
    )
};

export { Dropdown as default, Dropdown };