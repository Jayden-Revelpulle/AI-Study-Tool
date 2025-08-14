
interface FileProps {
  name: string;
}

function File({name}: FileProps) {
  return (
    <div>{name}</div>
  )
}

export default File