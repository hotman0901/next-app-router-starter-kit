import { headers } from 'next/headers'

export async function GET(request: Request) {
  const headersList = headers()
  const referer = headersList.get('referer')

  console.log('EEEEEEE')
  return new Response('Hello, Next.js!', {
    status: 200,
  })
}


export async function POST(request: Request) {
  const headersList = headers()
  const referer = headersList.get('referer')

  console.log('EEEEEEE')
  return new Response('Hello, Next.js!', {
    status: 200,
  })
}
