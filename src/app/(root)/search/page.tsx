import React from 'react'
import { redirect } from 'next/navigation'
import { currentUser } from '@clerk/nextjs'
import { fetchUser, fetchUsers } from '@/lib/actions/user.actions'
import UserCard from '@/components/cards/UserCard'
const page = async () => {
    const user = await currentUser()
    if (!user) return null;

    const userInfo = await fetchUser(user.id)
    if (!userInfo?.onboarded) redirect('/onboarding')

    //fetch the all users

    const result = await fetchUsers({
        userId: user.id,
        searchString: '',
        pageNumber: 1,
        pageSize: 25
    })
    return (
        <div>
            <h1 className="head-text text-left">Serch Here</h1>

            <div className="mt-14 flex flex-col gap-9">
                {
                    result.users.length === 0 ? (
                        <p className="no-result">No users</p>
                    ) : (
                        <>
                            {
                                result.users.map((person) => (
                                    <UserCard 
                                    key={person.id}
                                    id={person.id}
                                    name={person.name}
                                    username={person.username}
                                    imgUrl={person.image}
                                    personType='User'
                                    />
                                ))
                            }
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default page
