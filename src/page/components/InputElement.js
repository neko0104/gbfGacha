
const InputElement = ({ type, name, className, value, mission=f=>f, ...props}) => {

    return (
        <input type={type}  name={name} className={className?className:""} defaultValue={value} onBlur={mission} onChange={mission}/>
    )
}

const CountBtn = ({ name, method, state, setFn, className, ...props }) => {
    const count = () => {
        // console.log(typeof name, name)
        setFn(state => ({...state, [name]:method==="+" ? state[name]+=1:state[name]-=1}))
    }

    return (
        <button type="button" className={className} onClick={()=>count()}>{method}</button>
    )
}

const ExpBtn = ({text, mission, className}) => {

    return <button type="button" className={className?className:"w-auto m-2 p-4 text-center font-bold bg-sky-200 hover:bg-sky-400 rounded-lg cursor-pointer"} onClick={mission} >
        {text}
        </button>
}

export { InputElement, CountBtn, ExpBtn }