'use client';

import React, { useEffect, useState } from 'react';
import { allCountries } from 'country-telephone-data';
import emojiFlags from 'emoji-flags';

export const PhoneCodeSelect = ({ value, onChange }) => {
  const [countryOptions, setCountryOptions] = useState([]);

  useEffect(() => {
    const formatted = allCountries.map((country) => {
      const flag = emojiFlags.countryCode(country.iso2.toUpperCase())?.emoji || '';
      return {
        name: country.name,
        iso2: country.iso2,
        dialCode: country.dialCode,
        label: `${flag} +${country.dialCode}`,
        value: `+${country.dialCode}`,
      };
    });
    setCountryOptions(formatted);
  }, []);

  return (
    <select
      name="phoneCode"
className="w-[95px] h-[45px] p-2 rounded-l-md border-t border-l border-b border-gray-600 bg-[#0E293E] text-white focus:outline-none"
      value={value}
      onChange={onChange}
    >
      {countryOptions.map((country) => (
        <option key={country.iso2} value={country.value}>
          {country.label}
        </option>
      ))}
    </select>
  );
};
