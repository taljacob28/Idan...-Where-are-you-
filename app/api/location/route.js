import { kv } from '@vercel/kv';

const LOCATION_KEY = 'idan_location';
const DEFAULT_LOCATION = 'תל אביב 🏠';

export async function GET() {
  try {
    const location = await kv.get(LOCATION_KEY) || DEFAULT_LOCATION;
    return Response.json({ location });
  } catch (error) {
    // אם KV לא מוגדר, נחזיר ברירת מחדל
    return Response.json({ location: DEFAULT_LOCATION });
  }
}

export async function POST(request) {
  try {
    const { location, password } = await request.json();
    
    // בדיקת סיסמה
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword || password !== adminPassword) {
      return Response.json({ error: 'סיסמה שגויה' }, { status: 401 });
    }
    
    // עדכון המיקום
    await kv.set(LOCATION_KEY, location);
    
    return Response.json({ success: true, location });
  } catch (error) {
    return Response.json({ error: 'שגיאה בעדכון' }, { status: 500 });
  }
}
