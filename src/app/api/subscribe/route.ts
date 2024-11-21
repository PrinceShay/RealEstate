// app/api/subscribe/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json(
      { error: 'E-Mail ist erforderlich' },
      { status: 400 }
    );
  }

  // Hier kannst du die Logik zur Speicherung der E-Mail hinzufügen (z.B. Datenbank)

  return NextResponse.json(
    { message: 'Erfolgreich zum Newsletter angemeldet!' },
    { status: 200 }
  );
}
