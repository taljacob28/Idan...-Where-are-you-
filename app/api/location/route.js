export async function GET() {
  const location = process.env.IDAN_LOCATION || 'תל אביב 🏠';
  return Response.json({ location });
}
