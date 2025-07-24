
type CourseProps = {
    name: string,
    color: string
}

function Course({ name, color}: CourseProps) {
  return (
    <>
    <div className='rounded-2xl text-center text-amber-50 text-1.5xl p-3 transition-transform duration-200 hover:scale-105'
    style={{ backgroundColor: color }}
    >
      {name}
    </div>
    </>
  )
}

export default Course