import { NextRequest, NextResponse } from 'next/server'

// In-memory storage for demo purposes
// In production, use a database like PostgreSQL, MongoDB, or Supabase
const waitlist: { email: string; timestamp: Date }[] = []

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const exists = waitlist.find(entry => entry.email === email)
    if (exists) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      )
    }

    // Add to waitlist
    waitlist.push({
      email,
      timestamp: new Date(),
    })

    console.log(`New waitlist signup: ${email}`)
    console.log(`Total waitlist members: ${waitlist.length}`)

    // TODO: In production, you would:
    // 1. Save to database
    // 2. Send confirmation email
    // 3. Add to email marketing platform (e.g., Mailchimp, SendGrid)
    // 4. Trigger analytics event

    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully joined waitlist',
        position: waitlist.length 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Waitlist signup error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Optional: GET endpoint to retrieve waitlist count (admin only in production)
export async function GET() {
  return NextResponse.json(
    { 
      count: waitlist.length,
      message: 'Waitlist statistics' 
    },
    { status: 200 }
  )
}
