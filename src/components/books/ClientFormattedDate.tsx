'use client';

import { useState, useEffect } from 'react';

interface ClientFormattedDateProps {
  dateString: string;
}

export function ClientFormattedDate({ dateString }: ClientFormattedDateProps) {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    // This effect runs only on the client, after the initial render (hydration).
    setFormattedDate(new Date(dateString).toLocaleDateString());
  }, [dateString]);

  // Render a placeholder or nothing on the server and during the initial client render.
  // Once the effect runs, the component will re-render with the formatted date.
  if (!formattedDate) {
    return null;
  }

  return <>{formattedDate}</>;
}
