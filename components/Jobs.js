import Job from 'components/Job'

 
  const Jobs = ({ jobs, isDashboard }) => {

    return (
        <>
          {jobs.map((job, index) => (
            <Job key={index} job={job} isDashboard={isDashboard} />
          ))}
        </>
      )
    }
 
    export default Jobs