'use client';

import { useState, useEffect } from 'react';
import PhoneInputLib, { Country } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import './PhoneInput.css';

interface PhoneInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    required?: boolean;
    className?: string;
}

export default function PhoneInput({
    value,
    onChange,
    placeholder = 'Phone Number *',
    required = false,
    className = '',
}: PhoneInputProps) {
    const [detectedCountry, setDetectedCountry] = useState<Country>('AE'); // default UAE

    useEffect(() => {
        // Detect user's country from IP — falls back to AE if it fails
        fetch('https://ipapi.co/json/')
            .then((res) => res.json())
            .then((data) => {
                if (data?.country_code) {
                    setDetectedCountry(data.country_code as Country);
                }
            })
            .catch(() => {
                // silently fall back to AE
            });
    }, []);

    return (
        <PhoneInputLib
            international
            defaultCountry={detectedCountry}
            value={value}
            onChange={(val: string | undefined) => onChange(val ?? '')}
            placeholder={placeholder}
            className={`xerebo-phone-input ${className}`}
            numberInputProps={{ required }}
        />
    );
}
