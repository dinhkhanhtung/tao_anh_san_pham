import React from 'react';

type IconProps = {
    className?: string;
};

export const IconUpload: React.FC<IconProps> = ({ className }) => (
    <svg className={className} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
    </svg>
);

export const IconFileCheck: React.FC<IconProps> = ({ className }) => (
    <svg className={className} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 20">
        <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M6 1v4a1 1 0 0 1-1 1H1m14-4v16a.97.97 0 0 1-.933 1H1.933A.97.97 0 0 1 1 18V5.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 1h8.239A.97.97 0 0 1 15 2ZM5 15.464 7.5 18l3-3M1_5h4a1 1 0 0 0 1-1V0"/>
    </svg>
);

export const IconPhoto: React.FC<IconProps> = ({ className }) => (
    <svg className={className} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.611 3.732 2.775-4.224a.966.966 0 0 1 .966-.563a1 1 0 0 1 .966 1.442l-3.286 5A1 1 0 0 1 11.532 14h.002Z"/>
    </svg>
);

export const IconSparkles: React.FC<IconProps> = ({ className }) => (
    <svg className={className || "w-5 h-5"} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2c-.3 0-.5.2-.5.5v2c0 .3.2.5.5.5s.5-.2.5-.5v-2c0-.3-.2-.5-.5-.5Zm0 17c-.3 0-.5.2-.5.5v2c0 .3.2.5.5.5s.5-.2.5-.5v-2c0-.3-.2-.5-.5-.5ZM20.4 4.1c-.2-.2-.5-.2-.7 0l-1.4 1.4c-.2.2-.2.5 0 .7.1.1.3.2.5.2s.4-.1.5-.2l1.4-1.4c.2-.2.2-.5 0-.7ZM6.1 18.9c-.2-.2-.5-.2-.7 0l-1.4 1.4c-.2.2-.2.5 0 .7.1.1.3.2.5.2s.4-.1.5-.2l1.4-1.4c.2-.2.2-.5 0-.7ZM22 11.5c0-.3-.2-.5-.5-.5h-2c-.3 0-.5.2-.5.5s.2.5.5.5h2c.3 0 .5-.2.5-.5ZM4 11.5c0-.3-.2-.5-.5-.5h-2c-.3 0-.5.2-.5.5s.2.5.5.5h2c.3 0 .5-.2.5-.5ZM18.9 6.1c.2-.2.2-.5 0-.7l-1.4-1.4c-.2-.2-.5-.2-.7 0s-.2.5 0 .7l1.4 1.4c.1.1.3.2.5.2s.4-.1.5-.2ZM4.1 20.4c.2-.2.2-.5 0-.7l-1.4-1.4c-.2-.2-.5-.2-.7 0s-.2.5 0 .7l1.4 1.4c.1.1.3.2.5.2s.4-.1.5-.2ZM12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12Z"/>
    </svg>
);

export const IconTrash: React.FC<IconProps> = ({ className }) => (
    <svg className={className} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
    </svg>
);

export const IconPlus: React.FC<IconProps> = ({ className }) => (
  <svg className={className} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
  </svg>
);

export const IconCheckCircle: React.FC<IconProps> = ({ className }) => (
    <svg className={className} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 10 2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
    </svg>
);