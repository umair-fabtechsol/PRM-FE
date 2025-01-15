import React from 'react'
import UserTable from './UserTable'
import Header from '../components/Header'

const page = () => {
    return (
        <>
            <Header title="Tags Management" description="Add, edit, delete, and organize tags to streamline management." />
            <div className='p-6 flex   bg-transparent'>
                <UserTable />
            </div>
        </>
    )
}

export default page