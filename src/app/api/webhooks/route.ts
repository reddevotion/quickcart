import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { v2 as cloudinary } from 'cloudinary'
import { createUser, deleteUser, updateUser } from '@/actions/user'

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET

  if (!SIGNING_SECRET) {
    throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET)

  // Get headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', {
      status: 400,
    })
  }

  // Get body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  let evt: WebhookEvent

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error: Could not verify webhook:', err)
    return new Response('Error: Verification error', {
      status: 400,
    })
  }

  const eventType = evt.type
  cloudinary.config({ 
    cloud_name: "dfc5ocndv", 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

  if(eventType === 'user.created') {
    const profileImgUrl = evt.data.image_url;
    const username = evt.data.username || evt.data.email_addresses[0].email_address;
    try {
        await createUser({name: username, imageUrl: username+".jpg", email:evt.data.email_addresses[0].email_address, id: evt.data.id})
        const uploadResult = await cloudinary.uploader.upload(profileImgUrl, {
            public_id: username,
            resource_type: 'image',
            overwrite: true,
            format: 'jpg',
        });
        return new Response('User is created or updated', {
            status: 201
        })
    } catch (error) {
        console.log('Error creating or updating user:', error)
        return new Response('Error occured', {
            status: 400,
        })
    }
  }

  if(eventType === 'user.updated') {
    const profileImgUrl = evt.data.image_url;
    const username = evt.data.username || evt.data.email_addresses[0].email_address;
    try {
        await updateUser({name: username, imageUrl: username+".jpg", email:evt.data.email_addresses[0].email_address, id: evt.data.id})
        const uploadResult = await cloudinary.uploader.upload(profileImgUrl, {
            public_id: username,
            resource_type: 'image',
            overwrite: true,
            format: 'jpg',
        });
        return new Response('User is created or updated', {
            status: 201
        })
    } catch (error) {
        console.log('Error creating or updating user:', error)
        return new Response('Error occured', {
            status: 400,
        })
    }
  }

  if(eventType === 'user.deleted') {
    const {id} = evt.data;

    try {
        await deleteUser(id as string)
        return new Response("User is deleted", {
            status: 200,
        })

    } catch (error) {
        return new Response("Error occured", {
            status: 400,
        })
    }
  }

  return new Response('Webhook received', { status: 200 })
}