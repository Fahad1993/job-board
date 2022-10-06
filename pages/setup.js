import { useState } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

export default function Setup() {
    const router = useRouter()
    const { data: session, status } = useSession()
    const loading = status === 'loading'

    const [name, setName] = useState('')
    const [company, setCompany] = useState(false)
    
// if the session data is still loading, we don’t render anything.
    if (loading) return null

    if (!session || !session.user) {
        router.push('/')
        return null
      }

      if (!loading && session && session.user.name) {
        router.push('/')
      }

    /* 
    a Save button and when it is pressed, we submit the form and we send its data to the `/api/setup` POST endpoint.
    Once that’s done, we assign this data to the session (so it’s already available for us to use) and we redirect to the `/` URL:
    */
   
  return (

    <form
      className='mt-10 ml-20'
      onSubmit={async (e) => {
        e.preventDefault()
        await fetch('/api/setup', {
          body: JSON.stringify({
            name,
            company,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        })
        session.user.name = name
        session.user.company = company
        router.push('/')
      }}
    >

      <div className='flex-1 mb-5'>
        <div className='flex-1 mb-5'>Add your name</div>
        <input
          type='text'
          name='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='border p-1 text-black'
        />
      </div>


      <div className='flex-1 mb-5'>
        <div className='flex-1 mb-5'>
          Check this box if you're a company and you want to post jobs
        </div>
        <input
          type='checkbox'
          name='company'
          checked={company}
          onChange={(e) => setCompany(!company)}
          className='border p-1'
        />
      </div>

      <button className='border px-8 py-2 mt-0 mr-8 font-bold rounded-full color-accent-contrast bg-color-accent hover:bg-color-accent-hover'>
        Save
      </button>
    </form>
  )
}