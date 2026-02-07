import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

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

    // Insert email into Supabase waitlist table
    const { data, error } = await supabase
      .from('waitlist')
      .insert([{ email }])
      .select()

    // Handle errors
    if (error) {
      // Check for unique constraint violation (duplicate email)
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'Email already registered' },
          { status: 409 }
        )
      }
      
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to join waitlist. Please try again.' },
        { status: 500 }
      )
    }

    console.log(`New waitlist signup: ${email}`)

    // Get total waitlist count
    const { count } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true })

    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully joined waitlist',
        position: count || undefined,
        data: data?.[0]
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

// Optional: GET endpoint to retrieve waitlist count
export async function GET() {
  try {
    const { count, error } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch waitlist count' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        count: count || 0,
        message: 'Waitlist statistics' 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error fetching waitlist:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
