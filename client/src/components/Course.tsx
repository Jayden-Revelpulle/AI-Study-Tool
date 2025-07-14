
type CourseProps = {
    name: string,
    color: string
}

function Course({ name, color}: CourseProps) {
  return (
    <>
    <div className='rounded-2xl text-center text-1.5xl p-3'style={{ backgroundColor: color }}>{name}</div>
    </>
  )
}

export default Course