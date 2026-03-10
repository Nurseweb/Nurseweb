// app/api/login/route.ts
export async function POST(req: Request) {
  const { email, password } = await req.json()
  
  if (email === process.env.ADMIN_EMAIL && 
      password === process.env.ADMIN_PASSWORD) {
    return Response.json({ success: true })
  }
  return Response.json({ success: false })
}