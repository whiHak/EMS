"use client";
import { IEvent } from '@/lib/database/models/event.model'
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { useUser } from '@clerk/nextjs';
import React from 'react'
import { Button } from '../ui/button';
import Link from 'next/link';
import CheckOut from './CheckOut';

const CheckoutButton = ({event}: {event: IEvent}) => {
    const {user} = useUser();
    const userId = user?.publicMetadata.userId as string;
    const hasEventFinished = new Date(event?.endDateTime) < new Date() ;
    
  return (
    <div className="flex items-center gap-3">
        {/* canNot by past events */}
        {hasEventFinished ? (
            <p className='p-2 text-red-400'>Sorry, Tickets are no longer available</p>
        ):(
            <>
                <SignedOut>
                    <Button asChild className='button rounded-full' size="lg">
                        <Link href="/sign-in">Get Tickets</Link>
                    </Button>
                </SignedOut>

                <SignedIn>
                    <CheckOut event={event} userId={userId}/>
                </SignedIn>
            </>
        )}
        
    </div>
  )
}

export default CheckoutButton